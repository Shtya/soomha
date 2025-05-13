'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSignup } from '@/utils/useSignup';
import { Link, useRouter } from '@/navigation';
import { Axios } from '@/config/axios';
import { notification } from '@/utils/notification';

export default function page({ expires = 5 }) {
    const t = useTranslations();
    const [counter, setCounter] = useState(false);
    const [messageShown, setMessageShown] = useState(false); // Add this state
    const router = useRouter()

    
    useEffect(() => {
        // Extract the id and token from the URL
        const path = window.location.pathname;
        const verifyPath = path.split('/email/verify/')[1]; // Get everything after '/email/verify'
        const parts = verifyPath ? verifyPath.split('/') : [];
        const id = parts[0];
        const token = parts[1];

        // Request to verify the email
        if (id && token) {
            Axios.get(`/email/verify/${id}/${token}`)
                .then(response => {
                    setCounter(true);

                    // Show the message only once
                    if (!messageShown) {
                        setMessageShown(true); // Set message as shown
                        // setTimeout(() => {
                        //     notification(t("verification.success"), "success");
                        // }, 1000);
                    }
                })
                .catch(error => {});
        } else {
            if (!messageShown) {
                setMessageShown(true); // Set message as shown
                notification(t('verification.error'), 'error');
            }
        }
    }, [messageShown, t]); // Add messageShown to dependency array

    const [, , , , , , , , , loadingResend, resend] = useSignup();

    return (
        <div className='absolute inset-0 z-[1000] bg-white flex flex-col items-center justify-center h-screen'>
            <div className='absolute inset-0 z-[1000] bg-white flex flex-col items-center justify-center h-screen'>
                <div className='absolute inset-0 z-[-1] h-full w-full'>
                    <Image className='h-full w-full object-cover opacity-40 ' src='/assets/bg-success.jpg' alt='' width={1400} height={700} />
                    <div className='absolute bottom-0 left-0 z-[1] w-full h-full bg-white bg-opacity-80 ' />
                </div>

                <Image className='mx-auto mb-[20px] ' src='/assets/2.png' alt='' width={200} height={150} />
                <h1 className='text-[30px] font-[700] mb-[10px] '> {t('emailVerificationTitle')} </h1>
                <p className='mb-8 text-[22px] font-[400] w-[500px] mx-auto text-center  '> {t('messageVerfied')} </p>
                <button onClick={() => router.push('/sign-in')} className=' rounded-[30px] h-[45px] w-[200px] bg-[#3e64f4] text-white px-6 py-2  hover:bg-[#3e64f4] hover:bg-opacity-80  transition duration-300'>
                    {' '}
                    {t('loginButton')}{' '}
                </button>
            </div>
            {/* <div className='absolute inset-0 z-[-1] h-full w-full'>
                <Image className='h-full w-full object-cover opacity-40 ' src="/assets/bg-success.jpg" alt='' width={1400} height={700} />
                <div className='absolute bottom-0 left-0 z-[1] w-full h-full bg-white bg-opacity-80 ' />
            </div>

            <div className=" container text-center">
                <Image className='mx-auto mb-[40px]' src="/assets/checked.png" alt='' width={150} height={100} />
                <h1 className="text-[30px] font-bold text-gray-800"> {t("emailVerificationTitle")} </h1>
                <p className="text-[18px] mt-4 text-gray-800"> {t("emailVerificationMessage")} </p>
                <p className="text-[16px] mt-2 text-gray-700"> {t("emailVerificationSpamNote")} </p>

                <Link href="/sign-in" className={`mb-[15px] block mt-[30px] w-[250px] mx-auto px-[60px] py-[10px] font-[700] rounded-[30px] text-[#3e64f4] border-[#3e64f4] border-[2px] hover:bg-[#3e64f4] hover:text-white duration-300 `} >  {t("loginButton")}  </Link>
                <p onClick={resend} className="cursor-pointer hover:opacity-70 duration-300 mt-[10px] text-[14px] underline font-semibold text-[#3e64f4] ">  {t("resendEmailButton")} </p>

            </div> */}
        </div>
    );
}
