import React, { useState, useEffect } from 'react';
import { Container, Button, Typography } from '@mui/material';
import UserTable from './components/UserManagement/UserTable';
import RoleTable from './components/RoleManagement/RoleTable';
import PermissionsMatrix from './components/PermissionsMatrix/PermissionsMatrix';
import UserDialog from './components/UserManagement/UserDialog';
import RoleDialog from './components/RoleManagement/RoleDialog';

function App() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data.users);
  };

  const fetchRoles = async () => {
    const response = await fetch('/api/roles');
    const data = await response.json();
    setRoles(data.roles);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsUserDialogOpen(true);
  };

  const handleAddRole = () => {
    setSelectedRole(null);
    setIsRoleDialogOpen(true);
  };

  const handleSaveUser = async (user) => {
    if (user.id) {
      await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
    } else {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
    }
    fetchUsers();
    setIsUserDialogOpen(false);
  };

  const handleSaveRole = async (role) => {
    if (role.id) {
      await fetch(`/api/roles/${role.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role),
      });
    } else {
      await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role),
      });
    }
    fetchRoles();
    setIsRoleDialogOpen(false);
  };

  const handleDeleteUser = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  };

  const handleDeleteRole = async (id) => {
    await fetch(`/api/roles/${id}`, {
      method: 'DELETE',
    });
    fetchRoles();
  };

  const handlePermissionToggle = (roleId, permission) => {
    const role = roles.find((r) => r.id === roleId);
    const newPermissions = role.permissions.includes(permission)
      ? role.permissions.filter((perm) => perm !== permission)
      : [...role.permissions, permission];
    handleSaveRole({ ...role, permissions: newPermissions });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        RBAC Admin Portal
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <UserTable users={users} onEdit={setSelectedUser} onDelete={handleDeleteUser} />
      
      <Button variant="contained" color="primary" onClick={handleAddRole}>
        Add Role
      </Button>
      <RoleTable roles={roles} onEdit={setSelectedRole} onDelete={handleDeleteRole} />
      <PermissionsMatrix role={selectedRole} onPermissionToggle={handlePermissionToggle} />

      <UserDialog open={isUserDialogOpen} onClose={() => setIsUserDialogOpen(false)} onSave={handleSaveUser} user={selectedUser} />
      <RoleDialog open={isRoleDialogOpen} onClose={() => setIsRoleDialogOpen(false)} onSave={handleSaveRole} role={selectedRole} />
    </Container>
  );
}

export default App;
