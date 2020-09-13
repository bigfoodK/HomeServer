import React, { useState } from 'react';
import { Card, Grid, Button, CardContent, Typography } from '@material-ui/core'
import IdentitySelector from './IdentitySelector';
import { State } from '../../redux/state';
import { useSelector } from 'react-redux';
import { Account } from '../../../common/permission/types';

export default function Accounts() {
  const [identitySelectorOpen, setIdentitySelectorOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined);
  const accounts = useSelector((state: State) => state.admin.accounts);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Button
            fullWidth
            variant='outlined'
            onClick={() => setIdentitySelectorOpen(true)}
          >Select Account</Button>
        </CardContent>
        {selectedAccount
          ? <CardContent>
            <Typography>{`Nickname: ${selectedAccount.nickname}`}</Typography>
            <Typography>{`Id: ${selectedAccount.id}`}</Typography>
            <Typography>{`Internal id: ${selectedAccount.internalId}`}</Typography>
            <Typography>{`Created at: ${new Date(selectedAccount.createdAt)}`}</Typography>
          </CardContent>
          : undefined
        }
        
        <IdentitySelector
          multiSelect={false}
          open={identitySelectorOpen}
          onClose={() => setIdentitySelectorOpen(false)}
          onSelect={selection => setSelectedAccount(accounts.find(account => account.internalId === selection[0]))}
          identities={accounts.toArray()}
        />
      </Card>
    </Grid>
  );
}
