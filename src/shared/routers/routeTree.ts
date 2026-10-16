import {
  rootRouter,
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute,
  serviceRouter,
  calendarRouter
} from ".";

export const routeTree = rootRouter.addChildren([
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute,
  serviceRouter,
  calendarRouter
]);
