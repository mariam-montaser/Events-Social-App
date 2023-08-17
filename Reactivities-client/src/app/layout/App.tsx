import React, { useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';


import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Homepage from '../../features/home/Homepage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import Loading from './Loading';
import ModalContainer from '../common/modals/ModalContainer';


function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])


  if(!commonStore.appLoaded) return <Loading content='Loading app...' />


  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      { location.pathname === '/' ? <Homepage /> : (
        <>
          <Navbar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
      
    </>
  );
}

export default observer(App);
