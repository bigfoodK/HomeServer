import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { DirectoryEntry } from '../../../common/explorer/types';
import getDirectoryEntries from '../../restAPI/explorer/getDirectoryEntries';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Folder, InsertDriveFile, Block } from '@material-ui/icons';

type BrowserProps = RouteComponentProps<{
  path?: string;
}>;

function getProperLink(direcotryEntry: DirectoryEntry, path: string[]) {
  const pathToEntry = `${[...path, direcotryEntry.name].join('/')}`;
  switch (direcotryEntry.type) {
    case 'directory': {
      return `/explorer/browser/${pathToEntry}`;
    } break;

    default: {
      return `/explorer/download/${pathToEntry}`;
    } break;
  }
}

export default function Browser(props: BrowserProps) {
  const {
    path: pathString,
  } = props.match.params;

  const path = pathString?.split('/') || [];
  const [directoryEntries, setDirectoryEntries] = useState<DirectoryEntry[]>([]);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    getDirectoryEntries(path.join('/'))
      .then(response => {
        if (response.isSuccessful === false) {
          if (response.errorMessage === 'Forbidden') {
            setForbidden(true);
            setDirectoryEntries([]);
          }
          return;
        }
        setForbidden(false);
        setDirectoryEntries(response.data.directoryEntries);
      })
  }, [pathString]);

  return (
    <Grid item xs={12} >
      <Card>
        <CardContent>
          <List>
            {
              forbidden
                ? <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Block />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Forbidden" />
                </ListItem>
                : directoryEntries.map(direcotryEntry => {
                  const link = getProperLink(direcotryEntry, path);
                  return (
                    <ListItem
                      key={link}
                      button
                      component={Link}
                      to={link}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {direcotryEntry.type === 'directory' ? <Folder /> : <InsertDriveFile />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={direcotryEntry.name} />
                    </ListItem>
                  )
                })
            }
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
}
