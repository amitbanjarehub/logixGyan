import styled from "@emotion/styled";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import useAuth from "@jumbo/hooks/useJumboAuth";
import Div from "@jumbo/shared/Div";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TabContext from "@mui/lab/TabContext";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 24,
  height: 48,
  width: 48,
  borderRadius: "50%",
  minWidth: 42,
  marginRight: 16,
  padding: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
  border: `solid 1px ${theme.palette.divider}`,
}));
const About = () => {
  const [value, setValue] = useState("1");
  const { authUser } = useAuth();
  console.log("authuser", authUser);

  if (!authUser)
    return null;






  return (
    <JumboCardQuick
      title={"About"}
      action={
        <TabContext value={value}>
          <Div
            sx={{
              marginTop: -2.25,
              marginBottom: -2.5,

              "& .MuiTab-root": {
                py: 2.5,
              },
            }}
          >

          </Div>
        </TabContext>
      }
      headerSx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
      sx={{ mb: 3.75 }}
    >
      <List
        disablePadding
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: (theme) => theme.spacing(0, -2),
        }}
      >
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <CakeOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Birthday
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {authUser?.dob}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <GroupsOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Blood Group
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {authUser?.bloodGroup}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <SchoolOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Adhar Card No.
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {authUser?.aadharNumber}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <CottageOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Pan Card No.
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {authUser?.panNumber}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <ApartmentIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Works at
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {authUser?.companyName?.companyName}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <CottageOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Branch Name
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {authUser?.branchName?.branchName}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </JumboCardQuick>
  );
};

export default About;
