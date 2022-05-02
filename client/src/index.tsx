import React from 'react';
import { render } from 'react-dom';
import App from '@/app/App';
import 'antd/dist/antd.min.css';
import './styles/global.css';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
