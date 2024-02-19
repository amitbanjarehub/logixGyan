import Page from "@jumbo/shared/Page";
import messageBox from "app/pages/messageBox";
import LoginAttendance from "../pages/attendance/Log-in";
import LogoutAttendance from "../pages/attendance/Log-out";
import Dashboard from "../pages/home";
import UserProfile from "../pages/profileData/user-profile";
import UserProfiles from "../pages/profileData/Editprofile";
import ParcelDeliveryListd from "app/pages/parcel/parcelDeliveryListD";
import deliveryBoyAttendance from "app/pages/home/deliveryBoyAttendance";

const attendanceRoutes = [
  {
    path: "/check-in/attendance",
    element: <Page component={LoginAttendance} />,
  },
  {
    path: "/check-out/attendance",
    element: <Page component={LogoutAttendance} />,
  },
  {
    path: "/dashboard",
    element: <Page component={Dashboard} />,
  },
  {
    path: "/messageBox/messages",
    element: <Page component={messageBox} />,
  },

  {
    path: "/userprofile",
    element: <Page component={UserProfile} />,
  },
  {
    path: "/editprofile",
    element: <Page component={UserProfiles} />,
  },
  {
    path: "/parcel/ParcelDeliveryListD",
    element: <Page component={ParcelDeliveryListd} />,
  },
  {
    path: "/deliveryBoyAttendance",
    element: <Page component={deliveryBoyAttendance} />,
  },

];
export default attendanceRoutes;
