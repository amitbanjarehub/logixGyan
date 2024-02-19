import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { companyServices } from "app/services/companyservices";
import SalesReport1 from "app/shared/metrics/SalesReport1";
import Documents1 from "app/shared/widgets/Documents1";
import Ideas1 from "app/shared/widgets/Ideas1";
import TeamsCounterCard from "app/shared/widgets/TeamsCounterCard";
import { useState } from "react";
import { useQuery } from "react-query";
import ParcelReceivedGraph from "./ParcelReceivedGraph";
import DeliveredRejectedParcel from "./DeliveredRejectedParcel";
import ParcelAlloted from "./ParcelAllotedGraph";
import ParcelDeliveredGraph from "./ParcelDeliveredGraph";
import TicketsStatus from "./TicketsStatus";

const AdminDashboard = () => {

  const [cId, setcId] = useState(1);

  const [branchId, setbId] = useState(1);

  const wComp = useQuery(["company-list"], companyServices.wList);


  const liwComp = wComp?.data?.data ?? [];

  const comphandleChange = (event) => {
    setcId(event.target.value);

  };

  const bhandleChange = (e) => {
    setbId(e.target.value);

  };

  const cDetails = useQuery(["companyDetails", { cId }], async () =>
    companyServices.details(cId)
  );

  const liwBranch = cDetails?.data?.data.companyBranch ?? [];

  return (

    <>
      <div
        style={{
          display: "flex",


        }}
      >
        {/* <FormControl className="MuiFormControl-fluid"

        >
          <InputLabel>Select Company</InputLabel>
          <Select
            name="companyName"
            sx={{ width: 220 }}
            onChange={comphandleChange}
            value={cId}
          >
            {liwComp?.map((comp) => (
              <MenuItem id={comp.id} value={comp.id} key={comp.id}>
                {comp.companyName}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        {/* <FormControl className="MuiFormControl-fluid"
          style={{
            marginLeft: "50px",

          }}
        >
          <InputLabel>Select Branch</InputLabel>
          <Select
            name="branchId"
            sx={{ width: 220 }}
            onChange={bhandleChange}
            value={branchId}
          >
            {liwBranch?.map((branch) => (
              <MenuItem
                id={branch.id}
                value={branch.id}
                key={branch.id}
              >
                {branch.branchName}{" "}
              </MenuItem>

            ))}
          </Select>
        </FormControl> */}



      </div>
      <br /><br />

      <Grid container spacing={3.75}>

        {/* 8th */}
        <Grid item xs={12} sm={6} lg={12}>
          <TeamsCounterCard />
        </Grid>

        {/* 1st */}
         {/* <Grid item xs={12} md={5} lg={4}>
          <TicketsStatus branchId={branchId} />
        </Grid>  */}
        {/* 2st */}
         {/* <Grid item xs={12} md={6} lg={6}>
          <SalesReport1 branchId={branchId} />
        </Grid>  */}
        {/* 3rd 1 & 2 */}
        {/* <Grid item xs={12} lg={2}>
          <Grid container spacing={3.75}>
            <Grid item xs={12} sm={6} lg={12}>
              <Documents1 />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <Ideas1 />
            </Grid>
          </Grid>
        </Grid> */}
        {/* 4th */}
        {/* <Grid item xs={12} lg={6}>
          <DeliveredRejectedParcel branchId={branchId} />
        </Grid> */}
        {/* 5th */}
        {/* <Grid item xs={12} md={6}>
          <ParcelAlloted branchId={branchId} />
        </Grid> */}
        {/* 6th */}
        {/* <Grid item xs={12} sm={6} lg={6}>
          <ParcelReceivedGraph branchId={branchId} />
        </Grid> */}
        {/* 7th */}
        {/* <Grid item xs={12} lg={6}>
          <ParcelDeliveredGraph branchId={branchId} />
        </Grid> */}

      </Grid>

    </>
  );
};




export default AdminDashboard;
