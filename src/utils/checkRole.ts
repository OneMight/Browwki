import { getDataAboutUser } from "@/lib/auth";
import { ROUTES } from "@/shared/routers/routePath";
import { redirect } from "@tanstack/react-router";
export const CheckRole = () => {
  const user = getDataAboutUser();
  if (user.role == "CLIENT") {
    throw redirect({ to: ROUTES.CLIENT });
  } else {
    throw redirect({ to: ROUTES.ADMINHOME });
  }
};
