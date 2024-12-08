import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const UserTable = ({ users, onEdit, onDelete, onAssignRole }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.status}</TableCell>
          <TableCell>
            <Button onClick={() => onEdit(user)}>Edit</Button>
            <Button onClick={() => onDelete(user.id)}>Delete</Button>
            <Button onClick={() => onAssignRole(user.id)}>Assign Role</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default UserTable;
