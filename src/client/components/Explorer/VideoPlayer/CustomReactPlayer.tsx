import React, { useState, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { Typography, Grid, Box, IconButton, Slider, Container, Fade, ListItem, List, Dialog, DialogContent } from '@material-ui/core';
import { PlayArrow, Fullscreen, Settings, VolumeDown, Pause, FullscreenExit } from '@material-ui/icons';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

type CustomReactPlayerProps = ReactPlayerProps;

type Progress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

function getFormmatedSecondString(inputSeconds: number) {
  const minutes = Math.floor(inputSeconds / 60);
  const seconds = Math.floor(inputSeconds - (minutes * 60));

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function CustomReactPlayer(props: CustomReactPlayerProps) {
  const [playing, setPlaying] = useState(props.playing);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState<Progress>({
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);
  const [mouseActiveTimeout, setMouseActiveTimeout] = useState(0);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const fullscreenHandle = useFullScreenHandle();
  const reactPlayer = useRef<ReactPlayer>();

  const {
    width,
    height,
  } = props;
  return (
    <FullScreen
      handle={fullscreenHandle}
      onChange={state => setIsFullscreen(state)}
    >
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        style={{
          height: '100%',
        }}
      >
        <Grid item xs>
          <Box
            onMouseMove={() => {
              setMouseActive(true);
              clearTimeout(mouseActiveTimeout);
              setMouseActiveTimeout(setTimeout(() => {
                setMouseActive(false);
              }, 3000) as unknown as number);
            }}
            style={{
              position: 'relative',
              width: width,
              height: height,
              maxHeight: '100vh',
              maxWidth: '100vw',
            }}>
            <ReactPlayer
              ref={reactPlayer}
              {...props}
              volume={volume}
              playing={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onDuration={duration => setDuration(duration)}
              onProgress={state => setProgress(state)}
              progressInterval={40}
              playbackRate={playbackRate}
            />
            <Box style={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            }}>
              <Container
                maxWidth={false}
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                }}
                component={Fade}
                in={mouseActive}
              >
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item >
                    <IconButton
                      size="small"
                      onClick={() => setPlaying(prev => !prev)}
                    >{playing ? <Pause /> : <PlayArrow />}</IconButton>
                  </Grid>
                  <Grid item xs>
                    <Typography>{`${getFormmatedSecondString(progress.playedSeconds)}/${getFormmatedSecondString(duration)}`}</Typography>
                  </Grid>
                  <Grid item>
                    <VolumeDown />
                  </Grid>
                  <Grid item xs={1}>
                    <Slider
                      min={0}
                      max={1}
                      value={volume}
                      step={0.01}
                      onChange={(_, value) => setVolume(typeof value === 'number' ? value : value[0])}
                    />
                  </Grid>
                  <Grid item >
                    <IconButton
                      size="small"
                      onClick={() => isFullscreen ? fullscreenHandle.exit() : fullscreenHandle.enter()}
                    >{isFullscreen ? <FullscreenExit /> : <Fullscreen />}</IconButton>
                  </Grid>
                  <Grid item >
                    <IconButton
                      size="small"
                      onClick={() => setSettingsOpen(true)}
                    ><Settings /></IconButton>
                    <Dialog
                      open={settingsOpen}
                      onClose={() => setSettingsOpen(false)}
                    >
                      <DialogContent>
                        <List>
                          <ListItem divider>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography>Playback Speed</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Slider
                                  min={0.25}
                                  max={2}
                                  value={playbackRate}
                                  step={0.25}
                                  valueLabelDisplay="auto"
                                  onChange={(_, value) => setPlaybackRate(typeof value === 'number' ? value : value[0])}
                                />
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </DialogContent>
                    </Dialog>
                  </Grid>
                  <Grid item xs={12}>
                    <Slider
                      min={0}
                      max={1}
                      value={progress.played}
                      step={0.000001}
                      onChange={(_, value) => reactPlayer.current.seekTo(typeof value === 'number' ? value : value[0])}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FullScreen>
  );
}
