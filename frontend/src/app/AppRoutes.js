import React from "react";

import routes from "./routes";
import useJumboRoutes from "@jumbo/hooks/useJumboRoutes";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const AppRoutes = () => {
    const {authUser} = useJumboAuth();

    let routesToRebuild = routes;

    // switch(authUser.role)   {
    //     case "admin":
    //         routesToRebuild = adminRoutes;
    //         break;
    //         case "deliveryBoy":
    //             routesToRebuild = deliveryBoyRoutes;
    //             break;

    // }
    const appRoutes = useJumboRoutes(routes);

    // React.useEffect(() => {
    //     setRebuildRoutes(true);
    // }, [authUser.role]);
    return (
        <React.Fragment>
            {
                appRoutes
            }
        </React.Fragment>
    );
};
export default AppRoutes;
