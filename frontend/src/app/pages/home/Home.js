import useAuth from "@jumbo/hooks/useJumboAuth";
import { useLayoutEffect, useState } from "react";
import AdminDashboard from "./adminDashboard";
import DeliveryboyDashboard from "./deliveryboyDashboard";
import ManagerDashboard from "./managerDashboard";
import SupervisorDashboard from "./supervisorDashboard";

const MainDashboard = () => {
  const [page, setPage] = useState(null);
  const authUser = useAuth();

  useLayoutEffect(() => {

    if (authUser.authUser) {
      switch (authUser.authUser.role) {
        case "admin":
          setPage(<AdminDashboard />);
          break;

        case "deliveryBoy":
          setPage(<DeliveryboyDashboard />);
          break;
        case "supervisor":
          setPage(<SupervisorDashboard />);
          break;
        case "manager":
          setPage(<ManagerDashboard />);
          break;

        default:
      }
    }
  }, [authUser]);

  return page;
};

export default MainDashboard;
