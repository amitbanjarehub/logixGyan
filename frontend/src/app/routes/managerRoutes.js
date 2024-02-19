import Page from "@jumbo/shared/Page";
import ParcelAllotmentListM from "app/pages/parcel/parcelAllotmentListM/parcelAllotmentLiM";
import ParcelDeliveryLiM from "app/pages/parcel/parcelDeliveryListM/parcelDeliveryLiM";
import ParcelReceivedListM from "app/pages/parcel/parcelReceivedListM/parcelReceivedLiM";
import LoginAttendance from "../pages/attendance/Log-in";
import LogoutAttendance from "../pages/attendance/Log-out";
import Dashboard from "../pages/home";
import UserProfiles from "../pages/profileData/Editprofile";
import UserProfile from "../pages/profileData/user-profile";
import Reportattendance from "../pages/Report/AttendanceReportM";
import DeliveryBoy from "app/pages/home/DeliveryBoy";

const managerRoutes = [
  {
    path: "/manager/attendanceReport",
    element: <Page component={Reportattendance} />,
  },

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
    path: "/userprofile",
    element: <Page component={UserProfile} />,
  },
  {
    path: "/editprofile",
    element: <Page component={UserProfiles} />,
  },
  {
    path: "/DeliveryBoy",
    element: <Page component={DeliveryBoy} />,
  },
  {
    path: "/parcel/ParcelAllotmentListM",
    element: <Page component={ParcelAllotmentListM} />,
  },
  {
    path: "/parcel/ParcelDeliveryListM",
    element: <Page component={ParcelDeliveryLiM} />,
  },
  {
    path: "/parcel/ParcelReceivedListM",
    element: <Page component={ParcelReceivedListM} />,
  },
];
export default managerRoutes;
