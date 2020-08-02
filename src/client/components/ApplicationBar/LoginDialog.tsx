import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import login from '../../restAPI/account/login';
import { useSnackbar } from 'notistack';
import RegisterDialog from './RegisterDialog';

export default function LoginDialog(props: {
  open: boolean,
  handleClose: () => void,
}) {
  const {
    open,
    handleClose,
  } = props;

  const [registerOpen, setRegisterOpen] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          type="text"
          variant="filled"
          placeholder="ID"
          label="ID"
          onChange={(event) => setIdInput(event.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          variant="filled"
          placeholder="Password"
          label="Password"
          onChange={(event) => setPasswordInput(event.target.value)}
        />
        <RegisterDialog open={registerOpen} handleClose={() => setRegisterOpen(false)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setRegisterOpen(true)} color="primary">
          Register
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={async () => {
          const response = await login({
            id: idInput,
            password: passwordInput,
          });
          if (response.isSuccessful === false) {
            enqueueSnackbar(response.errorMessage, {
              variant: 'error',
            })
            return;
          }

          enqueueSnackbar('Logged in', {
            variant: 'success',
          })
          handleClose();
        }}
        color="primary"
        autoFocus
        variant="contained"
      >Login</Button>
      </DialogActions>
    </Dialog>
  );
}
