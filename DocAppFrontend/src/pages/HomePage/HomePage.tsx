import { NavbarNested } from '@/components/NavbarNested/NavbarNested';
import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  useEffect(()=>{
    const route = () => {
      const key = localStorage.getItem('user-authentication-token');
      return key ? true : false;
    }
    if (!route()) {
      navigate('/login-signup');
    }
  },[navigate])

  return (
    <AppShell
      header={{ height: 40 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header >
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text >DOC APP</Text>
        </Group>
      </AppShell.Header >
      <AppShell.Navbar >
        <NavbarNested />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}