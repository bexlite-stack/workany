import { citiesServices } from "../services/citiesService";
import { ContextWithJWT } from "../types/app";
import { Home } from "../views/pages/platform";
import { WorkplaceFormInfo } from "../views/pages/platform/workplaceFormInfo";

export const platformController = {
  renderHomeUI: ({ user, query }: ContextWithJWT) => {
    return <Home user={user} query={query} />;
  },

  renderWorkplaceFormUI: async ({ user }: ContextWithJWT) => {
    const cities = await citiesServices.getCities();

    return <WorkplaceFormInfo user={user} cities={cities} />;
  },
};
