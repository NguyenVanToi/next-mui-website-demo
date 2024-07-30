import { Container } from '@mui/material';
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

import Header from "./Header";


type LayoutProps = {
  children: ReactNode;
  title?: string
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title
}) => {

  return (
    <Root>
      {
        title && (
          <Header title="Users list"/>
        )
      }
      <Main maxWidth="md">
        {children}
      </Main>
  </Root>
  );
};


const Main = styled(Container)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));



export default Layout;
