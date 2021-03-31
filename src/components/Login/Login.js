import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Context as _authProviderContext } from "../../contexts/AuthProvider/AuthProvider";
import { auth } from "../../firebase";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styles from "./Login.module.css";

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const authProviderContext = useContext(_authProviderContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CurrUser", authProviderContext.currentUser);
    try {
      setError("");
      setLoading(true);
      console.log("CurrUser", authProviderContext.currentUser);
      const cred = await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      // authProviderContext.setCurrentUser(cred.user);
      console.log("CurrUser", authProviderContext.currentUser);
      history.push("/lobby");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <Container className={styles.container}>
      <Box className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Typography variant="h4">Log In</Typography>
          {error && <Alert severity="error">Incorrect Log in</Alert>}
          <div className={styles.fields}>
            <TextField
              className={styles.email}
              label="Email"
              inputRef={emailRef}
              type="email"
            />
            <TextField
              className={styles.password}
              label="Password"
              inputRef={passwordRef}
              type="password"
            />
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
