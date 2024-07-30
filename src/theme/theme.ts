'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(102, 179, 255)'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  spacing: 10
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(102, 179, 255)'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  spacing: 10
});
