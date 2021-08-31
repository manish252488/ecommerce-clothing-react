import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import CustomizedSpinner from "../CustomizedSpinner";
import "./index.less";
export default function Loader() {
  const loading = useSelector(({ MessageBar }) => MessageBar.loading);
  if (loading) {
    return (
      <div className="loading-screen">
        <Grid container direction="column" justify="space-between" xs={12}>
          <Grid item xs={12}>
            <CustomizedSpinner />{" "}
            <Typography
              style={{ display: "inline-block" }}
              variant="h4"
              color="secondary"
            >
              Loading{" "}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  } else return <></>;
}
