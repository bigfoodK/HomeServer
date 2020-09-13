import React from 'react';
import { Grid, Card, CardContent, ButtonGroup, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function AdminNavigator() {

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <ButtonGroup fullWidth>
            <Button component={Link} to="/admin/account">
              Account
          </Button>
            <Button component={Link} to="/admin/group">
              Group
          </Button>
            <Button component={Link} to="/admin/permission">
              Permission
          </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
