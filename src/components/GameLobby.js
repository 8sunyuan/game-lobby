import React, { useState, useContext, useEffect } from "react";
import Player from "./Player/Player";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import { auth } from "../firebase";
import { Context as _authProviderContext } from "../contexts/AuthProvider/AuthProvider";
import axios from "axios";
import { Button, Grid, Typography } from "@material-ui/core";
import "fontsource-roboto";

// class GameLobby extends Component {
const GameLobby = () => {
  // List of available colors
  const [colors, setColors] = useState([
    "#0000FF",
    "#7FFFD4",
    "#8B0000",
    "#FF8C00",
  ]);
  // List of selected colors of the players
  const [playerColors, setPlayerColors] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  
  const [profilePics, setProfilePics] = useState({
    1: "",
    2: "",
    3: "",
    4: ""
  });

  const [error, setError] = useState("");

  const authProviderContext = useContext(_authProviderContext);

  const updateSelectVal = (e, player) => {
    let newColors = [...colors];
    let prevColor = playerColors[player];
    if (prevColor !== "") {
      newColors.push(prevColor);
    }
    newColors = newColors.filter((color) => color !== e.target.value);

    setColors(newColors);

    // Set new color for player
    let newPlayerColors = { ...playerColors };
    newPlayerColors[player] = e.target.value;
    setPlayerColors(newPlayerColors);

    // PASS IN USER CONTEXT TOKEN
    const user = authProviderContext.state.user;
    user.getIdToken().then((token) => {
      console.log(token);
      axios
        .patch(
          `https://us-central1-game-lobby-firebase.cloudfunctions.net/changeColor`,
          {
            playerNum: player,
            color: e.target.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          console.log("Updated players color");
        })
        .catch((err) => {
          console.log("Could not update players color", err);
        });
    });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Before signout", authProviderContext.context);
    try {
      setError("");
      await auth.signOut();
      console.log(error);
    } catch {
      setError("Failed to Sign Out");
      console.log(error);
    }
    console.log("After Signout", authProviderContext.context);
  };

  useEffect(() => {
    // cloud function for player colors
    axios
      .get(
        `https://us-central1-game-lobby-firebase.cloudfunctions.net/playerColors`
      )
      .then((res) => {
        let playerColors = {};
        let newColors = [...colors];
        res.data.forEach((player) => {
          newColors = newColors.filter((color) => color !== player.color);
          playerColors[player.playerNum] = player.color;
          profilePics[player.playerNum] = player.profileImageUrl;
        });
        setColors(newColors);
        setPlayerColors(playerColors);
      });
  }, []);

  return (
    <React.Fragment>
      <Typography style={title} variant="h2">
        Game Lobby
      </Typography>

      <ProfilePicture />
      <Button onClick={handleLogout}>LogOut</Button>

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
              profilePic={profilePics[1]}
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
              profilePic={profilePics[2]}
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
              profilePic={profilePics[3]}
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
              profilePic={profilePics[4]}
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
};

const colorLabels = {
  "#0000FF": "Blue",
  "#7FFFD4": "Green",
  "#8B0000": "Red",
  "#FF8C00": "Orange",
};

const section = {
  height: "85vh",
  paddingTop: 5,
};

const title = {
  textAlign: "center",
  marginTop: "50px",
};

export default GameLobby;
