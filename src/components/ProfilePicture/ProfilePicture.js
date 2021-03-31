import React, { useContext, useState } from "react";
import { storage } from "../../firebase";
import axios from "axios";
import { Context as _authProviderContext } from "../../contexts/AuthProvider/AuthProvider";
import pic from "./test.png";

// class Player extends Component {
const ProfilePicture = (props) => {
  const authProviderContext = useContext(_authProviderContext);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (authProviderContext.state.user) {
      const user = authProviderContext.state.user;
      const uid = authProviderContext.state.user.uid;
      const pathRef = storage.ref(`Users/${uid}/profile`);

      pathRef
        .put(image)
        .then(async () => {
          try {
            const url = await pathRef.getDownloadURL();
            const token = await user.getIdToken();
            await axios.patch(
              `https://us-central1-game-lobby-firebase.cloudfunctions.net/setProfileRef`,
              {
                downloadUrl: url,
                uid: uid,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  };

  console.log(`image ${image}`);

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload Picture</button>
    </div>
  );
};

export default ProfilePicture;
