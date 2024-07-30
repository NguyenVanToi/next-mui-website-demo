import { Button, CircularProgress } from '@mui/material';
import { styled } from "@mui/material/styles";

import { useAppDispatch } from '@/libs/hooks';
import { fetchUsers } from '@/store/slices/userSlice';

type UpdatedButtonProps = {
  loading: boolean;
}

const UpdatedButton = ({ loading }: UpdatedButtonProps) => {
  const dispatch = useAppDispatch();

  // FUNCTION
  const fetchData = () => {
    dispatch(fetchUsers());
  }

  return (
    <ButtonStyled
      variant="contained"
      color="primary"
      onClick={fetchData}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : 'Update Data'}
    </ButtonStyled>
  )
}

const ButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export default UpdatedButton