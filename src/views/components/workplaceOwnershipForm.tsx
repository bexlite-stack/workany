export const WorkplaceOwnershipForm = ({ workplaceId }: { workplaceId: string }) => {
  return (
    <>
      <section id="header" hx-swap-oob="true">
        <h2>Workplace Ownership</h2>
        <p>Please state that you own this workplace</p>
      </section>
      <h3 id="heading-information" hx-swap-oob="true" class="text-slate-300 flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
        </svg>
        Information
      </h3>
      <h3 id="heading-images" hx-swap-oob="true" class="text-slate-300 flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
        </svg>
        Images
      </h3>
      <h3 id="heading-ownership" hx-swap-oob="true" class="flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
        </svg>
        Ownership
      </h3>
      <form
        id="form"
        hx-swap-oob="true"
        class="space-y-2"
        hx-post={`/workplaces/${workplaceId}/ownership`}
        hx-ext="disable-element"
        hx-disable-element="#submitBtn"
        hx-target="body"
        hx-swap="beforeend transition:true"
      >
        <div class="flex gap-2">
          <input name="ownership" type="checkbox" id="ownership" class="w-fit inline-block" />
          <label for="ownership">I am the owner</label>
        </div>
        <button id="submitBtn" type="submit">
          Submit Workplace
        </button>
      </form>
    </>
  );
};
