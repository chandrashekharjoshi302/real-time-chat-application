import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Box textAlign="center" mt={8}>
        <Typography variant="h2">Welcome to the Chat App</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          style={{ marginTop: "20px" }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
