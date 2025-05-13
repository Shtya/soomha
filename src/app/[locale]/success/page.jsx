// "use client"
// import { useTranslations } from 'next-intl'
// import Image from 'next/image'
// import {Link} from '@/navigation';

// import React, { useEffect, useState } from 'react'

// const page = () => {
// 	const t = useTranslations("success")
// 	const [final , setfinal ] = useState()
// 	useEffect(()=> {
// 		setfinal(localStorage.getItem("final-price"))
// 	} ,[])

// 	console.log(final)

//   return (
// 	<div className='success !bg-white !opacity-100 z-[100] '>
// 		<div className="container">
// 			<Image className='max-md:w-[160px] max-md:h-[160px] ' src="/send.png" alt='' width={290} height={290} />
// 			<div className="h2 max-md:!text-[20px] text-center max-w-[600px] !mb-[20px] mx-auto "> {t("h1")} </div>
// 			<div className="p max-md:!text-[16px] text-center !text-[18px] !mb-[50px] "> {t("p")} </div>

// 			<div className="text-center text-lg font-semibold text-gray-700"> {t("final_price")} {final} </div>

// 			<Link href="/" className='btn1' > {t("btn")} </Link>
// 		</div>
// 	</div>
//   )
// }

// export default page

'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const t = useTranslations('success');
    const t_alt = useTranslations('my-orders');
    const [final, setFinal] = useState();

    useEffect(() => {
		const storedPrice = localStorage.getItem("final-price")
		if (storedPrice) {
			const formattedPrice = new Intl.NumberFormat('en-US', {
				style: 'decimal',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}).format(parseFloat(storedPrice));

			setFinal(formattedPrice)
		}
        else{
            setFinal(0)
        }
	}, [])

    return (
        <div className='success !bg-white !opacity-100 z-[100] '>
            <div className='container'>
                <Image className='max-md:w-[160px] max-md:h-[160px]' src='/send.png' alt='' width={230} height={230} />
                <div className='h2 max-md:!text-[20px] text-center max-w-[600px] !mb-[10px] mx-auto'>{t('h1')}</div>
                {final == 0 && <div className='p max-md:!text-[16px] text-center !text-[18px] !mb-[10px] '>{t('p')}</div>}

                {/* Final Price with Skeleton Loader */}
                <div className='text-center p text-lg font-semibold text-gray-700 !mb-[30px] mt-[10px] '>
                    {final == null 
					? <span className='animate-pulse bg-gray-300 rounded-md w-[400px] h-6 inline-block'></span>
					: (
						final == 0
						? ""
						: <div className='flex text-center gap-[10px] ' >
                            {t('final_price')}
                            <span className='text-[#3e64f4] font-[600] '>{final} {t_alt("currency")} </span>
                        </div>
						)
                    }
                </div>

                <Link href='/' className='btn1'>
                    {t('btn')}
                </Link>
            </div>
        </div>
    );
};

export default Page;
