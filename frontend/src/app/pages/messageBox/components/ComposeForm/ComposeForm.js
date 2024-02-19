import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import { mailServices } from "../../../../../app/services/mail-services";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";

// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Div from "@jumbo/shared/Div";
import { CKEditor } from "ckeditor4-react";
import {

  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,

} from "@mui/material";
import { maxWidth, width } from "@mui/system";




const ComposeForm = ({ mailItem, onSave }) => {
  const Swal = useSwalWrapper();
  const [to, setTo] = React.useState();
  const [subject, setSubject] = React.useState();
  const [message, setMessage] = React.useState(
    mailItem ? mailItem?.message : ""
  );

  const addMailMutation = useMutation(mailServices.addMail, {
    onSuccess: () => {
      onSave();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mail has been sent successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  const onSendMessage = () => {
    addMailMutation.mutate({ to, subject, message });
  };

  const [elected, setElected] = useState();
  console.log("Show Elected Data", elected);

  return (

    
    <Div
      sx={{

        display: 'flex',

        flexDirection: 'column',

        m: 'auto',

        width: 'fit-content',

      }}
    >
      <Box
        fullWidth
        maxWidth={"1200px"}

        component={"form"}
        // sx={{

        //   "& > .MuiFormControl-root": {
        //     marginBottom: 2,
        //     display: "flex", mb: 3.5 


        //   },
        // }}
      xl={{
          display: 'flex',
          flexDirection: 'column',
          
          p: theme => theme.spacing(3),

          width: "500%"
        }}

      //............................

      // style={{ height: "300px", width: "300px"}}

      >
        <TextField
          fullWidth
          size={"small"}
          type={"email"}
          placeholder={"Tittle"}
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <TextField
          fullWidth
          size={"small"}
          placeholder={"Subject"}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <CKEditor
          fullWidth
          multiline
          rows={3}
          maxRows={4}
          placeholder={"Message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}

          config={{
            contentsCss: [`${process.env.PUBLIC_URL}/fonts/noir-pro/styles.css`,
            `${process.env.PUBLIC_URL}/vendors/ck-editor/style.css`],
          }}
        />
        <TextField
          fullWidth
          select
          id="megSendId"
          name="megSend"
          placeholder={"Send Message"}
          label="Send Message"
          onChange={(e) => setElected(e.target.value || null)}
          value={elected || ""}
        >


          <MenuItem value={1}>Individual</MenuItem>
          <MenuItem value={2}>Company</MenuItem>
          <MenuItem value={3}>Branch</MenuItem>
          <MenuItem value={4}>Designation</MenuItem>
          <MenuItem value={5}>All</MenuItem>

        </TextField>
        <br />
        <br />
        <Button variant={"contained"} onClick={onSendMessage}>
          Send
        </Button>
      </Box>
    </Div>
  );
};
/* Todo mailItem, onSave prop define */
export default ComposeForm;
