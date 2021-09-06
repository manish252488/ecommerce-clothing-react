import { Button, CircularProgress, Link, TextField } from '@material-ui/core';
import React, { useState } from 'react';

export default function PhoneAndEmail({ phone, email, errors, onChange = () => {}, setAction = () => {}, buttonText }) {
    const [loading, setLoading] = useState();
    const [type, setType] = useState(1);
    const CheckIndianNumber = (b) => {
        var a = /^\d{10}$/;
        if (a.test(b)) {
          //valid
          // send otp
        }
        else {
         //not valid
          
        }
      };
      const verify = () => {

      }
    return <>
       {type === 2 && <TextField
            variant="outlined"
            color="primary"
            defaultValue={email}
            label="Email"
            fullWidth
            onChange={(ev) => onChange("email", ev.target.value)}
            helperText={errors.email}
            size="small"
        />}
        {type === 1 && <TextField
            variant="outlined"
            color="primary"
            defaultValue={phone}
            label="Mobile No."
            onBlur={(ev) => CheckIndianNumber(ev.target.value)}
            fullWidth
            onChange={(ev) => onChange("phoneNo", ev.target.value)}
            helperText={errors.phoneNo}
            size="small"
        />}
        <div className="or-divider"> or use&nbsp;
        <Link style={{cursor: "pointer"}} color="primary"  variant="body2" onClick={() => setType(type === 1 ? 2 : 1)}>
           {type === 1 ? "EMAIL ID" : "MOBILE NO"}
          </Link>
        
        </div>
        
        
         <Button
          startIcon={
            loading && <CircularProgress size={20} color="secondary" />
          }
          variant="contained"
          color="primary"
          onClick={verify}
          fullWidth
          size="small"
        >
          {buttonText}
        </Button>
    </>
}