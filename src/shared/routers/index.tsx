import {
  createRootRoute,
  createRoute
} from "@tanstack/react-router";
import { ROUTES } from "./routePath";
import React from "react";
import App from "@/app/App";
import { CheckRole } from "@/utils/checkRole";

const rootRouter = createRootRoute({
  component: () => <App />
});
const indexRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.HOME,
  component: React.lazy(() =>
    import("@/pages/HomePage").then((module) => ({
      default: module.HomePage
    }))
  ),
  beforeLoad: () => {
    console.log("worked");
    CheckRole();
  }
});
const clientRoute = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.CLIENT,
  component: React.lazy(() =>
    import("@/pages/ClientPage").then((module) => ({
      default: module.ClientPage
    }))
  )
});
const adminRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.ADMINHOME,
  component: React.lazy(() =>
    import("@/pages/AdminPage").then((module) => ({
      default: module.AdminPage
    }))
  )
});
const slotsRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.SLOTS,
  component: React.lazy(() =>
    import("@/pages/SlotsPage").then((module) => ({
      default: module.SlotsPage
    }))
  )
});
const serviceRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.SERVICES,
  component: React.lazy(() =>
    import("@/pages/ServicePage").then((module) => ({
      default: module.ServicePage
    }))
  )
});
const calendarRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.SCHEDULE,
  component: React.lazy(() =>
    import("@/pages/CalendarPages").then((module) => ({
      default: module.CalendarPage
    }))
  )
});
export {
  indexRouter,
  rootRouter,
  adminRouter,
  slotsRouter,
  clientRoute,
  serviceRouter,
  calendarRouter
};
