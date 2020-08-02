import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import register from '../../restAPI/account/register';

export default function RegisterDialog(props: {
  open: boolean,
  handleClose: () => void,
}) {
  const {
    open,
    handleClose,
  } = props;

  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
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
        <TextField
          fullWidth
          type="password"
          variant="filled"
          placeholder="Password Confirm"
          label="Password Confirm"
          onChange={(event) => setPasswordConfirmInput(event.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          variant="filled"
          placeholder="Nickname"
          label="Nickname"
          onChange={(event) => setNicknameInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={async () => {
          if (passwordInput !== passwordConfirmInput) {
            enqueueSnackbar('Password and password confirm is not matched', {
              variant: 'error',
            })
            return;
          }

          const response = await register({
            id: idInput,
            password: passwordInput,
            nickname: nicknameInput,
          });
          if (response.isSuccessful === false) {
            enqueueSnackbar(response.errorMessage, {
              variant: 'error',
            })
            return;
          }

          enqueueSnackbar('Registered', {
            variant: 'success',
          })
          handleClose();
        }}
        color="primary"
        variant="contained"
      >Register</Button>
      </DialogActions>
    </Dialog>
  );
}
