import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../Utils/axios';
import failed from '../../Assets/img/failedTransaction.svg'
import success from '../../Assets/img/successfulTransaction.svg'

const Payment = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    useEffect(() => {
        const trxref = new URLSearchParams(location.search).get('trxref');
        console.log(trxref);
        
        // Payment verification
        const verifyPayment = async() => {
            try {
                const response = await Axios.get(`/payment/verify?trxref=${trxref}`);
                console.log(response)

                if (response?.status === 200 && response?.statusText === 'OK' && response?.data?.success === true) {
                    setIsPaymentSuccessful(true);
                    setVerificationStatus('done');
                    setTimeout(() => {
                        navigation('/');
                    }, 3000);
                } else {
                    setVerificationStatus('failed');
                }
            } catch (error) {
                setIsPaymentSuccessful(true);
                setVerificationStatus('failed');
                console.error(error);
            }
        };

        verifyPayment();
    }, [location.search, navigation]);

    return (
        <>
            {(verificationStatus === 'verifying' && !isPaymentSuccessful) && (
                <div className='d-flex align-items-center justify-content-center' style={{
                    height: "100vh"
                }}>
                    <div>
                        <div className='text-center'>
                            <RotatingLines
                                strokeColor="#00e194"
                                strokeWidth="4"
                                animationDuration="0.75"
                                width="90"
                                visible={true}
                            />
                        </div>
    
                        <p className='text-light'>Verifying payment, please wait</p>
                    </div>
                </div >
            )}

            {/* Success Display */}
            {(verificationStatus === 'done' && isPaymentSuccessful) && (
                <div
                className='d-flex align-items-center justify-content-center'
                style={{
                    background: '#000',
                    minHeight: '100vh'
                }}
            >
                <div>
                    <p className='header-logo mb-0 text-center w-100 loader-logo d-flex align-items-center justify-content-center'>
                    <div
                        style={{
                        width: '80px'
                        }}
                    >
                        <img
                        width='100%'
                        height='100%'
                        src={success}
                        style={{
                            objectFit: 'cover'
                        }}
                        alt='Img'
                        />
                    </div>
                    </p>
                    <span className={'text-white mt-5'}>Payment successful if you are not redirected automatically, <NavLink to={'/'} style={{ color: '#00E194' }}>Click here</NavLink></span>
                </div>
            </div>
            )}

            {/* Failure Display */}
            {(verificationStatus === 'failed' && !isPaymentSuccessful) && (
                <div
                className='d-flex align-items-center justify-content-center'
                style={{
                    background: '#000',
                    minHeight: '100vh'
                }}
            >
                <div>
                    <p className='header-logo mb-0 text-center w-100 loader-logo d-flex align-items-center justify-content-center'>
                    <div
                        style={{
                        width: '80px'
                        }}
                    >
                        <img
                        width='100%'
                        height='100%'
                        src={failed}
                        style={{
                            objectFit: 'cover'
                        }}
                        alt='Img'
                        />
                    </div>
                    </p>
                    <span className={'text-white mt-5'}>Payment unsuccessful please send a report to <a href='mailto:admin@tixrush.com?subject=Failed%20transaction'>admin@tixrush.com</a>, <NavLink to={'/'} style={{ color: '#E10000' }}>Go to home</NavLink></span>
                </div>
            </div>
            )}
        </>
    )
}

export default Payment
