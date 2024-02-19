import { DrawerHeader } from "@jumbo/components/JumboLayout/style";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import Div from "@jumbo/shared/Div";
import { SIDEBAR_STYLES, SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import useAuth from "@jumbo/hooks/useJumboAuth";
import React, { Suspense } from "react";
import Logo from "../../../../shared/Logo";//sidebar log
import {
  menuForAdmin,
  menuForDeliveryBoy,
  menuForManager,
  menuForSupervisor,
} from "./menus";
// import { menuForAdmin } from "./menus";
import SidebarSkeleton from "./SidebarSkeleton";

const Sidebar = () => {
  const { authUser } = useAuth();

  const sidebarMenus = React.useMemo(() => {
    if (authUser) {
      switch (authUser.role) {
        case "admin":
          return menuForAdmin;
        case "deliveryBoy":
          return menuForDeliveryBoy;
        case "manager":
          return menuForManager;
        case "supervisor":
          return menuForSupervisor;
        default:
          return null;
      }
    }
    return [];
  }, [authUser]);

  return (
    <React.Fragment>
      <SidebarHeader />
      <JumboScrollbar autoHide autoHideDuration={200} autoHideTimeout={500}>
        <Suspense
          fallback={
            <Div
              sx={{
                display: "flex",
                minWidth: 0,
                alignItems: "center",
                alignContent: "center",
                px: 3,
              }}
            >
              <SidebarSkeleton />
            </Div>
          }
        >
          <JumboVerticalNavbar items={sidebarMenus} />
        </Suspense>
      </JumboScrollbar>
    </React.Fragment>
  );
};

const SidebarHeader = () => {
  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
  const { sidebarTheme } = useJumboSidebarTheme();

  const isMiniAndClosed = React.useMemo(() => {
    return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  }, [sidebarOptions.view, sidebarOptions.open]);

  return (
    <React.Fragment>
      {sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <DrawerHeader>
          <Logo mini={isMiniAndClosed} mode={sidebarTheme.type} />
          {
            <Zoom in={sidebarOptions?.open}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 0, mr: -1.5 }}
                onClick={() => setSidebarOptions({ open: false })}
              >
                <MenuOpenIcon />
              </IconButton>
            </Zoom>
          }
        </DrawerHeader>
      )}
    </React.Fragment>
  );
};

export default Sidebar;
