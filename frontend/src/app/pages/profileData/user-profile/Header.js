import React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import ContentHeader from "../../../layouts/shared/headers/ContentHeader";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  ASSET_AVATARS,
  SERVER_IMAGE_PATH,
} from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import { useQuery } from "react-query";
import { userServices } from "app/services/userservices";
import useAuth from "@jumbo/hooks/useJumboAuth";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(0, 1),

  "&:hover": {
    backgroundColor: "transparent",
  },

  "& .MuiTouchRipple-root": {
    display: "none",
  },
}));

const Item = styled("div")({
  textAlign: "center",
});

const Header = () => {
  const { authUser } = useAuth();

  if (!authUser) return null;


  return (
    <ContentHeader
      avatar={
        <Avatar
          sx={{ width: 72, height: 72 }}
          alt={"Remy Sharp"}

          src={SERVER_IMAGE_PATH + authUser?.userImage}
        />
      }
      title={authUser?.name}
      subheader={
        <Typography fontSize={12} variant={"body1"} color={"inherit"} mt={0.5}>
          {authUser?.role}
          <br />
          {authUser?.publicId}
        </Typography>
      }
      children={
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            mx: 1,
          }}
        >

        </Stack>
      }


      sx={{
        position: "relative",
        zIndex: 1,

        "& .MuiCardHeader-action": {
          alignSelf: "center",
        },
      }}
    />
  );
};

export default Header;
