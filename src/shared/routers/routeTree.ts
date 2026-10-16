import {
  rootRouter,
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute,
  serviceRouter,
  calendarRouter,
  reportRouter
} from ".";

export const routeTree = rootRouter.addChildren([
  indexRouter,
  adminRouter,
  slotsRouter,
  clientRoute,
  serviceRouter,
  calendarRouter,
  reportRouter
]);
