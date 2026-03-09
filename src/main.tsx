import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import { store } from 'app/providers/store/index.ts';

import './index.css';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
