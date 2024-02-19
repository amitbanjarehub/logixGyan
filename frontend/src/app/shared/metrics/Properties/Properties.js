import React from "react";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { useTranslation } from "react-i18next";
import PropertiesGraph from "./PropertiesGraph";

const Properties = () => {
  const { t } = useTranslation();
  return (
    <JumboCardQuick
      title={
        <Typography
          variant={"h6"}
          mb={0}
          sx={{ fontSize: 12, color: "common.white", letterSpacing: 1.5 }}
        >
          {"Total No. Of Company"}
        </Typography>
      }
      sx={{ color: "common.white" }}
      bgColor={"#9575cd"}
      wrapperSx={{ p: 0, "&:last-child": { p: 0 } }}
    >
      <Div
        sx={{
          p: 3,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          position: "absolute",
        }}
      >
        <Typography variant={"h2"} color={"common.white"}>
          10
        </Typography>
        
      </Div>
      <PropertiesGraph />
    </JumboCardQuick>
  );
};

export default Properties;
