import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { CommentsProvider } from './hooks/useComments';
import { MarkerFromFirebaseProvider } from './hooks/useMarkerFromFirebase';
import { MarkerFromKakaoProvider } from './hooks/useMarkerFromKakao';
import './index.css';
import store from './redux/config/configStore';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MarkerFromFirebaseProvider>
    <MarkerFromKakaoProvider>
      <CommentsProvider>
        <Provider store={store}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </Provider>
      </CommentsProvider>
    </MarkerFromKakaoProvider>
  </MarkerFromFirebaseProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
