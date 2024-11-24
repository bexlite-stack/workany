import { TUserJWT } from "../../../types/app";
import { IWorkplace } from "../../../types/entities";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";
import { Range } from "../../components/ui/range";

export const ReviewForm = ({ user, workplace }: { user: TUserJWT; workplace: IWorkplace }) => {
  const images = JSON.parse(workplace.images);

  return (
    <TemplateBase>
      <Header user={user} />
      <main class="max-w-5xl m-auto p-8 my-12 space-y-8">
        <section id="header">
          <h2>Submit a review</h2>
          <p>Please submit an honest review</p>
        </section>
        <div class="grid grid-cols-2 gap-12">
          <form
            id="form"
            class="space-y-4"
            hx-post={`/workplaces/${workplace.id}/reviews/submit`}
            hx-ext="disable-element"
            hx-disable-element="#submitBtn"
            hx-target="#msg"
          >
            <textarea
              name="content"
              placeholder="Review"
              rows="1"
              x-data="{ 
                resize () { 
                      $el.style.height = '0px'; 
                      $el.style.height = $el.scrollHeight + 'px' 
                    } 
                }"
              x-init="resize()"
              x-on:input="resize()"
              class="overflow-hidden"
            ></textarea>
            <Range name="quiteness" label="Quiteness" minLabel="loud" maxLabel="quite" />
            <Range name="comfortness" label="Comfortness" minLabel="uncomfortable" maxLabel="comfortable" />
            <Range name="service" label="Service" minLabel="poor" maxLabel="good" />
            <Range name="cleanliness" label="Cleanliness" minLabel="dirty" maxLabel="clean" />
            <Range name="foodQuality" label="Food Quality" minLabel="poor" maxLabel="good" />
            <Range name="foodPrice" label="Food Price" minLabel="expensive" maxLabel="affordable" />
            <button id="submitBtn" type="submit">
              Submit Review
            </button>
            <div id="msg"></div>
          </form>
          <section class="relative h-[500px] rounded-xl overflow-hidden">
            <img
              src={`${process.env.S3_URL}/workanywhere/workplaces/${workplace.id}/${images[0]}`}
              class="first:col-span-2 first:row-span-2 w-full h-full object-cover object-center"
            />
            <div class="absolute bg-gradient-to-b p-8 w-full from-black to-transparent top-0 left-0 text-white font-medium">You are currently reviewing</div>
            <div class="absolute left-0 space-y-2 bottom-0 p-8 w-full text-white bg-gradient-to-t from-black to-transparent">
              <h2>{workplace.name}</h2>
              <h3>
                {workplace.address} - {workplace.city}
              </h3>
            </div>
          </section>
        </div>
      </main>
    </TemplateBase>
  );
};
