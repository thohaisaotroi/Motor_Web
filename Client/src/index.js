import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Route from './routes/Route';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { SpinnerProvider } from './contexts/SpinnerContext';
import { SearchProvider } from './contexts/SearchContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SpinnerProvider>
                <SearchProvider>
                    <Route />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                        theme="light"
                    />
                </SearchProvider>
            </SpinnerProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
