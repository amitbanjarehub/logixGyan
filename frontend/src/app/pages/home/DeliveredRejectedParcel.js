import { Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from "react";
import DeliveredRejectedParcelChart from "./DeliveredRejectedParcelChart";

const DeliveredRejectedParcel = ({ branchId }) => {

  const [activeChart, setActiveChart] = React.useState("expense");

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
      <DeliveredRejectedParcelChart activeChart={activeChart} branchId={branchId} />
    </Card>
  );
};

export default DeliveredRejectedParcel;
