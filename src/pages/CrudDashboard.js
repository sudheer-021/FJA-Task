import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Container } from '@mui/material';
import DataTable from '../components/DataTable';
import CrudDialog from '../components/CrudDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import userData from '../data/userData.json'; 
import { useNavigate } from 'react-router-dom';

export default function CrudDashboard() {
  const navigate = useNavigate();

  // State to manage data
  const [data, setData] = useState([]);
  const [isCrudDialogOpen, setCrudDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch data
  useEffect(() => {
    setTimeout(() => {
      setData(userData);
    }, 500);
  }, []);

  // Memoized table data for optimized rendering
  const memoizedData = useMemo(() => data, [data]);

  // Add a new user
  const handleAdd = useCallback(() => {
    setCrudDialogOpen(true);
  }, []);

  // Edit a user
  const handleEdit = useCallback((row) => {
    setSelectedRow(row); 
    setCrudDialogOpen(true);
  }, []);

  // Delete a user
  const handleDelete = useCallback((id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    setConfirmDialogOpen(false);
  }, []);

  // Save user data (add or update)
  const handleSave = useCallback((user) => {
    if (user.id) {
      // Edit existing user
      setData((prevData) => prevData.map((item) => (item.id === user.id ? user : item)));
    } else {
      // Add new user with generated ID
      const newId = data.length === 0 ? 1 : Math.max(...data.map((user) => user.id)) + 1; // Generate sequential ID
      const newUser = { ...user, id: newId };
      setData((prevData) => [...prevData, newUser]);
    }
    setCrudDialogOpen(false); 
  }, [data]);

  // Navigate to details page
  const handleViewDetails = useCallback((row) => {
    navigate(`/details/${row.id}`); 
  }, [navigate]);

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        style={{ margin: '20px 0' }}
      >
        Add User
      </Button>
      <DataTable
        data={memoizedData}
        onEdit={handleEdit}
        onDelete={(id) => {
          setSelectedRow({ id });
          setConfirmDialogOpen(true);
        }}
        onViewDetails={handleViewDetails} 
      />
      <CrudDialog
        open={isCrudDialogOpen}
        onClose={() => setCrudDialogOpen(false)}
        onSave={handleSave}
        initialData={selectedRow}
      />
      <ConfirmDialog
        open={isConfirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={() => handleDelete(selectedRow?.id)}
      />
    </Container>
  );
}

