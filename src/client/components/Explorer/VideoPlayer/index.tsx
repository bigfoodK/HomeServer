import React from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import CustomReactPlayer from './CustomReactPlayer';

type VideoPlayerProps = RouteComponentProps<{
  path?: string;
}>;

export default function VideoPlayer(props: VideoPlayerProps) {
  const {
    path,
  } = props.match.params;

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <CustomReactPlayer
            url={`/explorerRoot/${path}`}
            width="100%"
            height="100%"
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
