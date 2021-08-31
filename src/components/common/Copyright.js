import { Link, Typography } from "@material-ui/core";
import React from 'react';
export default function Copyright({color="secondary"}) {
  return (
    <Typography variant="body2" style={{fontSize:10}} color={color} align="center">
      {'Copyright © '}
      <Link color={color} href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}