import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        textAlign: 'center',
    },
    imgBox: {
        maxWidth: "50%",
        maxHeight: "40%",
        margin: "10px"
    },
    img: {
        height: "inherit",
        maxWidth: "inherit",
    },
    input: {
        display: "none"
    }
}));

function CameraCap() {

    const classes = useStyles();
    const [source, setSource] = useState("");

    const handleCapture = (target) => {

        if (target.files) {

            if (target.files.length !== 0) {

                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
                
            }
        }
    };

    return (

        <div className={classes.root}>

            <Grid container>
                <Grid item xs={12}>
                    
                    {

                        source &&
                        <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
                            <img src={source} alt={"snap"} className={classes.img}></img>

                        </Box>
                    }

                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        capture="environment"
                        onChange={(e) => handleCapture(e.target)}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCameraRoundedIcon style={{ height: "200px", width: "100px" }} fontSize="large" color="primary" />

                        </IconButton>
                    </label>
                    
                </Grid>
            </Grid>

        </div>
    );
}
export default CameraCap;