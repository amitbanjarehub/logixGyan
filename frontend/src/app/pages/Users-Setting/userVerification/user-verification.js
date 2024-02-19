import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { companyServices } from "app/services/companyservices";
import { userServices } from "app/services/userservices";
import { SERVER_IMAGE_PATH } from "app/utils/constants/paths";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";

const validationSchema = yup.object({

});

let resetFormFunc = null;

const User_Verification = () => {
  const vuserMutation = useMutation(userServices.verify, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("response from api", data);
      setdOpen(true);
      if (data.status === 200) {
        setSeverity("success");
        setMsg(data.message);
        resetFormFunc();
      } else {
        setSeverity("error");
        setMsg(data.message);
      }
    },
  });

  console.log("vuserMutation", vuserMutation);

  const [open, setOpen] = React.useState(false);

  const onAdd = (
    userId,
    companyId,
    branchId,
    role,
    employementType,
    salary,
    isApproved,
    travellingAllowance
  ) => {
    vuserMutation.mutate({
      userId,
      companyId,
      branchId,
      role,
      employementType,
      salary,
      isApproved,
      travellingAllowance
    });
  };

  const [role, setRole] = React.useState("");

  const [salarytype, setSalaryType] = React.useState("");

  const [isApproved, setIsApproved] = React.useState("");

  const liuser = useQuery(["user-list"], userServices.alist);

  const lisusers = liuser?.data?.data ?? [];

  const fusers = lisusers.filter((item) => item.isApproved === "bacic-verify");

  const [userId, setUserId] = useState();

  const [cId, setId] = useState();

  const [bId, setbId] = useState();

  const userhandleChange = (event) => {
    setUserId(event.target.value);
    console.log("result of handleChange: ", event);
  };

  const uDetails = useQuery(["companyDetails", { userId }], async () =>
    userServices.details(userId)
  );

  const liuDetails = uDetails?.data?.data ?? [];

  const wComp = useQuery(["company-list"], companyServices.wList);

  const liwComp = wComp?.data?.data ?? [];

  const comphandleChange = (event) => {
    setId(event.target.value);
    console.log("result of handleChange: ", event);
  };

  const cDetails = useQuery(["companyDetails", { cId }], async () =>
    companyServices.details(cId)
  );

  const liwBranch = cDetails?.data?.data.companyBranch ?? [];

  const bhandleChange = (e) => {
    setbId(e.target.value);

  };

  const handleClose = () => {
    setdOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const [dopen, setdOpen] = React.useState(false);



  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>

      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component={"h2"} variant="h1" mb={3}>
              User Verification
            </Typography>
            <Formik
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{
                userId: "",
                companyId: "",
                branchId: "",
                role: "",
                employementType: "",
                salary: "",
                isApproved: "",
                travellingAllowance: ""
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submitting", data);

                onAdd(
                  (data.userId = userId),
                  (data.companyId = cId),
                  data.branchId,
                  data.role,
                  data.employementType,
                  data.salary,
                  data.isApproved,
                  data.travellingAllowance
                );
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form noValidate autoComplete="off">
                  <Box
                    sx={{
                      mx: -1,

                      "& .MuiFormControl-root:not(.MuiTextField-root)": {
                        p: 1,
                        mb: 2,
                        width: { xs: "100%", sm: "100%" },
                      },

                      "& .MuiFormControl-root.MuiFormControl-fluid": {
                        width: "100%",
                      },
                    }}
                  >
                    <FormControl sx={{ minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Applicant
                      </InputLabel>
                      <Select
                        label="Select Applicant"
                        name="userId"
                        onChange={userhandleChange}
                        value={userId}
                      >
                        {fusers?.map((user) => (
                          <MenuItem id={user.id} value={user.id} key={user.id}>
                            {user.name}{" "}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button variant="outlined" onClick={() => setOpen(true)}>
                        View Image
                      </Button>
                      <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogContent>
                          <Div

                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              m: "auto",
                              width: "fit-content",
                            }}
                          >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                              <Avatar
                                a
                                alt="Remy Sharp"
                                src={SERVER_IMAGE_PATH + liuDetails.userImage}
                                sx={{ width: 500, height: 500 }}
                              />
                            </FormControl>
                          </Div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpen(false)}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </Div>
                    {uDetails.isLoading ? (
                      <Div
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          p: (theme) => theme.spacing(3),
                          m: "auto",
                        }}
                      >
                        <CircularProgress />
                        <Typography
                          variant={"h6"}
                          color={"text.secondary"}
                          mt={2}
                        >
                          Loading...
                        </Typography>
                      </Div>
                    ) : (
                      <Div>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Address"
                            defaultValue={liuDetails.address}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Date of Birth"
                            defaultValue={liuDetails.dob}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Mobile Number"
                            defaultValue={liuDetails.mobileNumber}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Blood Group"
                            defaultValue={liuDetails.bloodGroup}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Aadhar Card No."
                            defaultValue={liuDetails.aadharNumber}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Pan Card Number"
                            defaultValue={liuDetails.panNumber}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Bank Name"
                            defaultValue={liuDetails?.bankDetails?.BankName}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="Account Number"
                            defaultValue={
                              liuDetails?.bankDetails?.AccountNumber
                            }

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="IFSC Code"
                            defaultValue={liuDetails?.bankDetails?.ifscCode}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                        <FormControl className="MuiFormControl-fluid">
                          <TextField
                            label="UPI ID"
                            defaultValue={liuDetails?.bankDetails?.upiId}

                            InputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      </Div>
                    )}

                    <FormControl sx={{ minWidth: 80 }}>
                      <InputLabel>Select Company</InputLabel>
                      <Select
                        name="companyId"
                        label="Select Company"
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
                    <FormControl sx={{ minWidth: 80 }}>
                      <InputLabel>Select Branch</InputLabel>
                      <JumboSelectField
                        name="branchId"
                        label="Select Branch"
                        onChange={bhandleChange}
                        value={bId}
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
                      </JumboSelectField>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Role
                      </InputLabel>
                      <JumboSelectField
                        fullWidth
                        name="role"
                        label="Select Role"
                        value={role}
                        onChange={(drole) => setRole(drole.target.value)}
                      >
                        <MenuItem value="" disabled>
                          Select Role
                        </MenuItem>
                        <MenuItem value={"manager"}>Manager</MenuItem>
                        <MenuItem value={"supervisor"}>Supervisor</MenuItem>
                        <MenuItem value={"deliveryBoy"}>Delivery Boy</MenuItem>
                      </JumboSelectField>
                    </FormControl>



                    <FormControl className="MuiFormControl-fluid">
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Employement Type
                      </InputLabel>
                      <JumboSelectField
                        fullWidth
                        name="employementType"
                        label="Select Employement Type"
                        value={salarytype}
                        onChange={(dsalarytype) =>
                          setSalaryType(dsalarytype.target.value)
                        }
                      >
                        <MenuItem value="fullTime">Full Time</MenuItem>
                        <MenuItem value="partTime">Part Time</MenuItem>
                        <MenuItem value="contractBasis">
                          Contract Basis
                        </MenuItem>
                      </JumboSelectField>
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        name="salary"
                        type="number"
                        label="Define Salary / Rate"
                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <JumboTextField
                        fullWidth
                        label="Travelling Allowance"
                        type="number"
                        name="travellingAllowance"
                      />
                    </FormControl>

                    <FormControl className="MuiFormControl-fluid">
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Approved Status
                      </InputLabel>
                      <JumboSelectField
                        fullWidth
                        name="isApproved"
                        label="Select Approved Status"
                        value={isApproved}
                        onChange={(dIsApproved) =>
                          setIsApproved(dIsApproved.target.value)
                        }
                      >
                        <MenuItem value={"basic-verify"}>
                          Basic Details Verified
                        </MenuItem>
                        <MenuItem value={"yes"}>Applicant Approved</MenuItem>
                        <MenuItem value={"reject"}>Applicant Rejected</MenuItem>
                      </JumboSelectField>
                    </FormControl>

                    <Div sx={{ mx: 1 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mb: 3 }}
                        loading={isSubmitting || vuserMutation.isLoading}
                      >
                        Submit
                      </LoadingButton>
                      <Snackbar
                        open={dopen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <Alert
                          variant="filled"
                          onClose={handleClose}
                          severity={severity}
                          sx={{ width: "100%" }}
                        >
                          {msg}
                        </Alert>
                      </Snackbar>
                    </Div>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Div>
      </Card>
    </React.Fragment>
  );
};

export default User_Verification;
