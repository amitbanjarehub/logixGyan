import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import Div from "@jumbo/shared/Div";
import { LoadingButton } from '@mui/lab';
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography } from "@mui/material";
import { Form, Formik } from 'formik';
import React, { useState } from "react";
import { useMutation, useQuery } from 'react-query';
import Box from "@mui/material/Box";
import * as yup from "yup";
import { companyServices } from "app/services/companyservices";
import { userServices } from "app/services/userservices";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";




let resetFormFunc = null;
const validationSchema = yup.object({


});

const ScrollDialog = ({ userId, open, onClose }) => {
    const uuserMutation = useMutation(userServices.update, {
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

    const onAdd = (
        userId,
        companyId,
        branchId,
        role,
        travellingAllowance,
        salary,

    ) => {
        uuserMutation.mutate({
            userId,
            companyId,
            branchId,
            role,
            travellingAllowance,
            salary,

        });
    };

    const [dopen, setdOpen] = React.useState(false);
    const handleClose = () => {
        setdOpen(false);
    };

    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("");

    const uDetails = useQuery(["user-list", { userId }], async () => userServices.details(userId));

    const userDetails = uDetails?.data?.data ?? [];
    const [cId, setId] = useState(userDetails?.companyId);
    const [branchId, setbId] = useState(userDetails?.branchId);
    const [role, setRole] = React.useState("");
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const wComp = useQuery(["company-list"], companyServices.wList);

    const liwComp = wComp?.data?.data ?? [];

    const cDetails = useQuery(["companyDetails", { cId }], async () =>
        companyServices.details(cId)
    );

    const liwBranch = cDetails?.data?.data.companyBranch ?? [];




    const comphandleChange = (event) => {
        setId(event.target.value);
        console.log("result of handleChange: ", event);
    };

    const bhandleChange = (e) => {
        setbId(e.target.value);

    };



    return (
        <Div >
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
                    <Typography variant={"h6"} color={"text.secondary"} mt={2}>
                        Loading...
                    </Typography>
                </Div>
            ) : (

                <Dialog
                    open={open}
                    onClose={onClose}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"

                >
                    <Div
                        style={{
                            height: "640px",
                            width: "400px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <DialogTitle id="scroll-dialog-title">User Profile Update</DialogTitle>
                        <DialogContent dividers={'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <Formik
                                    validateOnChange={true}
                                    validationSchema={validationSchema}
                                    initialValues={{
                                        userId: userId,
                                        companyId: userDetails.companyId,
                                        branchId: userDetails.branchId,
                                        role: userDetails.role,
                                        travellingAllowance: userDetails.travellingAllowance,
                                        salary: userDetails.salary,

                                    }}
                                    onSubmit={async (data, { setSubmitting, resetForm }) => {
                                        resetFormFunc = resetForm;
                                        setSubmitting(true);
                                        console.log("submitting");
                                        await onAdd(
                                            data.userId = userId,
                                            data.companyId = cId,
                                            data.branchId = branchId,
                                            data.role,
                                            data.travellingAllowance,
                                            data.salary,

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
                                                        width: { xs: "100%", sm: "50%" },
                                                    },

                                                    "& .MuiFormControl-root.MuiFormControl-fluid": {
                                                        width: "100%",
                                                    },
                                                }}
                                            >

                                                <FormControl className="MuiFormControl-fluid">
                                                    <InputLabel>Select Company</InputLabel>
                                                    <Select
                                                        name="companyName"
                                                        onChange={comphandleChange}
                                                        defaultValue={userDetails?.companyId}
                                                        value={cId}
                                                    >
                                                        {liwComp?.map((comp) => (
                                                            <MenuItem id={comp.id} value={comp.id} key={comp.id}>
                                                                {comp.companyName}{" "}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>





                                                <FormControl className="MuiFormControl-fluid">
                                                    <InputLabel>Select Branch</InputLabel>
                                                    <Select
                                                        name="branchId"
                                                        onChange={bhandleChange}
                                                        defaultValue={userDetails?.branchId}
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
                                                </FormControl>

                                                <FormControl className="MuiFormControl-fluid">
                                                    <InputLabel id="demo-simple-select-standard-label">
                                                        Select Role
                                                    </InputLabel>
                                                    <JumboSelectField
                                                        fullWidth
                                                        name="role"
                                                        label="Select Role"
                                                        defaultValue={userDetails?.role}
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
                                                    <JumboTextField
                                                        fullWidth
                                                        name="travellingAllowance"
                                                        defaultValue={userDetails?.travellingAllowance}
                                                        label="Travelling Allowance"

                                                    />
                                                </FormControl>
                                                <FormControl className="MuiFormControl-fluid">
                                                    <JumboTextField
                                                        fullWidth
                                                        name="salary"
                                                        defaultValue={userDetails?.salary}
                                                        label="Salary"
                                                    />
                                                </FormControl>
                                                <DialogActions>

                                                    <Div sx={{ mx: 1 }}>
                                                        <LoadingButton
                                                            fullWidth
                                                            type="submit"
                                                            variant="contained"
                                                            size="large"
                                                            sx={{ mb: 3 }}
                                                            loading={isSubmitting || uuserMutation.isLoading}
                                                        >
                                                            Update
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
                                                    <Div sx={{ mx: 5 }}>
                                                        <LoadingButton
                                                            fullWidth
                                                            variant="contained"
                                                            size="large"
                                                            sx={{ mb: 3 }}
                                                            onClick={onClose}
                                                        >
                                                            Cancel
                                                        </LoadingButton>
                                                    </Div>
                                                </DialogActions>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </DialogContentText>
                        </DialogContent>




                    </Div>
                </Dialog>
            )
            }
        </Div >

    );
};

export default ScrollDialog;
























































































































