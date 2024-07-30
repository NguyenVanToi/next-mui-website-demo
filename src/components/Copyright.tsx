import Typography from '@mui/material/Typography';

type CopyrightProps = {
  sx: Record<string, any>
};

const Copyright = (props: CopyrightProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Tony Nguyen website '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;