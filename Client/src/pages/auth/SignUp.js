import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TeslaLogo from '../../Assets/images/TeslaLogo';
import Footer from '../../components/Footer';
import InputAuth from '../../components/auth/InputAuth';
import ButtonAuth from '../../components/auth/ButtonAuth';
import { emailRegex, usernameRegex } from '../../helpers';
import { useSpinner } from '../../contexts/SpinnerContext';
import { signUp } from '../../apis/user';

import './SignUp.scss';
import { toast } from 'react-toastify';

function SignUp() {
    const { setLoadingAuth } = useSpinner();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);

    useEffect(() => {
        setLoadingAuth(true);
        // Giả lập fetch data
        setTimeout(() => {
            setLoadingAuth(false);
        }, 3000);
    }, [setLoadingAuth]);


    const validateStep1 = () => {
        const newErrors = {};

        if (form.firstName.trim() === '') {
            newErrors.firstName = 'First name is required';
        }
        if (form.lastName.trim() === '') {
            newErrors.lastName = 'Last name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!emailRegex.test(form.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (form.username.trim() === '') {
            newErrors.username = 'Username is required';
        } else if (!usernameRegex.test(form.username)) {
            newErrors.username = 'Username cannot contain special characters';
        }
        if (form.password.length < 6) {
            newErrors.password = 'Password must be more than 6 characters';
        }
        if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep2()) {
            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
            };
            const res = await signUp(payload);

            if (res.metadata) {
                console.log(res.metadata);
                toast.success('Register success!');
                navigate('/groupproject/verify');
            } else {
                toast.error('Error!');
                console.log(res.message);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <div className="navLogo" onClick={() => navigate('/groupproject')}>
                <TeslaLogo />
            </div>
            <div className="sign-up-form">
                <div className='text-[#5c5e62] text-[13px]'>Bước {step}/2</div>
                <h1 className="title-form">TẠO TÀI KHOẢN</h1>
                {step === 1 && (
                    <form>
                        <InputAuth
                            title={'HỌ'}
                            type={'text'}
                            placeholder={'Nhập họ'}
                            className={'input-form'}
                            value={form.firstName}
                            onChange={(e) =>
                                setForm({ ...form, firstName: e.target.value })
                            }
                        />
                        {errors.firstName && (
                            <div className="error">{errors.firstName}</div>
                        )}
                        <InputAuth
                            title={'TÊN'}
                            type={'text'}
                            placeholder={'Nhập tên'}
                            className={'input-form'}
                            value={form.lastName}
                            onChange={(e) =>
                                setForm({ ...form, lastName: e.target.value })
                            }
                        />
                        {errors.lastName && (
                            <div className="error">{errors.lastName}</div>
                        )}
                        <ButtonAuth
                            title={'TIẾP THEO'}
                            type={'button'}
                            className={'btn-sign-up'}
                            onClick={handleNextStep}
                        />
                        <div className="link">HOẶC</div>
                        <ButtonAuth
                            title={'TRỜ VỀ ĐĂNG NHẬP'}
                            className={'btn-sign-up'}
                            onClick={() => {
                                navigate('/groupproject/login');
                            }}
                        />
                    </form>
                )}
                {step === 2 && (
                    <form>
                        <div style={{ display: 'flex' }}>
                            <label>EMAIL</label>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#a2a3a5"
                                stroke="#a2a3a5"
                                width="24px"
                                height="24px"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <title></title>{' '}
                                    <g id="Complete">
                                        {' '}
                                        <g id="info-circle">
                                            {' '}
                                            <g>
                                                {' '}
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    data-name="--Circle"
                                                    fill="none"
                                                    id="_--Circle"
                                                    r="10"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                ></circle>{' '}
                                                <line
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    x1="12"
                                                    x2="12"
                                                    y1="12"
                                                    y2="16"
                                                ></line>{' '}
                                                <line
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    x1="12"
                                                    x2="12"
                                                    y1="8"
                                                    y2="8"
                                                ></line>{' '}
                                            </g>{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        </div>
                        <input
                            className="input-form"
                            value={form.email}
                            type="email"
                            placeholder=""
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        {errors.email && (
                            <div className="error">{errors.email}</div>
                        )}
                        <InputAuth
                            title={'TÊN ĐĂNG NHẬP'}
                            type={'text'}
                            placeholder={'Nhập tên đăng nhập'}
                            className={'input-form'}
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                        />
                        {errors.username && (
                            <div className="error">{errors.username}</div>
                        )}
                        <InputAuth
                            title={'MẬT KHẨU'}
                            type={'password'}
                            placeholder={'Nhập mật khẩu'}
                            className={'input-form'}
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                        {errors.password && (
                            <div className="error">{errors.password}</div>
                        )}
                        <InputAuth
                            title={'NHẬP LẠI MẬT KHẨU'}
                            type={'password'}
                            placeholder={'Nhập lại mật khẩu'}
                            className={'input-form'}
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                        {errors.confirmPassword && (
                            <div className="error">
                                {errors.confirmPassword}
                            </div>
                        )}
                        <ButtonAuth
                            title={'XÁC NHẬN'}
                            type={'submit'}
                            className={'btn-sign-up'}
                            onClick={handleSubmit}
                        />
                    </form>
                )}
                {step === 2 && (
                    <>
                        <div className="link">HOẶC</div>
                        <ButtonAuth
                            title={'TRỜ VỀ ĐĂNG NHẬP'}
                            className={'btn-sign-up'}
                            onClick={() => {
                                navigate('/groupproject/login');
                            }}
                        />
                    </>
                )}
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default SignUp;
