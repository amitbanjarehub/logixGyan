import React from "react";
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import { ASSET_IMAGES } from "../../utils/constants/paths";

const Logo = ({ mini, mode, sx }) => {
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link href={"/dashboard"}>
        {!mini ? (
          <img
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/logixhunt.png`
                : `${ASSET_IMAGES}/logo-white.png`
            }
            alt="Jumbo React"
            style={{height:"100px", width: "120px"}}
          />
          // <h4>Logix Gyan</h4>
        ) : (
          <img
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/logo-short.png`
                : `${ASSET_IMAGES}/logo-short-white.png`
            }
            alt="Jumbo React"
          />
          // <h4>Logix Gyan</h4>
        )}
      </Link>
    </Div>
  );
};

Logo.defaultProps = {
  mode: "light",
};

export default Logo;
