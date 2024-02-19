import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DealAnalyticsGraphS from './DealAnalyticsGraphS';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import List from "@mui/material/List";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";


const ListItemInline = styled(ListItem)(({ theme }) => ({
    width: 'auto',
    display: 'inline-flex',
    padding: theme.spacing(0, .5),
}));
const DealsAnalyticsS = ({ branchID }) => {

    const bId = branchID;

    const { t } = useTranslation();
    return (
        <JumboCardQuick
            title={t("Parcel For Next Day")}

            sx={{
                '& .MuiCardHeader-action': {
                    alignSelf: 'flex-end',
                    mb: -1
                }
            }}
            wrapperSx={{ pt: 3.75 }}
            style={{ marginTop: "50px", height: "240px" }}
        >
            <DealAnalyticsGraphS bId={bId} />
        </JumboCardQuick>
    );
}

export default DealsAnalyticsS
