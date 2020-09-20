import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { DirectoryEntry, DirectoryEntryType } from '../../../common/explorer/types';
import getDirectoryEntries from '../../restAPI/explorer/getDirectoryEntries';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Folder, InsertDriveFile, Block, Movie } from '@material-ui/icons';

type BrowserProps = RouteComponentProps<{
  path?: string;
}>;

function getProperLink(direcotryEntry: DirectoryEntry, path: string[]) {
  const pathToEntry = `${[...path, direcotryEntry.name].join('/')}`;
  switch (direcotryEntry.type) {
    case 'directory': {
      return `/explorer/browser/${pathToEntry}`;
    } break;

    case 'video': {      
      return `/explorer/videoPlayer/${pathToEntry}`;
    } break;

    default: {
      return `/explorerRoot/${pathToEntry}`;
    } break;
  }
}

function getIcon(directoryEntryType: DirectoryEntryType) {
  switch (directoryEntryType) {
    case 'directory': {
      return <Folder />;
    } break;

    case 'video': {
      return <Movie />;
    } break;
  
    default: {
      return <InsertDriveFile />;
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
                      component={direcotryEntry.type === 'file' ? undefined : Link}
                      to={link}
                      onClick={() => {
                        if (direcotryEntry.type !== 'file') {
                          return;
                        }
                        const aElement = document.createElement('a')
                        aElement.href = link;
                        aElement.click();
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {getIcon(direcotryEntry.type)}
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
