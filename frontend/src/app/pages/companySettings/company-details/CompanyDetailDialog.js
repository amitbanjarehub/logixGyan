import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Div from "@jumbo/shared/Div";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { companyServices } from "app/services/companyservices";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { useQuery } from "react-query";

const CompanyDetailDialog = ({ cId, open, onClose }) => {
    const cDetails = useQuery(['companyDetails', { cId }], async () => companyServices.details(cId));
    console.log("result of cDetails: ", cDetails)

    const ciData = cDetails?.data?.data ?? [];
    const ciBData = cDetails?.data?.data?.bankDetails ?? [];

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");

    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);

    const columns = [
        {
            name: "branchName",
            label: "Branch Name",
            options: { filterOptions: { fullWidth: true } }
        },

        {
            name: "address",
            label: "Address",
            options: { filterOptions: { fullWidth: true } }
        },
        {
            name: "lat",
            label: "Latitude",
            options: { filterOptions: { fullWidth: true } }
        },
        {
            name: "long",
            label: "Longitude",
            options: { filterOptions: { fullWidth: true } }
        },

    ]

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onTableChange: (action, state) => {
            console.log(action);
            console.dir(state);
        }


    };


    const CustomLoadingOverlay = () => {
        return (
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress color="inherit" />
            </div>
        );
    };

    const muiCache = createCache({
        key: "mui-datatables",
        prepend: true

    });


    return (
        <Div>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={false}
                open={open}
                onClose={onClose}


            >
                {
                    cDetails.isLoading
                        ?
                        <Div
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: theme => theme.spacing(3),
                                m: 'auto',
                            }}
                        >
                            <CircularProgress />
                            <Typography variant={'h6'} color={'text.secondary'} mt={2}>Loading...</Typography>
                        </Div>
                        :

                        <DialogContent>
                            <Div >
                                <DialogTitle style={{ paddingLeft: '0', margin: '0' }}>Company Details</DialogTitle>
                                <Div>
                                    <TextField label="Company Name" defaultValue={ciData.companyName} style={{ width: '500px', marginRight: '1.5rem' }} InputProps={{ readOnly: true, }} />
                                    <TextField label="GST NUmber" defaultValue={ciData.gstNo} style={{ width: '300px', marginRight: '1.5rem' }} InputProps={{ readOnly: true, }} />
                                    <TextField label="Address" defaultValue={ciData.address} style={{ width: '500px', marginRight: '1.5rem' }} multiline InputProps={{ readOnly: true, }} />
                                </Div>

                            </Div>

                            <Div style={{ paddingBottom: '50px' }}>
                                <DialogTitle style={{ paddingLeft: '0', margin: '0' }}>Bank Details</DialogTitle>
                                <Div>
                                    <TextField id="bankName" label="Bank Name" defaultValue={ciBData.bankName} style={{ width: '200px', marginRight: '1.5rem' }} InputProps={{ readOnly: true, }} />
                                    <TextField id="accountNumber" label="Account Number" defaultValue={ciBData.accountNumber} style={{ width: '200px', marginRight: '1.5rem' }} InputProps={{ readOnly: true, }} />
                                    <TextField id="ifscCode" label="IFSC Code" defaultValue={ciBData.ifscCode} style={{ width: '200px', marginRight: '1.5rem' }} InputProps={{ readOnly: true, }} />
                                    <TextField id="upiId" label="UPI Number" defaultValue={ciBData.upiId} style={{ width: '200px', marginRight: '1.5rem' }} InputProps={{ readOnly: true, }} />
                                </Div>
                            </Div>



                            <CacheProvider value={muiCache} style={{ paddingTop: '900px', paddingBottom: '100px', margin: '0' }}>
                                {
                                    cDetails.isLoading
                                        ?
                                        <Div
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                p: theme => theme.spacing(3),
                                                m: 'auto',
                                            }}
                                        >
                                            <CircularProgress />
                                            <Typography variant={'h6'} color={'text.secondary'} mt={2}>Loading...</Typography>
                                        </Div>
                                        :
                                        <MUIDataTable

                                            title={"Branch List"}

                                            data={ciData.companyBranch}
                                            columns={columns}
                                            options={options}
                                            components={{
                                                LoadingOverlay: CustomLoadingOverlay,

                                            }}

                                        />
                                }
                            </CacheProvider>
                        </DialogContent>
                }

                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>


        </Div>
    )





};

export default CompanyDetailDialog;