import React, { useState } from 'react';
import Player from './Player';
import { Grid, Typography } from '@material-ui/core';
import 'fontsource-roboto';

// class GameLobby extends Component {
const GameLobby = () => {
    // List of available colors
    const [colors, setColors ] = useState(["#0000FF", "#7FFFD4", "#8B0000", "#FF8C00"]);
    // List of selected colors of the players
    const [playerColors, setPlayerColors ] = useState({1: "", 2: "", 3: "", 4: "" });

    const updateSelectVal = (e, player) => {
        let prevColor = playerColors[player];
        // Add players previous color back to list of available colors
        if (prevColor !== "") {
            setColors([...colors, prevColor]);
        }

        // Set new color for player
        let newPlayerColors = {...playerColors};
        newPlayerColors[player] = e.target.value;
        setPlayerColors(newPlayerColors);
        
        // Remove the color that player selected from list of available colors
        setColors(colors.filter(color => color !== e.target.value));
    }


    return (
        <React.Fragment>
            <Typography style={title} variant="h2">
                Game Lobby
            </Typography>

            <Grid
            style={section}
            container
            direction="column"
            justify="space-around"
            alignContent="center"
            >

                <Grid
                item 
                container
                direction="row"
                justify="space-evenly"
                spacing={10}
                >
                    <Grid item xs={2}>
                        <Player 
                            name="Player 1"
                            colors={colors}
                            colorLabels={colorLabels}
                            colorVal={playerColors[1]}
                            player={1}
                            onColorChange={updateSelectVal}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Player 
                            name="Player 2"
                            colors={colors}
                            colorLabels={colorLabels}
                            colorVal={playerColors[2]}
                            player={2}
                            onColorChange={updateSelectVal}
                        />
                    </Grid>
                </Grid>

                <Grid
                item
                container
                direction="row"
                justify="space-evenly"
                spacing={10}
                >
                    <Grid item xs={2}>
                        <Player
                            name="Player 3"
                            colors={colors}
                            colorLabels={colorLabels}
                            colorVal={playerColors[3]}
                            player={3}
                            onColorChange={updateSelectVal}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Player
                            name="Player 4"
                            colors={colors}
                            colorLabels={colorLabels}
                            colorVal={playerColors[4]}
                            player={4}
                            onColorChange={updateSelectVal}
                        />
                    </Grid>

                </Grid>

            </Grid>
        </React.Fragment>
    );
}

const colorLabels = {
    "#0000FF": "Blue",
    "#7FFFD4": "Green",
    "#8B0000": "Red",
    "#FF8C00": "Orange"
}

const section = {
    height: "85vh",
    paddingTop: 5,
}

const title = {
    textAlign: 'center',
    marginTop: '50px'
}

export default GameLobby;