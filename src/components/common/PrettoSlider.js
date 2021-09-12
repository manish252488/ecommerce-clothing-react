import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';




const PrettoSlider = withStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
}))(Slider);


export default function AppSlider({ value, ...props }) {


    return (
        <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="range-slider"
            defaultValue={value}
            inputMode="numeric"
            min={0}
            max={10000}
            {...props}
        />

    );
}
