"use client"

import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { useAppDispatch } from '@/libs/hooks';
import { authLogout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  title: string
}

const Header = ({title}: HeaderProps) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  // FUNCTION
  const handleLogout = () => {
    dispatch(authLogout());

    router.push('/login');
  }

  return (
    <AppBar position="relative">
      <Toolbar>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
        <Button variant="text" onClick={() => handleLogout()}>
          <LogoutIcon/>
        </Button>
      </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;