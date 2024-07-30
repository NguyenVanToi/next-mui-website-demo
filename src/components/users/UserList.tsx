"use client"

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from "@mui/material/styles";
import { useEffect, useState } from 'react';

import { HTTPResponseCode } from '@/interfaces/http.interface';
import { IUser } from '@/interfaces/user.interface';
import { useAppSelector } from '@/libs/hooks';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import UpdatedButton from '../UpdateButton';
import Layout from '../layout/Layout';

const UserList = () => {
   const { loading, error, users } = useAppSelector((state: RootState) => state.user);

  const [data, setData] = useState<IUser[]>([]);
  const router = useRouter();

  // EFFECT
  useEffect(() => {
    if (users && users.length > 0) {
      setData(users);
    }
  }, [users]);

  useEffect(() => {
    if (error && error.statusCode === HTTPResponseCode.UNAUTHORIZED) {
      router.push('/login');
    }
  }, [error]);

  return (
    <Layout title="User list">
      <UpdatedButton loading={loading}/>
      {data.length > 0 && (
        <TableContainerStyled>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                {/* Add more TableCells here based on your data structure */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  {/* Add more TableCells here based on your data structure */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerStyled>
      )}
    </Layout>
  );
}

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  color: theme.palette.text.primary
}));

export default UserList;