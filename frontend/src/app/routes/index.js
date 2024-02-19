import { Navigate } from "react-router-dom";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import mailRoutes from "./mailRoutes";
import supervisorRoutes from "./supervisorRoutes";
import managerRoutes from "./managerRoutes";
import deliveryboyRoutes from "./deliveryboyRoutes";
import Page from "@jumbo/shared/Page";
import Error404 from "app/pages/extra-pages/Error404";

const routesForPublic = [
  {
    path: "*",
    element: <Navigate to={"/pagenotfound/404"}/>,
  },
  {
    path: "/pagenotfound/404",
    element: <Page component={Error404} />,
  },
];

const routesForAuthenticatedOnly = [
  {
    path: "/",

    element: <Navigate to={"/dashboard"} />,
    
  },

  ...adminRoutes,
  ...mailRoutes,
  ...supervisorRoutes,
  ...managerRoutes,
  ...deliveryboyRoutes,
];

const routesForNotAuthenticatedOnly = [...authRoutes];

const routes = [
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
  ...routesForNotAuthenticatedOnly,
];

export {
  routes as default,
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
