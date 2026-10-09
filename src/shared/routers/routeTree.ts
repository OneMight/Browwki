import {
  rootRouter,
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute,
  serviceRouter
} from ".";

export const routeTree = rootRouter.addChildren([
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute,
  serviceRouter
]);
