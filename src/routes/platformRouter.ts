import { Elysia } from "elysia";
import { platformController } from "../controllers/platformController";
import { workplaceController } from "../controllers/workplaceController";
import { workplacesServices } from "../services/workplacesServices";

export const platformRouter = new Elysia()
  // Interface
  .get("/", platformController.renderHomeUI)
  .get("/workplaces/:id", workplaceController.handleGetSingleWorkplace)
  .get("/workplaces/:id/reviews", workplaceController.handleGetReviews)
  .get("/workplaces/:id/ratings", workplaceController.handleGetRatings)
  .get("/workplaces/:id/images", workplaceController.renderAllImagesUI)
  .get("/workplaces/:id/reviews/submit", workplaceController.renderReviewFormUI)
  .get("/workplaces/all", workplaceController.handleGetWorkplaces)
  .get("/workplaces/submit", platformController.renderWorkplaceFormUI)

  // Controller
  .post("/workplaces/submit", workplaceController.handleCreateWorkplace)
  .post("/workplaces/:id/reviews/submit", workplaceController.handleCreateReview)
  .post("/workplaces/:id/add-images", workplaceController.handleAddImagesToWorkplace)
  // .put("/workplaces/:id/add-images-temp", workplaceController.handleAddImagesToWorkplaceTemp)
  .post("/workplaces/:id/ownership", workplaceController.handleAddOwnerShipToWorkplace)
  .get("/images/:id/:filename", async ({ params }) => {
    const { id, filename } = params;
    const file = Bun.file(`./public/assets/${id}/${filename}`);

    return file;
  })
  .delete("/workplaces/:id/images", () => null);
