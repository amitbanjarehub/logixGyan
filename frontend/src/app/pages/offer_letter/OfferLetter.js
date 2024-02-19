import React from "react";
import Typography from "@mui/material/Typography";
import CkEditorExample from "./demo";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Div from "@jumbo/shared/Div";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { companyServices } from "app/services/companyservices";
import { useQuery } from "react-query";

const CkEditor = () => {
  const { t } = useTranslation();
  const [cId, setcId] = useState();
  const comphandleChange = (event) => {
    setcId(event.target.value);
    console.log("result of handleChange: ", event);
  };

  const liwComp = wComp?.data?.data ?? [];

  const wComp = useQuery(["company-list"], companyServices.wList);

  console.log("result of wComp: ", wComp);
  const cDetails = useQuery(["companyDetails", { cId }], async () =>
    companyServices.details(cId)
  );

  return (
    <React.Fragment>
      <Typography variant={"h1"} sx={{ mb: 3 }}>
        {"Offer Letter"}
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
                  width: { xs: "30%", sm: "50%" },
                },

                "& .MuiFormControl-root.MuiFormControl-fluid": {
                  width: "30%",
                },
              }}
              autoComplete="off"
            >
              <JumboDemoCard
                title={""}
                wrapperSx={{ backgroundColor: "background.paper", pt: 0 }}
              >
                <FormControl className="MuiFormControl-fluid">
                  <InputLabel>Select Company</InputLabel>
                  <Select
                    name="companyName"
                    onChange={comphandleChange}
                    value={cId}
                  >
                    {liwComp?.map((comp) => (
                      <MenuItem id={comp.id} value={comp.id} key={comp.id}>
                        {comp.companyName}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </JumboDemoCard>
            </Box>
          </CardContent>
        </Div>
      </Card>
      <CkEditorExample />
    </React.Fragment>
  );
};

export default CkEditor;
