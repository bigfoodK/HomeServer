import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, CardContent, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, ButtonGroup, List, ListItem, ListItemAvatar, Avatar, ListItemText, CardActions } from '@material-ui/core'
import IdentitySelector from './IdentitySelector';
import { State } from '../../redux/state';
import { useSelector } from 'react-redux';
import { Group, Account } from '../../../common/permission/types';
import { getAccountsInGroup, removeAccountFromGroup, addAccountToGroup, createGroup, getGroups } from '../../restAPI/admin/account';
import { useSnackbar } from 'notistack';
import { Person } from '@material-ui/icons';
import { dispatch } from '../../redux/store';
import Actions from '../../redux/actions';

export default function Groups() {
  const [groupNameDialogOpen, setGroupNameDialogOpen] = useState(false);
  const [groupIdentitySelectorOpen, setGroupIdentitySelectorOpen] = useState(false);
  const [removeAccountIdentitySelectorOpen, setRemoveAccountIdentitySelectorOpen] = useState(false);
  const [addAccountIdentitySelectorOpen, setAddAccountIdentitySelectorOpen] = useState(false);

  const [groupNameInput, setGroupNameInput] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);
  const [accountsInGroup, setAccountsInGroup] = useState<Account[]>([]);
  const [accountsOutGroup, setAccountsOutGroup] = useState<Account[]>([]);
  const groups = useSelector((state: State) => state.admin.groups);
  const accounts = useSelector((state: State) => state.admin.accounts);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!selectedGroup) {
      return;
    }
    getAccountsInGroup(selectedGroup.internalId)
      .then(responseMessage => {
        if (!responseMessage.isSuccessful) {
          return;
        }
        setAccountsInGroup(accounts.toArray().filter(account =>
          responseMessage.data.accountInternalIds.includes(account.internalId)
        ));
        setAccountsOutGroup(accounts.toArray().filter(account =>
          !responseMessage.data.accountInternalIds.includes(account.internalId)
        ));
      })
  }, [groupIdentitySelectorOpen, removeAccountIdentitySelectorOpen, addAccountIdentitySelectorOpen])

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <ButtonGroup fullWidth>
            <Button
              onClick={() => setGroupNameDialogOpen(true)}
            >Create Group</Button>
            <Button
              onClick={() => setGroupIdentitySelectorOpen(true)}
            >Select Group</Button>
          </ButtonGroup>
        </CardContent>
        {selectedGroup
          ? <CardContent>
            <Typography>{`Nickname: ${selectedGroup.name}`}</Typography>
            <Typography>{`Internal id: ${selectedGroup.internalId}`}</Typography>
            <Typography>{`Created at: ${new Date(selectedGroup.createdAt)}`}</Typography>
          </CardContent>
          : undefined
        }
        {selectedGroup
          ? <CardContent>
            <ButtonGroup fullWidth>
              <Button
                color='secondary'
                onClick={() => setRemoveAccountIdentitySelectorOpen(true)}
              >Remove Account</Button>
              <Button
                variant="contained"
                color='primary'
                onClick={() => setAddAccountIdentitySelectorOpen(true)}
              >Add Account</Button>
            </ButtonGroup>
            <List>
              {accountsInGroup.map(account => <ListItem
                key={account.internalId}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={account.nickname} secondary={account.internalId} />
              </ListItem>)}
            </List>
          </CardContent>
          : undefined
        }
        <Dialog
          open={groupNameDialogOpen}
          onClose={() => setGroupNameDialogOpen(false)}
        >
          <DialogTitle>Enter Group Name</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              type="text"
              variant="filled"
              placeholder="Name"
              label="Name"
              value={groupNameInput}
              onChange={(event) => setGroupNameInput(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => createGroup(groupNameInput)
              .then(responseMessage => {
                responseMessage.isSuccessful
                  ? enqueueSnackbar(`Group ${groupNameInput} created`, { variant: 'success' })
                  : enqueueSnackbar(`Could not create group ${groupNameInput}`, { variant: 'error' })
                setGroupNameDialogOpen(false);
                getGroups()
                  .then(responseMessage =>
                    responseMessage.isSuccessful ? dispatch(Actions.setGroups(responseMessage.data.groups)) : undefined
                  );
              })} color="primary" variant="contained">Create</Button>
            <Button onClick={() => setGroupNameDialogOpen(false)} color="default">Cancel</Button>
          </DialogActions>
        </Dialog>
        <IdentitySelector
          multiSelect={false}
          open={groupIdentitySelectorOpen}
          onClose={() => setGroupIdentitySelectorOpen(false)}
          onSelect={selection => setSelectedGroup(groups.find(group => group.internalId === selection[0]))}
          identities={groups.toArray()}
        />
        <IdentitySelector
          multiSelect={true}
          open={removeAccountIdentitySelectorOpen}
          onClose={() => setRemoveAccountIdentitySelectorOpen(false)}
          onSelect={selectedAccountInternalIds => {
            if (!selectedGroup.internalId) {
              return;
            }
            const promises = selectedAccountInternalIds.map(selectedAccountInternalId => {
              return removeAccountFromGroup(selectedAccountInternalId, selectedGroup.internalId)
                .then(responseMessage => responseMessage.isSuccessful
                  ? enqueueSnackbar(`Removed ${selectedAccountInternalId} in ${selectedGroup.internalId}`, { variant: 'success' })
                  : enqueueSnackbar(`Could not remove ${selectedAccountInternalId} in ${selectedGroup.internalId}`, { variant: 'error' }))
            });
            Promise.all(promises)
              .then(() => getGroups()
                .then(responseMessage =>
                  responseMessage.isSuccessful ? dispatch(Actions.setGroups(responseMessage.data.groups)) : undefined
                )
              );
          }}
          identities={accountsInGroup}
        />
        <IdentitySelector
          multiSelect={true}
          open={addAccountIdentitySelectorOpen}
          onClose={() => setAddAccountIdentitySelectorOpen(false)}
          onSelect={selectedAccountInternalIds => {
            if (!selectedGroup.internalId) {
              return;
            }
            const promises = selectedAccountInternalIds.map(selectedAccountInternalId => {
              return addAccountToGroup(selectedAccountInternalId, selectedGroup.internalId)
                .then(responseMessage => responseMessage.isSuccessful
                  ? enqueueSnackbar(`Added ${selectedAccountInternalId} to ${selectedGroup.internalId}`, { variant: 'success' })
                  : enqueueSnackbar(`Could not add ${selectedAccountInternalId} in ${selectedGroup.internalId}`, { variant: 'error' }))
            })
            Promise.all(promises)
              .then(() => getGroups()
                .then(responseMessage =>
                  responseMessage.isSuccessful ? dispatch(Actions.setGroups(responseMessage.data.groups)) : undefined
                )
            )
          }}
          identities={accountsOutGroup}
        />
      </Card>
    </Grid>
  );
}
