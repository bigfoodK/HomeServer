import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel, Grid, ListItem, ListItemAvatar, Avatar, ListItemText, List, ListSubheader } from '@material-ui/core';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { State } from '../../redux/state';
import { useSelector } from 'react-redux';
import { addPermissionRule, getPermissions } from '../../restAPI/admin/permission';
import { Person, People } from '@material-ui/icons';
import { dispatch } from '../../redux/store';
import Actions from '../../redux/actions';

type PermissionRuleAdderProps = {
  open: boolean;
  onClose: () => void;
};

export default function PermissionRuleAdder(props: PermissionRuleAdderProps) {
  const {
    open,
    onClose,
  } = props;

  const identities = [
    ...useSelector((state: State) => state.admin.accounts).toArray(),
    ...useSelector((state: State) => state.admin.groups).toArray(),
  ];

  const [permissionPathInput, setPermissionPathInput] = useState('');
  const [allowAnonymous, setAllowAnonymous] = useState(false);
  const [allowedIdentityInternalIds, setAllowedIdentiyInternalIds] = useState<string[]>([]);
  const [deniedIdentityInternalIds, setDeniedIdentityInternalIds] = useState<string[]>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const allowIdentityListItems = identities.map(identity =>
    <ListItem
      button
      key={identity.internalId}
      selected={allowedIdentityInternalIds.includes(identity.internalId)}
      onClick={() => {
        const selectedInternalIdIndex = allowedIdentityInternalIds.findIndex(internalId => internalId === identity.internalId);
        if (selectedInternalIdIndex < 0) {
          setAllowedIdentiyInternalIds([...allowedIdentityInternalIds, identity.internalId])
          return;
        }
        setAllowedIdentiyInternalIds([
          ...allowedIdentityInternalIds.slice(0, selectedInternalIdIndex),
          ...allowedIdentityInternalIds.slice(selectedInternalIdIndex + 1),
        ]);
      }}
    >
      <ListItemAvatar>
        <Avatar>
          {identity.type === 'account' ? <Person /> : <People />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={identity.type === 'account' ? identity.nickname : identity.name} secondary={identity.internalId} />
    </ListItem>
  );

  const denyIdentityListItems = identities.map(identity =>
    <ListItem
      button
      key={identity.internalId}
      selected={deniedIdentityInternalIds.includes(identity.internalId)}
      onClick={() => {
        const selectedInternalIdIndex = deniedIdentityInternalIds.findIndex(internalId => internalId === identity.internalId);
        if (selectedInternalIdIndex < 0) {
          setDeniedIdentityInternalIds([...deniedIdentityInternalIds, identity.internalId])
          return;
        }
        setDeniedIdentityInternalIds([
          ...deniedIdentityInternalIds.slice(0, selectedInternalIdIndex),
          ...deniedIdentityInternalIds.slice(selectedInternalIdIndex + 1),
        ]);
      }}
    >
      <ListItemAvatar>
        <Avatar>
          {identity.type === 'account' ? <Person /> : <People />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={identity.type === 'account' ? identity.nickname : identity.name} secondary={identity.internalId} />
    </ListItem>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Enter Group Name</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          type="text"
          variant="filled"
          placeholder="Path"
          label="Path"
          value={permissionPathInput}
          onChange={(event) => setPermissionPathInput(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox
            checked={allowAnonymous}
            onChange={(_, checked) => setAllowAnonymous(checked)}
          />}
          label="Allow annonymous"
          labelPlacement="end"
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <List subheader={<ListSubheader>Allowed Identities</ListSubheader>}>
              {allowIdentityListItems}
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <List subheader={<ListSubheader>Denied Identities</ListSubheader>}>
              {denyIdentityListItems}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          const allowedIdentities = identities.filter(identity => allowedIdentityInternalIds.includes(identity.internalId))
          const deniedIdentities = identities.filter(identity => deniedIdentityInternalIds.includes(identity.internalId))
          addPermissionRule(
            permissionPathInput,
            allowAnonymous,
            allowedIdentities,
            deniedIdentities,
          ).then(responseMessage => {
            responseMessage.isSuccessful
              ? enqueueSnackbar(`Permission rule added to ${permissionPathInput}`, { variant: 'success' })
              : enqueueSnackbar(`Could not added Permission rule to ${permissionPathInput}`, { variant: 'error' })
              onClose();
              getPermissions()
                .then(responseMessage =>
                  responseMessage.isSuccessful ? dispatch(Actions.setPermissions(responseMessage.data.permissions)) : undefined
                )
          })
        }} color="primary" variant="contained">Add</Button>
        <Button onClick={onClose} color="default">Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
