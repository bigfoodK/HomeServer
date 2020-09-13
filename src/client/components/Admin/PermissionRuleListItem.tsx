import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogActions, Button, Collapse, List, ListSubheader, Container, Divider, ListItemAvatar, Avatar } from '@material-ui/core';
import { PermissionRule } from '../../../common/permission/types';
import { Delete, Settings, ExpandMore, ExpandLess, Person, People, Lock, LockOpen } from '@material-ui/icons';
import { removePermissionRule, getPermissions } from '../../restAPI/admin/permission';
import { useSnackbar } from 'notistack';
import { dispatch } from '../../redux/store';
import Actions from '../../redux/actions';

type PermissionRuleListItemProps = {
  permissionRule: PermissionRule;
  path: string;
};

export default function PermissionRuleListItem(props: PermissionRuleListItemProps) {
  const {
    permissionRule,
    path,
  } = props;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Container disableGutters>
      <ListItem
        divider
        button
        onClick={() => setCollapseOpen(open => !open)}
      >
        <ListItemAvatar>
          <Avatar>
            {permissionRule.allowAnonymous ? <LockOpen /> : <Lock />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={permissionRule.internalId} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => setDeleteDialogOpen(true)}
          ><Delete /></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListSubheader>Allowed Identities</ListSubheader>
          {permissionRule.allowedIdentities.map(identity => <ListItem key={`allowed-${identity.internalId}`}>
            <ListItemAvatar>
              <Avatar>
                {identity.type === 'account' ? <Person /> : <People />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={identity.type === 'account' ? identity.nickname : identity.name}
              secondary={identity.internalId}
            />
          </ListItem>)}
          <Divider />
          <ListSubheader>Denied Identities</ListSubheader>
          {permissionRule.deniedIdentities.map(identity => <ListItem key={`denied-${identity.internalId}`}>
            <ListItemAvatar>
              <Avatar>
                {identity.type === 'account' ? <Person /> : <People />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={identity.type === 'account' ? identity.nickname : identity.name}
              secondary={identity.internalId}
            />
          </ListItem>)}
        </List>
      </Collapse>
      <Dialog open={deleteDialogOpen} onClose={setDeleteDialogOpen}>
        <DialogTitle>
          {`Delete ${permissionRule.internalId}`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="default">
            Cancel
          </Button>
          <Button onClick={() => removePermissionRule(path, permissionRule.internalId)
            .then(responseMessage => {
              responseMessage.isSuccessful
                ? enqueueSnackbar(`Deleted Permission rule ${permissionRule.internalId}`, { variant: 'success' })
                : enqueueSnackbar(`Could not deleted Permission rule ${permissionRule.internalId}`, { variant: 'error' })
              setDeleteDialogOpen(false);
              getPermissions()
              .then(responseMessage =>
                responseMessage.isSuccessful ? dispatch(Actions.setPermissions(responseMessage.data.permissions)) : undefined
              )
            })
          } color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
