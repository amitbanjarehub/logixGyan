import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import useAuth from "@jumbo/hooks/useJumboAuth";
import Div from "@jumbo/shared/Div";
import { CardContent, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { userServices } from "app/services/userservices";
import { useQuery } from "react-query";

const Photos = () => {
  const { authUser } = useAuth();

  if (!authUser)
    return null;

  return (

    <JumboCardQuick title={"Bank Details"} style={{ marginTop: "30px", width: "1020px" }}>
      <CardContent >
        <FormControl className="MuiFormControl-fluid">
          <Div >

            <Box

            >
              <TextField

                id="bankName"
                label="Bank Name"
                variant="outlined"
                defaultValue={authUser?.bankDetails?.BankName}
                InputProps={{ readOnly: true }}
                style={{ marginRight: "20px" }}
              />

              <TextField

                id="accountNumber"
                label="Account Number"
                variant="outlined"
                defaultValue={authUser?.bankDetails?.AccountNumber}
                InputProps={{ readOnly: true }}
                style={{ marginRight: "20px" }}
              />

              <TextField

                id="ifsccode"
                label="IFSC Code"
                variant="outlined"
                defaultValue={authUser?.bankDetails?.ifscCode}
                InputProps={{ readOnly: true }}
                style={{ marginRight: "20px" }}
              />
              <TextField required id="upi" label="UPI" variant="outlined" defaultValue={authUser?.bankDetails?.upiId}
                InputProps={{ readOnly: true }} />

            </Box>
          </Div>
        </FormControl>
      </CardContent>
    </JumboCardQuick>
  );
};

export default Photos;
