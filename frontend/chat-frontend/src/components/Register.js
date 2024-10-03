import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";

const Register = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Add name field
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Extract token from response (if provided)
        setToken(token);
        localStorage.setItem("token", token); // Save token in localStorage
        navigate("/chat"); // Redirect to chat page after successful registration
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed"); // Display error message
      }
    } catch (error) {
      setError("Network error, please try again");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" mt={8}>
        <Typography variant="h4">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}{" "}
        {/* Display error */}
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
