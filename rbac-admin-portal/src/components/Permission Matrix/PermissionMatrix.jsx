import React from 'react';
import { Grid, Button } from '@mui/material';

const permissions = ['Read', 'Write', 'Delete'];

const PermissionsMatrix = ({ role, onPermissionToggle }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <h3>Manage Permissions for {role.name}</h3>
    </Grid>
    {permissions.map((perm) => (
      <Grid item xs={4} key={perm}>
        <Button
          variant={role.permissions.includes(perm) ? 'contained' : 'outlined'}
          onClick={() => onPermissionToggle(role.id, perm)}
        >
          {perm}
        </Button>
      </Grid>
    ))}
  </Grid>
);

export default PermissionsMatrix;
