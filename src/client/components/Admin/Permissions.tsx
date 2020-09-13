import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, CardContent, Typography, ButtonGroup, List } from '@material-ui/core'
import { State } from '../../redux/state';
import { useSelector } from 'react-redux';
import { PermissionRule } from '../../../common/permission/types';
import PermissionSelector from './PermissionSelector';
import PermissionRuleAdder from './PermissionRuleAdder';
import PermissionRuleListItem from './PermissionRuleListItem';

export default function Permissions() {
  const [permissionSelectorOpen, setPermissionSelectorOpen] = useState(false);
  const [permissionRuleAdderOpen, setPermissionRuleAdderOpen] = useState(false);
  const [permissionRules, setPermissionRules] = useState<PermissionRule[]>([]);

  const [selectedPermissionPath, setSelectedPermissionPath] = useState<string>('');
  const permissions = useSelector((state: State) => state.admin.permissions);

  useEffect(() => {
    if (!selectedPermissionPath) {
      return;
    }
    const selectedPermission = permissions.find(permission => permission.path === selectedPermissionPath);
    setPermissionRules(selectedPermission.rules);
  }, [selectedPermissionPath, permissions])

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <ButtonGroup fullWidth>
            <Button
              onClick={() => setPermissionSelectorOpen(true)}
            >Select Permission</Button>
            <Button
              onClick={() => setPermissionRuleAdderOpen(true)}
            >Add permission rule</Button>
          </ButtonGroup>
        </CardContent>
        {selectedPermissionPath
          ? <CardContent>
            <Typography>{`Path: ${selectedPermissionPath}`}</Typography>
            <List>
              {permissionRules.map(permissionRule => <PermissionRuleListItem
                permissionRule={permissionRule}
                path={selectedPermissionPath}
                key={permissionRule.internalId}
              />)}
            </List>
          </CardContent>
          : undefined
        }
        <PermissionRuleAdder open={permissionRuleAdderOpen} onClose={() => setPermissionRuleAdderOpen(false)}/>
        <PermissionSelector
          multiSelect={false}
          open={permissionSelectorOpen}
          onClose={() => setPermissionSelectorOpen(false)}
          onSelect={selection => setSelectedPermissionPath(selection[0])}
          permissions={permissions.toArray()}
        />
      </Card>
    </Grid>
  );
}
