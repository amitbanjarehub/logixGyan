import React from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Div from "@jumbo/shared/Div";
import Button from "@mui/material/Button";
import { ASSET_IMAGES } from "app/utils/constants/paths";
import { getAssetPath } from "app/utils/appHelpers";
import Stack from "@mui/material/Stack";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const profile = () => {

  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>

      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>

            <Box
              component="form"
              sx={{
                mx: -1,

                "& .MuiFormControl-root:not(.MuiTextField-root)": {
                  p: 1,
                  mb: 2,
                  width: { xs: "100%", sm: "50%" },
                },

                "& .MuiFormControl-root.MuiFormControl-fluid": {
                  width: "100%",
                },
              }}
              autoComplete="off"
            >

              <JumboDemoCard
                title={"Offer Letter"}

                wrapperSx={{ backgroundColor: "background.paper", pt: 0 }}
              >
                <Button variant="outlined" href="#contained-buttons">
                  <a href="/somefile.txt" target="_blank" download>
                    Download
                  </a>
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="outlined"
                  href="#contained-buttons"
                  media="print"
                >
                  Print
                </Button>
              </JumboDemoCard>
            </Box>
          </CardContent>
        </Div>
      </Card>
    </React.Fragment>
  );
};

export default profile;
