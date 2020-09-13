import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ListItem, ListItemAvatar, Avatar, ListItemText, List } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Identity } from '../../../common/permission/types';
import { Person, People } from '@material-ui/icons';

type IdentitySelectorProps = {
  open: boolean;
  multiSelect?: boolean;
  identities: Identity[];
  onClose: () => void;
  onSelect?: (identityInternalIds: string[]) => void;
};

export default function IdentitySelector(props: IdentitySelectorProps) {
  const {
    open,
    multiSelect,
    identities,
    onClose,
    onSelect,
  } = props;

  const [selectedIdentityInternalIds, setSelectedIdentityInternalIds] = useState<string[]>([]);

  useEffect(() => setSelectedIdentityInternalIds([]), [open]);

  const identityListItems = identities.map(identity =>
    <ListItem
      button
      key={identity.internalId}
      selected={selectedIdentityInternalIds.includes(identity.internalId)}
      onClick={() => {
        const selectedInternalIdIndex = selectedIdentityInternalIds.findIndex(internalId => internalId === identity.internalId);
        if (selectedInternalIdIndex < 0) {
          multiSelect
            ? setSelectedIdentityInternalIds([...selectedIdentityInternalIds, identity.internalId])
            : setSelectedIdentityInternalIds([identity.internalId]);
          return;
        }
        setSelectedIdentityInternalIds([
          ...selectedIdentityInternalIds.slice(0, selectedInternalIdIndex),
          ...selectedIdentityInternalIds.slice(selectedInternalIdIndex + 1),
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
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Select identity</DialogTitle>
        <DialogContent>
          <List>
            {identityListItems}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button onClick={() => {
            if (0 < selectedIdentityInternalIds.length) {
              onSelect(selectedIdentityInternalIds);
            }
            onClose();
          }} color="primary" autoFocus>
            Select
          </Button>
        </DialogActions>
    </Dialog>
  )
}
