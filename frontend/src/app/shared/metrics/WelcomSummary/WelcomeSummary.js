import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";

import SiteVisitsGraph from "./components/SiteVisitsGraph";
import SiteAudienceInfo from "./components/SiteAudienceInfo";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const
    WelcomeSummary = ({ branchId }) => {
        const { t } = useTranslation();
        const bID = branchId;
        return (
            <JumboCardQuick
                title={t("Payment Received")}
                style={{ height: "265px" }}
            >
                <Grid container spacing={3.75}
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                >

                    <Grid item xs={12} sm={6} lg={3} sx={{ order: { lg: 3 } }}>
                        <SiteAudienceInfo bID={bID} />{/* Use for show percentage */}
                    </Grid>

                    <Grid item xs={12} lg={8}>
                        <SiteVisitsGraph bID={bID} />{/* Use for show Graph */}
                    </Grid>
                </Grid>
            </JumboCardQuick>
        );
    };

export default WelcomeSummary;
