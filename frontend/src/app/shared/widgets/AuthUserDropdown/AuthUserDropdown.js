import React from "react";
import Avatar from "@mui/material/Avatar";
import {
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import useAuth from "@jumbo/hooks/useJumboAuth";
import Link from "@mui/material/Link";
import { userServices } from "app/services/userservices";
import { useQuery } from "react-query";
import ChangePassword from "app/pages/auth-pages/Changepassword/change-password";
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";

const AuthUserDropdown = () => {
  const navigate = useNavigate();
  const { theme } = useJumboTheme();
  const { authUser, setAuthToken } = useAuth();

  const [open, setOpen] = React.useState(false);

  //console.log("Open",open)

  const onLogout = () => {
    setAuthToken(null);
    window.location.reload(false);
  };

  if (!authUser) return null;

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Avatar
            //src={authUser?.data.userImage}
            // src={SERVER_IMAGE_PATH + authUser?.userImage}
            src={SERVER_IMAGE_PATH + authUser?.userImage}
            sizes={"small"}
            sx={{ boxShadow: 25, cursor: "pointer" }}
          />
        }
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: (theme) => theme.spacing(2.5),
          }}
        >
          <Avatar
            // src={authUser.profile_pic}
            src={SERVER_IMAGE_PATH + authUser?.userImage}
            alt={authUser.name}
            sx={{ width: 60, height: 60, mb: 2 }}
          />
          <Typography variant={"h5"}>{authUser.name}</Typography>
          <Typography variant={"body1"} color="text.secondary">
            {authUser.email}
          </Typography>
        </Div>
        <Divider />
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PersonOutlineIcon />
              </ListItemIcon>

              <ListItemText
                onClick={() => navigate("/userprofile")}
                primary="Profile"
                sx={{ my: 0 }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EditOutlinedIcon />
              </ListItemIcon>

              <ListItemText
                onClick={() => navigate("/editprofile")}
                primary="Edit Profile"
                sx={{ my: 0 }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <RepeatOutlinedIcon />
              </ListItemIcon>

              <ListItemText
                //onClick={() => navigate("/samples/content-layout")}
                onClick={() => setOpen(true)}
                primary="Change Password"
                sx={{ my: 0 }}
              />
              <ChangePassword open={open} onClose={() => setOpen(false)} />
            </ListItemButton>
            <ListItemButton onClick={onLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ my: 0 }} />
            </ListItemButton>
          </List>
        </nav>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export default AuthUserDropdown;
