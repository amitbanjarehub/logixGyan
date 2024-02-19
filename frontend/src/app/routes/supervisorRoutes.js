import Page from "@jumbo/shared/Page";
//import MessagesBox from "app/pages/MessagesBox";
import LoginAttendance from "../pages/attendance/Log-in";
import LogoutAttendance from "../pages/attendance/Log-out";
import CashDeposit from "app/pages/bank/CashDeposit";
import Expense from "../pages/expense";
import Dashboard from "../pages/home";
import Parcelallotment from "../pages/parcel/parcelAllotment";
import ParcelDelivery from "../pages/parcel/parcelDelivery";
import UserProfile from "../pages/profileData/user-profile";
import ParcelnextDay from "../pages/Report/ParcelforNextDayS";
import ParcelAlloted from "../pages/Report/AllotedParcelS";
import AttendanceReport from "../pages/Report/AttendanceReportS";
import CashBook from "../pages/Report/CashBookS";
import Parcelreceived from "../pages/parcel/parcelreceived";
import Deliveredparcel from "../pages/Report/DelieverdParcelS";
import Parcelrejected from "../pages/Report/RejectedParcelS";
import UserVerificationSupervisor from "../pages/Users-Setting/userVerificationS";
import ParcelreceivedS from "../pages/Report/ReceivedParcelS";
import UserProfiles from "../pages/profileData/Editprofile";
import ExpenseReportS from "app/pages/Report/ExpenseReportS";
import ReportAttendance from "app/pages/Report/AttendanceReportS/attendancereport";
import DeliveredRejectedParcelS from "app/pages/home/DeliveredRejectedParcelS";
import SalesOverviewS from "app/pages/home/SalesOverviewS";
import DealsAnalyticsS from "app/pages/home/DealsAnalyticsS";

const supervisorRoutes = [

  {
    path: "/supervisor/attendanceReport",
    element: <Page component={ReportAttendance} />,
  },
  {
    path: "/parcel/parcelallotment",
    element: <Page component={Parcelallotment} />,
  },
  {
    path: "/parcel/parcelDelivery",
    element: <Page component={ParcelDelivery} />,
  },
  {
    path: "/supervisor/allotedParcelReport",
    element: <Page component={ParcelAlloted} />,
  },
  {
    path: "/Cashdeposit",
    element: <Page component={CashDeposit} />,
  },
  {
    path: "/supervisor/attendanceReport",
    element: <Page component={AttendanceReport} />,
  },
  {
    path: "/supervisor/deliveredparcelReport",
    element: <Page component={Deliveredparcel} />,
  },
  {
    path: "/supervisor/rejectedparcelReport",
    element: <Page component={Parcelrejected} />,
  },
  {
    path: "/supervisor/allotedparcelfornextdayReport",
    element: <Page component={ParcelnextDay} />,
  },
  {
    path: "/UserSettings/userVerification_Supervisor",
    element: <Page component={UserVerificationSupervisor} />,
  },
  {
    path: "/AddExpense",
    element: <Page component={Expense} />,
  },
  {
    path: "/ExpenseReport",
    element: <Page component={ExpenseReportS} />,
  },
  {
    path: "/Cashdeposit",
    element: <Page component={CashDeposit} />,
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
    path: "/DeliveredRejectedParcelS",
    element: <Page component={DeliveredRejectedParcelS} />,
  },
  {
    path: "/userprofile",
    element: <Page component={UserProfile} />,
  },
  {
    path: "/supervisor/cashBookReport",
    element: <Page component={CashBook} />,
  },
  {
    path: "/parcel/parcelReceived",
    element: <Page component={Parcelreceived} />,
  },
  {
    path: "/supervisor/ReceivedParcelReport",
    element: <Page component={ParcelreceivedS} />,
  },

  {
    path: "/editprofile",
    element: <Page component={UserProfiles} />,
  },

  {
    path: "/SalesOverviewS",
    element: <Page component={SalesOverviewS} />,
  },
  
  {
    path: "/NextDayParcel",
    element: <Page component={DealsAnalyticsS} />,
  },
  
];

export default supervisorRoutes;
