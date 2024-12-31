import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import userData from '../data/userData.json'; 

export default function UserDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch the user details based on the id
  useEffect(() => {
    const foundUser = userData.find((user) => user.id === parseInt(id));
    setUser(foundUser);
  }, [id]);

  // Handle back to table view
  const handleBackToTable = () => {
    // Navigate back to the table page
    navigate('/'); 
  };

  return (
    <Container>
      {user ? (
        <>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1">
            <strong>ID:</strong> {user.id}
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            <strong>Description:</strong> {user.description}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackToTable}
            style={{ marginTop: '20px' }}
          >
            Back to Table
          </Button>
        </>
      ) : (
        <Typography variant="body1">Loading user details...</Typography>
      )}
    </Container>
  );
}
