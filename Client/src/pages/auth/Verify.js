import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSpinner } from '../../contexts/SpinnerContext';

import TeslaLogo from '../../Assets/images/TeslaLogo';
import Footer from '../../components/Footer';
import ButtonAuth from '../../components/auth/ButtonAuth';

import './verify.scss';


function Verify() {
    const { setLoadingAuth } = useSpinner();
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingAuth(true);
        // Giả lập fetch data
        setTimeout(() => {
            setLoadingAuth(false);
        }, 3000);
    }, [setLoadingAuth]);

    return (
        <div className="verify-container">
            <div className="navLogo" onClick={() => navigate('/groupproject')}>
                <TeslaLogo />
            </div>
            <div className="verify">
                <h1 className="verify-title">XÁC MINH</h1>
                <div className='verify-content'>Vui lòng kiểm tra email của bạn để hoàn tất thủ tục đăng ký
                    <div>Cảm ơn!</div>
                </div>
                
                <ButtonAuth
                    title={'BACK LOGIN'}
                    className={'btn'}
                    onClick={() => {
                        navigate('/groupproject/login');
                    }}
                />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Verify;
