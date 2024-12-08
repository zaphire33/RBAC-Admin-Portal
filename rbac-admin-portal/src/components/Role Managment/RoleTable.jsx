import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const RoleTable = ({ roles, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Role Name</TableCell>
        <TableCell>Permissions</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {roles.map((role) => (
        <TableRow key={role.id}>
          <TableCell>{role.name}</TableCell>
          <TableCell>{role.permissions.join(', ')}</TableCell>
          <TableCell>
            <Button onClick={() => onEdit(role)}>Edit</Button>
            <Button onClick={() => onDelete(role.id)}>Delete</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default RoleTable;
