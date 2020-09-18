import React from 'react';
import { Grid, Card, Breadcrumbs, Typography, Link, IconButton } from '@material-ui/core';
import { Link as ReactRouterLink, RouteComponentProps } from 'react-router-dom';
import { Home, ArrowUpward } from '@material-ui/icons';

type AddressBarProps = RouteComponentProps<{
  path?: string;
  viewer?: string;
}>;

export default function AddressBar(props: AddressBarProps) {
  const {
    path: pathString,
    viewer,
  } = props.match.params;

  const path = pathString?.split('/') || [];
  if (viewer !== 'browser') {
    path.pop();
  }

  return (
    <Grid item xs={12} >
      <Card>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <IconButton size="small" component={ReactRouterLink} to="/explorer/browser">
              <Home />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size="small" component={ReactRouterLink} to={`/explorer/browser/${path.slice(0, path.length - 1).join('/')}`}>
              <ArrowUpward />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Breadcrumbs
              separator="›">
              <Link component={ReactRouterLink} to="/explorer/browser" >
                <Typography>
                  /
              </Typography>
              </Link>
              {path.map((name, index) => {
                const pathString = `/explorer/browser/${path.slice(0, index + 1).join('/')}`;

                return (
                  <Link
                    key={pathString}
                    component={ReactRouterLink}
                    to={pathString}
                  >
                    <Typography>
                      {name}
                    </Typography>
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
