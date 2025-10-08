import React, { createContext, useState, useContext } from 'react';
import { HashLoader } from 'react-spinners';
import MotorSpinner from '../components/customSpinner/MotorSpinner';

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);

    return (
        <SpinnerContext.Provider
            value={{ loading, setLoading, loadingAuth, setLoadingAuth }}
        >
            {children}
            {loading && (
                // <div className="spinner-overlay">
                //     <HashLoader />
                // </div>
                <MotorSpinner />
            )}
            {loadingAuth && (
                <div className="spinner-overlay-auth">
                    <HashLoader color="#ffffff" />
                </div>
            )}
        </SpinnerContext.Provider>
    );
};

export const useSpinner = () => useContext(SpinnerContext);
