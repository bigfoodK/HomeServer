import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ListItem, ListItemAvatar, Avatar, ListItemText, List } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Permission } from '../../../common/permission/types';
import { AssignmentInd } from '@material-ui/icons';

type PermissionSelectorProps = {
  open: boolean;
  multiSelect?: boolean;
  permissions: Permission[];
  onClose: () => void;
  onSelect?: (permissionPaths: string[]) => void;
};

export default function PermissionSelector(props: PermissionSelectorProps) {
  const {
    open,
    multiSelect,
    permissions,
    onClose,
    onSelect,
  } = props;

  const [selectedPermissionPaths, setSelectedPermissionPaths] = useState<string[]>([]);

  useEffect(() => setSelectedPermissionPaths([]), [open]);

  const permissionListItems = permissions.map(permission =>
    <ListItem
      button
      key={permission.path}
      selected={selectedPermissionPaths.includes(permission.path)}
      onClick={() => {
        const selectedPathIndex = selectedPermissionPaths.findIndex(permissionPath => permissionPath === permission.path);
        if (selectedPathIndex < 0) {
          multiSelect
            ? setSelectedPermissionPaths([...selectedPermissionPaths, permission.path])
            : setSelectedPermissionPaths([permission.path]);
          return;
        }
        setSelectedPermissionPaths([
          ...selectedPermissionPaths.slice(0, selectedPathIndex),
          ...selectedPermissionPaths.slice(selectedPathIndex + 1),
        ]);
      }}
    >
      <ListItemAvatar>
        <Avatar>
          <AssignmentInd />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={permission.path} secondary={`${permission.rules.length} rules`} />
    </ListItem>
  );

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Select identity</DialogTitle>
        <DialogContent>
          <List>
            {permissionListItems}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button onClick={() => {
            if (0 < selectedPermissionPaths.length) {
              onSelect(selectedPermissionPaths);
            }
            onClose();
          }} color="primary" autoFocus>
            Select
          </Button>
        </DialogActions>
    </Dialog>
  )
}
