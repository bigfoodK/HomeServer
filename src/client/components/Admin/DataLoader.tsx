import React, { useState } from 'react';
import { Card, Grid, CircularProgress, Button, CardContent, ButtonGroup } from '@material-ui/core'
import { getAccounts, getGroups } from '../../restAPI/admin/account';
import { dispatch } from '../../redux/store';
import Actions from '../../redux/actions';
import { getPermissions } from '../../restAPI/admin/permission';

export default function DataLoader() {
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(false);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <ButtonGroup fullWidth>
            <Button
              disabled={loadingAccounts}
              onClick={async () => {
                setLoadingAccounts(true);
                const responseMessage = await getAccounts();
                if (responseMessage.isSuccessful) {
                  dispatch(Actions.setAccounts(responseMessage.data.accounts));
                }
                setLoadingAccounts(false);
              }}
            >{loadingAccounts ? <CircularProgress /> : 'Load Accounts'}</Button>
            <Button
              disabled={loadingGroups}
              onClick={async () => {
                setLoadingGroups(true);
                const responseMessage = await getGroups();
                if (responseMessage.isSuccessful) {
                  dispatch(Actions.setGroups(responseMessage.data.groups));
                }
                setLoadingGroups(false);
              }}
            >{loadingGroups ? <CircularProgress /> : 'Load Groups'}</Button>
            <Button
              disabled={loadingPermissions}
              onClick={async () => {
                setLoadingPermissions(true);
                const responseMessage = await getPermissions();
                if (responseMessage.isSuccessful) {
                  dispatch(Actions.setPermissions(responseMessage.data.permissions));
                }
                setLoadingPermissions(false);
              }}
            >{loadingPermissions ? <CircularProgress /> : 'Load Permissions'}</Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
