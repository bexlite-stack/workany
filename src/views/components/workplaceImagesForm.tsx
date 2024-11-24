export const WorkplaceImagesForm = ({ workplaceId }: { workplaceId: string }) => {
  return (
    <>
      <section id="header" hx-swap-oob="true">
        <h2>Add images to workplace</h2>
        <p>Images could help users to find your workplace</p>
      </section>
      <h3 id="heading-information" hx-swap-oob="true" class="text-slate-300 flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
        </svg>
        Information
      </h3>
      <h3 id="heading-images" hx-swap-oob="true" class="flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
        </svg>
        Images
      </h3>
      <h3 id="heading-ownership" hx-swap-oob="true" class="text-slate-300 flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
        </svg>
        Ownership
      </h3>
      <form
        id="form"
        hx-swap-oob="true"
        class="space-y-2"
        hx-post={`/workplaces/${workplaceId}/add-images`}
        hx-ext="disable-element"
        hx-disable-element="#submitBtn"
        hx-target="#msg"
        hx-encoding="multipart/form-data"
      >
        <input
          id="fileUpload"
          type="file"
          name="images"
          multiple
          hx-target="#images"
          hx-trigger="change"
          hx-encoding="multipart/form-data"
          hx-put={`/workplaces/${workplaceId}/add-images-temp`}
        />
        <button id="submitBtn" type="submit">
          Submit Images{" "}
        </button>
        <div id="msg"></div>
        <div id="images"></div>
      </form>
    </>
  );
};
