import React from 'react';
import { Chat } from '@components/Chat/';
import { Login } from '@components/Login/';
import { observer } from 'mobx-react-lite';
import appStore from '@/store/appStore';
import './styles.css';

const App: React.FC = observer(() => {
  const { isLoggedIn } = appStore;

  return <div className="app">{isLoggedIn ? <Chat /> : <Login />}</div>;
});

export default App;
