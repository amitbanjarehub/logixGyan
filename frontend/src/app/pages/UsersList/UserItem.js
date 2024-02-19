import styled from "@emotion/styled";
import Div from "@jumbo/shared/Div";
import Span from "@jumbo/shared/Span";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { userServices } from "app/services/userservices";
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import React, { useState } from "react";
import Fade from '@mui/material/Fade';
import UpdateUserProfile from './updateUserProfile';


const Item = styled(Span)(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));

const UserItem = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [userId, setUserId] = React.useState();

  console.log("uid", userId)

  const handleDelete = () => {
    setOpen(true);
  };


  const handleDeleteAgree = () => {
    userServices.delete(user.id);
    setOpen(false);
    window.location.reload(false);
  };

  const handleBlock = () => {
    setOpen1(true);
  };

  const handleBlockAgree = (block) => {
    setUserId(user.id)
    userServices.block(user.id, block);
    setOpen1(false);
    window.location.reload(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateProfile = () => {
    setUserId(user.id)
  }

  const handleDialogClose = React.useCallback(() => {
    setUserId(null);
  }, []);

  // deleteUser();
  return (
    <Card sx={{ mb: 1 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ p: (theme) => theme.spacing(2, 1) }}
      >
        <Item
          sx={{
            flex: { xs: 1, md: "0 1 45%", lg: "0 1 35%" },
          }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Item>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                }}
                alt={user.name}
                src={SERVER_IMAGE_PATH + user.userImage}
              />
            </Item>
            <Item>
              <Typography variant={"h6"} mb={0.5}>
                {user.name}
              </Typography>
              <Typography variant={"body1"} color="text.secondary">
                {user.mobileNumber}
              </Typography>
              <Typography variant={"body1"} color="text.secondary">
                {user.email}
              </Typography>
            </Item>
          </Stack>
        </Item>

        <Item
          sx={{
            alignSelf: "flex-start",
            flexBasis: { md: "28%", lg: "18%" },
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography variant={"h6"} mt={1} lineHeight={1.25}>
            {user.role}
          </Typography>
          <Typography variant={"body1"} color="text.secondary">
            Role
          </Typography>
        </Item>
        <Item
          sx={{
            alignSelf: "flex-start",
            flexBasis: { md: "28%", lg: "18%" },
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography variant={"h6"} mt={1} lineHeight={1.25}>
            {user.salary}
          </Typography>
          <Typography variant={"body1"} color="text.secondary">
            Salary
          </Typography>
        </Item>
        <Item
          sx={{
            alignSelf: "flex-start",
            flexBasis: { md: "18%", lg: "10%" },
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography variant={"h6"} mt={1} lineHeight={1.25}>
            {user.travellingAllowance}
          </Typography>
          <Typography variant={"body1"} color="text.secondary">
            Travelling Allowance
          </Typography>
        </Item>
        <Item
          sx={{
            flexBasis: "40%",
            display: { xs: "none", lg: "block" },
          }}
        >
          <Stack
            spacing={2}
            direction={"row"}
            alignItems={"center"}
            sx={{ textAlign: "center" }}
          >
            <Item>
              <Typography variant={"h6"} mb={0.5}>
                {user.publicId}
              </Typography>
              <Typography variant={"body1"} color="text.secondary">
                Employee ID
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} mb={0.5}>
                {user.companyData.companyName}
              </Typography>
              <Typography variant={"body1"} color="text.secondary">
                Company Name
              </Typography>
            </Item>
            <Item>
              <Typography variant={"h6"} mb={0.5}>
                {user.branchData.branchName}
              </Typography>
              <Typography variant={"body1"} color="text.secondary">
                Branch Name
              </Typography>
            </Item>
          </Stack>
        </Item>
        <Item
          sx={{
            ml: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Button
            sx={{ minWidth: 92 }}
            disableElevation
            variant={"contained"}
            size={"small"}
            color={
              user.isBlock === "true" || user.isBlock === "yes"
                ? "primary"
                : "error"
            }
            onClick={handleBlock}
          >
            {user.isBlock === "true" || user.isBlock === "yes"
              ? "UnBlock"
              : "Block"}
          </Button>
          <br />
          <br />
          <Div>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={"error"}
              id="fade-button"
              aria-controls={openMenu ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleMenuClick}
            >
              {"Menu"}
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleUpdateProfile}>Update Profile</MenuItem>
              <MenuItem onClick={handleDelete}>Delete User</MenuItem>
            </Menu>
          </Div>
        </Item>
        <Div>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <WarningIcon color="error" fontSize="large" />
              </Grid>
              {"Are you sure you want to Delete User ?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Disagree</Button>
              <Button color="error" onClick={handleDeleteAgree} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Div>
        <Div>
          <Dialog
            open={open1}
            onClose={() => setOpen1(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <WarningIcon color="error" fontSize="large" />
              </Grid>
              {user.isBlock === "true" || user.isBlock === "yes"
                ? "Are you sure you want to Unblock User ?"
                : "Are you sure you want to Block User ?"
              }
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setOpen1(false)}>Disagree</Button>
              <Button
                color="error"
                onClick={
                  user.isBlock === "true" || user.isBlock === "yes"
                    ? handleBlockAgree.bind(this, "no")
                    : handleBlockAgree.bind(this, "yes")


                }
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          {
            userId && (
              <UpdateUserProfile userId={userId} open={!!userId} onClose={handleDialogClose} />
            )
          }
        </Div>
      </Stack>
    </Card>
  );
};

export default UserItem;
