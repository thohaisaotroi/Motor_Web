// MotorSpinner.js
import React from 'react';
import './motorSpinner.scss';

const MotorSpinner = () => {
    return (
        <div className="custom-spinner">
            <img
                src="https://www.bmw-motorcycles.vn/etc.clientlibs/mnm/mnmnsc/clientlibs/global/resources/images/Loader-S1000RR.gif"
                alt="Loading..."
                className="spinner-gif"
            />
        </div>
    );
};

export default MotorSpinner;
