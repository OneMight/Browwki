import {
  createRouter,
  RouterProvider
} from "@tanstack/react-router";
import { routeTree } from "@/shared/routers/routeTree";

const routes = createRouter({
  routeTree
});

export const ProviderRouter = () => {
  return <RouterProvider router={routes} />;
};
