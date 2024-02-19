import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CampaignIcon from "@mui/icons-material/Campaign";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListIcon from "@mui/icons-material/List";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";

export const menuForAdmin = [
  {
    label: "sidebar.menu.home",
    type: "section",
    children: [
      {
        uri: "/dashboard",
        label: "Dashboard",
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  ///////------------------------User Side Bar open----------------------------------

  {
    label: "Users",
    type: "section",
    children: [
      {
        label: "Trainer",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          
          {
            uri: "/user/addTrainer",
            label: "Add Trainer",
            type: "nav-item",
          },
          {
            uri: "/user/trainerList",
            label: "Trainer List",
            type: "nav-item",
          },
          
        ],
      },
      {
        label: "Student",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          
          {
            uri: "/user/addStudent",
            label: "Add Student",
            type: "nav-item",
          },
          {
            uri: "/user/studentList",
            label: "Student List",
            type: "nav-item",
          },
          
        ],
      },
    ],
  },

  //////------------------------User Side Bar closed----------------------------------

  //////------------------------Master Side Bar open----------------------------------
  {
    label: "Master",
    type: "section",
    children: [
      {
        label: "Category",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          
          {
            uri: "/master/addCategory",
            label: "Add Category",
            type: "nav-item",
          },
          {
            uri: "/master/categoryList",
            label: "Category List",
            type: "nav-item",
          },
          
        ],
      },
      {
        label: "Country",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          
          {
            uri: "/master/addCountry",
            label: "Add Country",
            type: "nav-item",
          },
          {
            uri: "/master/countryList",
            label: "Country List",
            type: "nav-item",
          },
          
        ],
      },

      {
        label: "State",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          
          {
            uri: "/master/addState",
            label: "Add State",
            type: "nav-item",
          },
          {
            uri: "/master/stateList",
            label: "State List",
            type: "nav-item",
          },
          
        ],
      },

      {
        label: "City",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          
          {
            uri: "/master/addCity",
            label: "Add City",
            type: "nav-item",
          },
          {
            uri: "/master/cityList",
            label: "City List",
            type: "nav-item",
          },
          
        ],
      },
    ],
  },
   ///////------------------------Master Side Bar closed----------------------------------

  // below Alogistics routes for sidebar menus.............


  {
    label: "company setting",
    type: "section",
    children: [
      {
        uri: "/CompanySettings/addCompany",
        label: "Add Company",
        type: "nav-item",
        icon: <DomainAddIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/CompanySettings/addBranch",
        label: "Add Branch",
        type: "nav-item",
        icon: <AddBusinessIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/CompanySettings/companydetails",
        label: "Company Details",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "Users Setting",
    type: "section",
    children: [
      {
        uri: "/UserSettings/userVerification",
        label: "User Verification",
        type: "nav-item",
        icon: <PersonSearchIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },


  {
    label: "Parcel",
    type: "section",
    children: [

      {
        uri: "/parcel/ParcelReceivedList",
        label: "Parcel Received List",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/parcel/ParcelAllotmentList",
        label: "Parcel Allotment List",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/parcel/ParcelDeliveryList",
        label: "Parcel Delivery List",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },


    ],
  },
  {
    label: "Attendance",
    type: "section",
    children: [
      {
        uri: "/check-in/attendance",
        label: "Check-In",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/check-out/attendance",
        label: "Check-Out",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },

  {
    label: "Expense",
    type: "section",
    children: [
      {
        uri: "/AddExpense",
        label: "Add Expense",
        type: "nav-item",
        icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/ExpenseList",
        label: "Expense List",
        type: "nav-item",
        icon: <ListIcon sx={{ fontSize: 20 }} />,
      },

    ],
  },
  {
    label: "User List",
    type: "section",
    children: [
      {
        uri: "/userlists",
        label: "Users",
        type: "nav-item",
        icon: <ListIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },


  {
    label: "Bank",
    type: "section",
    children: [
      {
        uri: "/Cashdeposit",
        label: "Cash Deposit",
        type: "nav-item",
        icon: <CurrencyRupeeIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/CashdepositList",
        label: "Cash Deposit List",
        type: "nav-item",
        icon: <ListIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "View Attendance",
    type: "section",
    children: [
      {
        uri: "/attendance/ViewAttendance",
        label: "View Attendance",
        type: "nav-item",
        icon: <ViewCompactAltIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },

  {
    label: "Report",
    type: "section",
    children: [
      {
        label: "Report",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/admin/attendanceReport",
            label: "Attendance Report",
            type: "nav-item",
          },
          //--------------29April-----------------------------
          {
            uri: "/admin/vehiclereport",
            label: " Vehicle Report",
            type: "nav-item",
          },
          //--------------29April-----------------------------
          {
            uri: "/admin/allotedParcelReport",
            label: "Parcel Alloted Report",
            type: "nav-item",
          },
          {
            uri: "/admin/FuelReport",
            label: "Fuel Report",
            type: "nav-item",
          },
          {
            uri: "/admin/contractBasisReport",
            label: "Contract Basis Report ",
            type: "nav-item",
          },
          {
            uri: "/admin/deliveredparcelReport",
            label: "Delivered Parcel Report",
            type: "nav-item",
          },
          {
            uri: "/admin/rejectedparcelReport",
            label: "Rejected Parcel Report",
            type: "nav-item",
          },
          {
            uri: "/admin/allotedparcelfornextdayReport",
            label: "Parcel for Next Day Report",
            type: "nav-item",
          },
          {
            uri: "/admin/cashBookReport",
            label: "CashBook Report",
            type: "nav-item",
          },
          {
            uri: "/admin/ReceivedParcelReport",
            label: "Received Parcel Report",
            type: "nav-item",
          },
          {
            uri: "/ExpenseReport",
            label: "Expense Report",
            type: "nav-item",
          },

        ],
      },
    ],
  },
];

export const menuForDeliveryBoy = [
  {
    label: "sidebar.menu.home",
    type: "section",
    children: [
      {
        uri: "/dashboard",
        label: "Dashboard",
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },

  {
    label: "Attendance",
    type: "section",
    children: [
      {
        uri: "/check-in/attendance",
        label: "Check-In",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/check-out/attendance",
        label: "Check-Out",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "Parcel",
    type: "section",
    children: [
      {
        uri: "/parcel/ParcelDeliveryListD",
        label: "Parcel Delivery List",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  // {
  //   label: "Message Center",
  //   type: "section",
  //   children: [
  //     {
  //       uri: "/messageBox/messages",
  //       label: "Messages",
  //       type: "nav-item",
  //       icon: <CampaignIcon sx={{ fontSize: 20 }} />,
  //     },
  //   ],
  // },
];

export const menuForSupervisor = [
  {
    label: "sidebar.menu.home",
    type: "section",
    children: [
      {
        uri: "/dashboard",
        label: "Dashboard",
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "Users Setting",
    type: "section",
    children: [
      {
        uri: "/UserSettings/userVerification_Supervisor",
        label: "User Verification",
        type: "nav-item",
        icon: <PersonSearchIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },


  {
    label: "Parcel",
    type: "section",
    children: [
      {
        uri: "/parcel/parcelReceived",
        label: "Parcel Received",
        type: "nav-item",
        icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/parcel/parcelallotment",
        label: "Parcel Allotment",
        type: "nav-item",
        icon: <LocalShippingIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/parcel/parcelDelivery",
        label: "Parcel Delivery",
        type: "nav-item",
        icon: <DeliveryDiningIcon sx={{ fontSize: 20 }} />,
      },

    ],
  },

  {
    label: "Attendance",
    type: "section",
    children: [
      {
        uri: "/check-in/attendance",
        label: "Check-In",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/check-out/attendance",
        label: "Check-Out",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },

  {
    label: "Expense",
    type: "section",
    children: [
      {
        uri: "/AddExpense",
        label: "Add Expense",
        type: "nav-item",
        icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/ExpenseReport",
        label: "Expense Report",
        type: "nav-item",
        icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
      },

    ],
  },

  {
    label: "Bank",
    type: "section",
    children: [
      {
        uri: "/Cashdeposit",
        label: "Cash Deposit",
        type: "nav-item",
        icon: <CurrencyRupeeIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "Report",
    type: "section",
    children: [
      {
        label: "Report",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/supervisor/attendanceReport",
            label: "Attendance Report",
            type: "nav-item",
          },
          {
            uri: "/supervisor/allotedParcelReport",
            label: "Parcel Alloted Report",
            type: "nav-item",
          },
          {
            uri: "/supervisor/deliveredparcelReport",
            label: "Delivered Parcel Report",
            type: "nav-item",
          },
          {
            uri: "/supervisor/rejectedparcelReport",
            label: "Rejected Parcel Report",
            type: "nav-item",
          },
          {
            uri: "/supervisor/allotedparcelfornextdayReport",
            label: "Parcel for Next Day Report",
            type: "nav-item",
          },
          {
            uri: "/supervisor/cashBookReport",
            label: "CashBook Report",
            type: "nav-item",
          },
          {
            uri: "/supervisor/ReceivedParcelReport",
            label: "Received Parcel Report",
            type: "nav-item",
          },

        ],
      },
    ],
  },
];

export const menuForManager = [
  {
    label: "sidebar.menu.home",
    type: "section",
    children: [
      {
        uri: "/dashboard",
        label: "Dashboard",
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },

  {
    label: "Attendance",
    type: "section",
    children: [
      {
        uri: "/check-in/attendance",
        label: "Check-In",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/check-out/attendance",
        label: "Check-Out",
        type: "nav-item",
        icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "Parcel",
    type: "section",
    children: [
      {
        uri: "/parcel/ParcelReceivedListM",
        label: "Parcel Received List",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/parcel/ParcelAllotmentListM",
        label: "Parcel Allotment List",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },

      {
        uri: "/parcel/ParcelDeliveryListM",
        label: "Parcel Delivery List",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "User List",
    type: "section",
    children: [
      {
        uri: "/userlists",
        label: "Users",
        type: "nav-item",
        icon: <ListIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "Report",
    type: "section",
    children: [
      {
        label: "Report",
        type: "collapsible",
        icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/manager/attendanceReport",
            label: "Attendance Report",
            type: "nav-item",
          },
        ],
      },
    ],
  },
];
const menus = [
  {
    label: "sidebar.menu.home",
    type: "section",
    children: [],
  },
];

export default menus;
