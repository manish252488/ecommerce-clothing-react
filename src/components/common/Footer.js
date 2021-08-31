import {
  Facebook,
  ImportContacts,
  Instagram,
} from "@material-ui/icons";
import React from "react";
import "./index.less";
import {
  Link,
  Typography,
} from "@material-ui/core";
import CustomTooltip from "./CustomTooltip";
const Footer = (props) => {
  return (
    <div className="footer">
      <div className="link-list">
        <img src={ImportContacts} className="icon"/>
      </div>
      <div className="link-list">
      <CustomTooltip title="Follow us on Instagram!"><>
        <Instagram color="secondary" /><Link href="https://www.instagram.com/dapper.folks">@dapper.folks</Link>
      </>
      </CustomTooltip>
      &nbsp;&nbsp;&nbsp;
      <CustomTooltip title="Follow us on Facebook!"><>
        <Facebook color="secondary" /><Link href="https://www.facebook.com/dapperfolks">@dapper.folks</Link>
      </>
      </CustomTooltip>
      </div>
      <div className="link-list" key={2}>
        <Link>terms & conditions</Link>
        <Link>privacy policies</Link>
        <Typography variant="secondary">
          Copyright &copy; 2021 dapperfolks.in.
        </Typography>
      </div>
    </div>
  );
};
export default Footer;
