import {
  rootRouter,
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute
} from ".";

export const routeTree = rootRouter.addChildren([
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute
]);
