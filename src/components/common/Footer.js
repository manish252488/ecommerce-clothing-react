import {
  Facebook,
  Instagram,
} from "@material-ui/icons";
import React from "react";
import "./index.less";
import {
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import CustomTooltip from "./CustomTooltip";
const Footer = (props) => {
  return (
    <div className="footer">
      <Grid container>
      <Grid item xs={4}></Grid>
        <Grid item xs={4}>
      <div className="link-list">
        <img src="assets/images/logo-light.svg" className="icon" alt="check"/>
      </div>
      <div className="link-list">
      <CustomTooltip title="Follow us on Instagram!"><>
        <Instagram  /><Link href="https://www.instagram.com/dapper.folks">@dapper.folks</Link>
      </>
      </CustomTooltip>
      &nbsp;&nbsp;&nbsp;
      <CustomTooltip title="Follow us on Facebook!"><>
        <Facebook /><Link href="https://www.facebook.com/dapperfolks">@dapper.folks</Link>
      </>
      </CustomTooltip>
      </div>
      <div className="link-list" key={2}>
        <Link href="/terms-and-conditions">terms & conditions</Link>
        <Link href="/privacy-policy">privacy policies</Link>
        
        <Typography variant="inherit">
          Copyright &copy; 2021 dapperfolks.in
        </Typography>
        
      </div>
      </Grid>
          <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
};
export default Footer;
