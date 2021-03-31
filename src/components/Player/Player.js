import React from 'react';
import { Paper, Typography, Select, MenuItem, InputLabel } from '@material-ui/core';
import styles from "./Player.module.css";
import defaultPic from "./default.png";

// class Player extends Component {
const Player = (props) => {

    const onError = (e) => {
      e.target.onerror = null; 
      e.target.src="./profile.png";
    }

    console.log(props.profilePic)

    return (
        <Paper style={{background: props.colorVal }}>
            <div className={styles.title}>
                <img src={props.profilePic ? props.profilePic : defaultPic} className={styles.profile}/>
                <Typography variant="h5">{props.name}</Typography>    
            </div>

            <div className={styles.margin}>
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