import {
  Facebook,
  Instagram,
  Twitter,
} from "@material-ui/icons";
import React from "react";
import "./index.less";
import {
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import CustomTooltip from "./CustomTooltip";
import { SocialLinks } from "../../config/constants/constants";
const Footer = (props) => {
  return (
    <div className="footer">
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <div className="link-list">
            <img src="/assets/images/logo-light.svg" className="icon" alt="check" />
          </div>
          <div className="link-list icons">
            <CustomTooltip title="Follow us on Instagram!"><>
              <Instagram /><Link href={SocialLinks.Instagram}>@dapper.folks</Link>
            </>
            </CustomTooltip>
            &nbsp;&nbsp;&nbsp;
            <CustomTooltip title="Follow us on Facebook!"><>
              <Facebook /><Link href={SocialLinks.Facebook}>@dapper.folks</Link>
            </>
            </CustomTooltip>
            &nbsp;&nbsp;&nbsp;
            <CustomTooltip title="Follow us on Twitter!"><>
              <Twitter /><Link href={SocialLinks.twitter}>@DapperFolks</Link>
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
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};
export default Footer;
