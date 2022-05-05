import React from 'react';
import { Chat } from '@components/Chat/';
import { Login } from '@components/Login/';
import { observer } from 'mobx-react-lite';
import appStore from '@/store/appStore';
import styles from './styles.module.css';

const App: React.FC = observer(() => {
  const { isLoggedIn } = appStore;

  return <div className={styles.app}>{isLoggedIn ? <Chat /> : <Login />}</div>;
});

export default App;
