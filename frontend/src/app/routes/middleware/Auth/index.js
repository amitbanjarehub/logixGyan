// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { setAuthUser } from "app/utils/appHelpers";

// const Auth = ({ fallbackPath }, data) => {
//   const authUser = setAuthUser();
   
//         if (!authUser) {
//           // return <Navigate to="/deliveryboy/login" />;
//           return <Navigate to={fallbackPath} />;
//         }
//         else {
          
//           return <Outlet />;
                  
//         }
     
      
// }





// export default Auth;

// import useAuth from "app/hooks/useAuth";
// import adminRoutes from "app/routes/adminRoutes";
// import authRoutes from "app/routes/authRoutes";
// import supervisorRoutes from "app/routes/supervisorRoutes";
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const Auth = ({ fallbackPath }) => {
//     const authUser = useAuth();
//     if(authUser) {
//         switch(authUser.role) {
//           case 'admin': 
//             return adminRoutes;
//             case 'supervisor':
//               return supervisorRoutes;
//               case 'deliveryboy':
//                 return deliveryboyRoutes;
//                 case 'manager':
//                     return managerRoutes;                
//               default:
//                 return authRoutes;
//         }
//       }
//     }, [authUser]);

// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.roles?.find(role => allowedRoles?.includes(role))
//             ? <Outlet />
//             : auth?.user
//                 ? <Navigate to="/pagenotfound/404" state={{ from: location }} replace />
//                 : <Navigate to="/deliveryboy/login" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;

