"use client"

import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';

import { authLogin } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import Layout from '../layout/Layout';


const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessages, setValidationMessages] = useState<Record<string, string> | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmailError(null);
    if (!validateEmail(email)) {
      setEmailError('Email is invalid!');
      return;
    }

    dispatch(authLogin({email, password}));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  return (
    <Layout>
      <StyledContainer maxWidth="xs">
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {validationMessages && validationMessages.email && <Typography color="error">{validationMessages.email}</Typography>}
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </StyledButton>
      </StyledForm>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}
          Tony Nguyen Website {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </StyledContainer>
    </Layout>
  );
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));


const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default LoginPage;
