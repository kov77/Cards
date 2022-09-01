import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}`;
}

export function RangeSlider() {
    const [value, setValue] = React.useState<number[]>([5, 40]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        console.log(value)
    };

    return (
        <Box sx={{ width: "70%"}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                size={"small"}
            />
        </Box>
    );
}
