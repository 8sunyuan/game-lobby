import React from 'react';
import { Paper, Typography, Select, MenuItem, InputLabel } from '@material-ui/core';

// class Player extends Component {
const Player = (props) => {

    const marginTitle = {
        padding: "20px 20px 0 20px"
    }
    
    const margin= {
        padding: "20px"
    }

    return (
        <Paper style={{background: props.colorVal }}>
            <div style={marginTitle}>
                <Typography variant="h5">{props.name}</Typography>    
            </div>

            <div style={margin}>
                <InputLabel>Color</InputLabel>
                <Select 
                value={props.colorVal}
                onChange={(e) => props.onColorChange(e, props.player)}
                >
                    <MenuItem value="">Select a color</MenuItem>
                    <MenuItem value={props.colorVal}>{props.colorLabels[props.colorVal]}</MenuItem>
                    {props.colors.map((color) =>
                        <MenuItem value={color}>{props.colorLabels[color]}</MenuItem>
                    )}
                </Select>
            </div>
        </Paper>
    );
}

export default Player;