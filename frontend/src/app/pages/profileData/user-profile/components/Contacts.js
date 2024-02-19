import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import useAuth from "@jumbo/hooks/useJumboAuth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import Link from "@mui/material/Link";

const Contacts = () => {
  const { authUser } = useAuth();

  if (!authUser)
    return null;

  return (
    <JumboCardQuick title={"Contact"} style={{ height: "280px" }}>
      <List disablePadding sx={{ mb: 2 }}>
        <ListItem
          alignItems="flex-start"
          sx={{ p: (theme) => theme.spacing(0.5, 3) }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <EmailOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="text.secondary">
                Email
              </Typography>
            }
            secondary={
              <Link variant="body1" href="#" underline="none">
                {authUser?.email}
              </Link>
            }
          />
        </ListItem>
        <ListItem
          alignItems="flex-start"
          sx={{ p: (theme) => theme.spacing(0.5, 3) }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <InsertLinkOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="text.secondary">
                Address
              </Typography>
            }
            secondary={
              <Link variant="body1" href="#" underline="none">
                {authUser?.address}
              </Link>
            }
          />
        </ListItem>
        <ListItem
          alignItems="flex-start"
          sx={{ p: (theme) => theme.spacing(0.5, 3) }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <LocalPhoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="text.secondary">
                Mobile No.
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                {authUser?.mobileNumber}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </JumboCardQuick>
  );
};

export default Contacts;
