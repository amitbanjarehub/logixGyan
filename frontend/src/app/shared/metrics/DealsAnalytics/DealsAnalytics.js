import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import DealsAnalyticsGraph from "./DealsAnalyticsGraph";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import List from "@mui/material/List";
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";

const ListItemInline = styled(ListItem)(({theme}) => ({
    width: 'auto',
    display: 'inline-flex',
    padding: theme.spacing(0, .5),
}));
const DealsAnalytics = () => {
    const {t} = useTranslation();
    return (
        <JumboCardQuick
            title={t("Parcel For Next Day")}
           
         sx={{
                '& .MuiCardHeader-action': {
                    alignSelf: 'flex-end',
                    mb: -1
                }
            }}
            wrapperSx={{pt: 3.75}}
            style={{marginTop: "50px", height: "240px"}}
        >
            <DealsAnalyticsGraph/>
        </JumboCardQuick>
    );
};
export default DealsAnalytics;
