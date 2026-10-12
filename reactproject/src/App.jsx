import './App.css';

import { useRef } from 'react';

import Home from './assets/Home';
import Menu from './assets/Menu';
import ToDos from './assets/ToDos';
import LogIn from './assets/LogIn';
import Account from './assets/Account';
import CreateUser from './assets/CreateUser';

import Layout from './assets/layout/Layout';
import NotFound from './assets/NotFound';

import UserProvider from './assets/providers/UserProvider';
import AccountDeletedProvider from './assets/providers/AccountDeletedProvider';
import MenuProvider from './assets/providers/MenuProvider';

import {Routes, Route} from 'react-router';



export default function App() {

  const dialogRef = useRef()


  return (
    <>
    <UserProvider>
      <AccountDeletedProvider>
        <MenuProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="to-dos" element={<ToDos />} />
              <Route path="log-in" element={<LogIn />} />
              <Route path="account" element={<Account />} />
              <Route path="create-user" element={<CreateUser />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </MenuProvider>
      </AccountDeletedProvider>
    </UserProvider>
    </>
  )
}

