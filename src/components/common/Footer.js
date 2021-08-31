import {
  ComputerOutlined,
  Facebook,
  Instagram,
  LocationOnOutlined,
  MailOutlined,
  PhoneAndroidOutlined,
  PhoneIphoneOutlined,
} from "@material-ui/icons";
import React from "react";
import "./index.less";
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import LanguageSelect from "../common/LanguageSelect";
import { useTranslation } from "react-i18next";
import CustomTooltip from "./CustomTooltip";
const Footer = (props) => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="content">
        <div className="col col1">
          <Typography variant="h3" className="title-light">
            {t("fText")}
          </Typography>
          <List>
            <ListItem key={1}>
              <ListItemText className="font-sm">{t("fText2")}</ListItemText>
            </ListItem>
          </List>
          <LanguageSelect />
        </div>
        <div className="col col2">
          <Typography variant="h3" className="title-light">
            {t("services")}:
          </Typography>
          <List>
            <ListItem key={2}>
              <ListItemIcon>
                <ComputerOutlined />
              </ListItemIcon>
              <ListItemText primary={`Web ${t("development")}`} />
            </ListItem>
            <ListItem key={3}>
              <ListItemIcon>
                <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary={`Android ${t("development")}`} />
            </ListItem>
            <ListItem key={1}>
              <ListItemIcon>
                <PhoneIphoneOutlined />
              </ListItemIcon>
              <ListItemText primary={`IOS ${t("development")}`} />
            </ListItem>
          </List>
        </div>
        <div className="col col3">
          <List component="nav" aria-label="main mailbox folders">
            <Typography variant="h3" className="title-light">
              {t("contacts")}:
            </Typography>
            {/*  <ListItem key={1}>
              <ListItemIcon>
                <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="+91 " />
            </ListItem> */}
            <ListItem key={2}>
              <ListItemIcon>
                <MailOutlined />
              </ListItemIcon>
              <ListItemText primary="techdev588@gmail.com" />
            </ListItem>
            <ListItem key={3}>
              <ListItemIcon>
                <LocationOnOutlined />
              </ListItemIcon>
              <ListItemText primary="Patna-801505,Bihar" />
            </ListItem>
          </List>
        </div>
      </div>
      <div className="social-icons">
        <div>
          <CustomTooltip title="Follow us on Instagram!">
            <Instagram />
          </CustomTooltip>
        </div>
        <div>
          <CustomTooltip title="Follow us on Facebook!">
            <Facebook />
          </CustomTooltip>
        </div>
      </div>
      <div class="link-list" key={2}>
        <Link>terms & conditions</Link>
        <Link>privacy policies</Link>
        <Typography variant="secondary">
        Copyright &copy; 2021 DapperFolks.in.
        </Typography>
      </div>
    </div>
  );
};
export default Footer;
