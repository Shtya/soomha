'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSignup } from '@/utils/useSignup';
import { Link } from '@/navigation';

export default function VerifyEmailPage({ expires = 5 }) {
    const t = useTranslations()
    const [,,,,,,,,, loadingResend , resend  ] = useSignup()


    



    return (
        <div className="absolute inset-0 z-[1000] bg-white flex flex-col items-center justify-center h-screen">

            <div className='absolute inset-0 z-[-1] h-full w-full' >
              <Image className='h-full w-full object-cover opacity-40 '  src="/assets/bg-success.jpg" alt='' width={1400} height={700} />
              <div className='absolute bottom-0 left-0 z-[1] w-full h-full bg-white bg-opacity-80 ' />
            </div>

            <div className=" container text-center">
                <Image className='mx-auto mb-[40px] '  src="/assets/checked.png" alt='' width={150} height={100} />
                <h1 className="text-[30px] font-bold text-gray-800"> {t("emailVerificationTitle")} </h1>
                <p className="text-[18px] mt-4 text-gray-800"> {t("emailVerificationMessage")} </p>
                <p className="text-[16px] mt-2 text-gray-700"> {t("emailVerificationSpamNote")} </p>

                <Link href="/sign-in"  className={`mb-[15px] block mt-[30px] w-[250px] mx-auto px-[60px] py-[10px] font-[700] rounded-[30px] text-[#3e64f4] border-[#3e64f4] border-[2px] hover:bg-[#3e64f4] hover:text-white duration-300 `} >  {t("loginButton")}  </Link>
                <p onClick={resend}  className=" cursor-pointer hover:opacity-70 duration-300 mt-[10px] text-[14px] underline font-semibold text-[#3e64f4] ">  {t("resendEmailButton")} </p>

            </div>
        </div>
    );
}
