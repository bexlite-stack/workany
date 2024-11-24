import { Context } from "elysia";
import { fileServices } from "../services/fileService";
import { imagesServices } from "../services/imagesServices";
import { workplacesServices } from "../services/workplacesServices";
import { ContextWithJWT } from "../types/app";
import { IWorkplace } from "../types/entities";
import { WorkplaceCard } from "../views/components/workplaceCard";
import { WorkplaceImagesForm } from "../views/components/workplaceImagesForm";
import { WorkplaceOwnershipForm } from "../views/components/workplaceOwnershipForm";
import { ReviewForm } from "../views/pages/platform/reviewForm";
import { WorkplaceSingle } from "../views/pages/platform/workplaceSingle";
import { reviewsServices } from "../services/reviewsServices";
import { ReviewCard } from "../views/components/reviewCard";
import { RangeRating } from "../views/components/ui/rangeRating";
import { WorkplaceAllImages } from "../views/components/workplaceAllImages";
import { saveImages } from "../lib/saveImages";

export const workplaceController = {
  handleGetWorkplaces: async ({ query }: ContextWithJWT) => {
    const { city, type, limit } = query;

    const workplaces = (await workplacesServices.getWorkplaces({ city, type, limit: Number(limit) })) as IWorkplace[];

    return (
      <>
        {workplaces.map((workplace) => {
          return <WorkplaceCard id={workplace.id} name={workplace.name} type={workplace.type} city={workplace.city} images={workplace.images} />;
        })}
      </>
    );
  },

  handleGetSingleWorkplace: async ({ user, params }: ContextWithJWT) => {
    const { id: workplaceId } = params;
    const workplace = (await workplacesServices.getSingleWorkplace(workplaceId)) as IWorkplace;

    return <WorkplaceSingle workplace={workplace} user={user} />;
  },

  handleCreateWorkplace: async ({ user, body }: ContextWithJWT) => {
    const { name, address, city, type } = body as Record<string, string>;

    if (!name || !address || !city || !type) {
      return <div class="msg msg-error">All fields are required</div>;
    }

    const createdWorkplace = await workplacesServices.createWorkplace(name, address, city, type, user.id as string);
    if (!createdWorkplace) {
      return <div class="msg msg-error">Failed to create workplace</div>;
    }

    return <WorkplaceImagesForm workplaceId={createdWorkplace.id} />;
  },

  handleAddImagesToWorkplace: async ({ user, params, body }: ContextWithJWT) => {
    const { id: workplaceId } = params;
    const { images } = body as { images: Blob | Blob[] } & Record<string, string>;

    if (Array.isArray(images)) {
      await Promise.all(
        images.map(async (image) => {
          await imagesServices.createImage(image.name, workplaceId, user?.id as string, "workplace");
        })
      );

      await Promise.all(images.map((image) => fileServices.upload(image.name, workplaceId, "workplaces", image)));
    } else {
      await imagesServices.createImage(images.name, workplaceId, user?.id as string, "workplace");
      await fileServices.upload(images.name, workplaceId, "workplaces", images);
    }

    return <WorkplaceOwnershipForm workplaceId={workplaceId} />;
  },

  handleAddImagesToWorkplaceTemp: async ({ user, params, body }: ContextWithJWT) => {
    const { id: workplaceId } = params;
    const { images } = body as { images: Blob | Blob[] } & Record<string, string>;

    const savedImages = await saveImages(workplaceId, images as Blob | Blob[]);

    return (
      <div class="grid grid-cols-6 gap-4">
        {savedImages.map((image) => {
          return <img src={`/images/${workplaceId}/${image.name}`} class="w-full h-full object-cover rounded-xl" />;
        })}
      </div>
    );
  },

  handleAddOwnerShipToWorkplace: async () => {
    return (
      <div class="fixed inset-0 flex justify-center items-center bg-white">
        <div class="space-y-2">
          <h1 class="text-center">Thank you!</h1>
          <a href="/" hx-boost="true" class="text-center block">
            Back to home
          </a>
        </div>
      </div>
    );
  },

  handleCreateReview: async ({ body, user, params }: ContextWithJWT) => {
    const { id: workplaceId } = params;
    const { content, quiteness, comfortness, service, cleanliness, foodQuality, foodPrice } = body as Record<string, string | number>;

    const createReview = await reviewsServices.createReview(
      workplaceId as string,
      user.id as string,
      content as string,
      quiteness as number,
      comfortness as number,
      service as number,
      cleanliness as number,
      foodQuality as number,
      foodPrice as number
    );

    return new Response(null, {
      headers: {
        "HX-Redirect": `/workplaces/${workplaceId}`,
      },
    });
  },

  handleGetReviews: async ({ params }: ContextWithJWT) => {
    const { id: workplaceId } = params;

    const allReviews = await reviewsServices.getReviews(workplaceId as string);

    return (
      <>
        {allReviews.map((item) => {
          return <ReviewCard name={item.name} content={item.content} updatedAt={item.updatedAt} />;
        })}
      </>
    );
  },

  handleGetRatings: async ({ params }: ContextWithJWT) => {
    const { id: workplaceId } = params;

    const allRatings = (await reviewsServices.getRatings(workplaceId as string)) as Record<string, number>;

    return (
      <>
        <RangeRating rating={allRatings.quiteness} label="Quiteness" minLabel="loud" maxLabel="quiet" />
        <RangeRating rating={allRatings.comfortness} label="Comfortness" minLabel="uncomfortable" maxLabel="comfortable" />
        <RangeRating rating={allRatings.service} label="Service" minLabel="poor" maxLabel="excellent" />
        <RangeRating rating={allRatings.cleanliness} label="Cleanliness" minLabel="messy" maxLabel="clean" />
        <RangeRating rating={allRatings.foodQuality} label="Food Quality" minLabel="bad" maxLabel="good" />
        <RangeRating rating={allRatings.foodPrice} label="Food Price" minLabel="expensive" maxLabel="affordable" />
      </>
    );
  },

  renderReviewFormUI: async ({ user, params }: ContextWithJWT) => {
    const { id: workplaceId } = params;
    const workplace = (await workplacesServices.getSingleWorkplace(workplaceId)) as IWorkplace;

    return <ReviewForm user={user} workplace={workplace} />;
  },

  renderAllImagesUI: async ({ params }: ContextWithJWT) => {
    const { id: workplaceId } = params;
    const workplace = await workplacesServices.getSingleWorkplace(workplaceId);

    return <WorkplaceAllImages images={workplace?.images} workplaceId={workplaceId} />;
  },
};
