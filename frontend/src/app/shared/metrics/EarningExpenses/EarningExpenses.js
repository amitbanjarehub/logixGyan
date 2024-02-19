import React from "react";
import EarningExpensesChart from "./EarningExpensesChart";
import { Card, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Div from "@jumbo/shared/Div";

const EarningExpenses = () => {
  const [activeChart, setActiveChart] = React.useState("expense");
  // console.log("activeChart", activeChart);
  return (
    <Card style={{ marginTop: "10px" }}>
      <CardContent
        sx={{
          display: "flex",
          minWidth: 0,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
       
        <Stack direction={"row"} spacing={1}>
          <Button
            variant={
              activeChart === "Parcel_Delivered" ? "contained" : "outlined"
            }
            size={"small"}
            onClick={() => setActiveChart("Parcel_Delivered")}
          >
            Parcel Delivered
          </Button>
          <Button
            variant={
              activeChart === "Parcel_Received" ? "contained" : "outlined"
            }
            disableElevation
            color={"secondary"}
            size={"small"}
            onClick={() => setActiveChart("Parcel_Received")}
          >
            Parcel Received
          </Button>
        </Stack>
      </CardContent>
      <EarningExpensesChart activeChart={activeChart} />
    </Card>
  );
};

export default EarningExpenses;
