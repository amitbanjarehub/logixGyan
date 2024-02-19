import React from 'react';
import { Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";

const Error404 = () => {    
    return (
        <Div sx={{
            flex: 1,
            flexWrap: 'wrap',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: theme => theme.spacing(4),
        }}>
            <Div sx={{display: 'inline-flex', mb: 3}}>
                <img src={getAssetPath(`${ASSET_IMAGES}/apps/undraw_page_not_found.svg`, "380x206")} alt="404" width={380}/>
            </Div>
            <Typography align={"center"} component={"h2"} variant={"h1"} color={"text.secondary"} mb={3}>
                Oops, an error has occurred. Page not found!
            </Typography>
            
            <Button variant="contained" href="/">Go to home</Button>
        </Div>
    );
};

export default Error404;
