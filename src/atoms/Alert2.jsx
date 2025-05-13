'use client'
import { GetUser } from '@/utils/GetUser'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {Link} from '@/navigation';

import React, { useEffect, useState } from 'react'

export default function Alert2() {
	const t = (useTranslations()).raw("alert")

	const user = GetUser() ;
	const [show , setShow ] = useState(false)

	useEffect(() => { 
		const get = JSON.parse(localStorage.getItem("soomha-user"))
		if(get) {
			setShow(false) 
		}else 
			setShow(true)
		}, []);

	useEffect(()=> {
		if(show) document.body.style.overflow = "hidden" 
		else document.body.style.overflow = "visible";
		
	} ,[show])

  return (
	<div className={` ${show == false ?"hidden" : "flex"}  fixed  inset-0 z-[100000] bg-[#9d9d9d] bg-opacity-70 w-screen h-screen justify-center items-center`} >
		<div className=' shadow-md p-[40px] rounded-[10px] relative flex min-h-[320px]  max-w-[500px] w-full bg-white items-center justify-between ' >
			
			<div className='flex flex-col h-full items-center gap-[20px]' >
				<svg className='w-[60px] h-[60px]  ' viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.483 22.8284H5.51712C4.74961 22.8615 3.98708 22.6897 3.30784 22.3309C2.62858 21.972 2.05703 21.4389 1.65175 20.7864C1.24647 20.1338 1.02205 19.385 1.00154 18.6171C0.981043 17.8491 1.16519 17.0896 1.53507 16.4163L9.01794 3.41141C9.43277 2.72662 10.0172 2.16041 10.7148 1.76743C11.4123 1.37445 12.1993 1.16797 13 1.16797C13.8006 1.16797 14.5877 1.37445 15.2852 1.76743C15.9828 2.16041 16.5673 2.72662 16.9821 3.41141L24.465 16.4163C24.8348 17.0896 25.019 17.8491 24.9984 18.6171C24.978 19.385 24.7536 20.1338 24.3483 20.7864C23.943 21.4389 23.3713 21.972 22.6921 22.3309C22.0129 22.6897 21.2504 22.8615 20.483 22.8284Z" stroke="#E6AF2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.6523 17.8956C11.6523 17.7177 11.6876 17.5415 11.756 17.3772C11.8245 17.2129 11.9248 17.0638 12.0513 16.9386C12.1776 16.8134 12.3276 16.7144 12.4924 16.6474C12.6574 16.5803 12.8337 16.5467 13.0118 16.5482C13.2743 16.553 13.5296 16.635 13.7457 16.784C13.9618 16.9331 14.1293 17.1426 14.2271 17.3863C14.3248 17.63 14.3485 17.8971 14.2953 18.1542C14.242 18.4112 14.1141 18.6469 13.9276 18.8318C13.7412 19.0166 13.5043 19.1423 13.2467 19.1933C12.9892 19.2444 12.7223 19.2182 12.4796 19.1183C12.2367 19.0184 12.0288 18.8492 11.8816 18.6316C11.7345 18.4143 11.6547 18.1582 11.6523 17.8956ZM12.0854 14.6113L11.917 8.33149C11.901 8.18053 11.9169 8.0279 11.9638 7.88351C12.0106 7.73911 12.0872 7.60616 12.1888 7.49332C12.2903 7.38046 12.4145 7.29023 12.5531 7.22846C12.6918 7.16669 12.8419 7.13477 12.9937 7.13477C13.1456 7.13477 13.2957 7.16669 13.4343 7.22846C13.573 7.29023 13.697 7.38046 13.7986 7.49332C13.9001 7.60616 13.9769 7.73911 14.0237 7.88351C14.0704 8.0279 14.0864 8.18053 14.0704 8.33149L13.9141 14.6113C13.9141 14.8537 13.8177 15.0864 13.6463 15.2578C13.4747 15.4293 13.2422 15.5256 12.9997 15.5256C12.7572 15.5256 12.5247 15.4293 12.3532 15.2578C12.1818 15.0864 12.0854 14.8537 12.0854 14.6113Z" fill="#E6AF2E" stroke="#E6AF2E" strokeWidth="0.5"/></svg>
				<span className=' w-full text-center ' >{t[0]} </span>
				<div className='flex mt-[20px] items-center justify-between w-full gap-[30px] ' >
					<Link href="/sign-in" className="rounded-[8px] hover:scale-[.94] duration-300 origin-center  h-[45px]  w-full bg-[#00b607] text-white flex items-center justify-center cursor-pointer  "> {t[1]} </Link>
					<button onClick={_=> setShow(!show)} className="rounded-[8px] hover:scale-[.94] duration-300 origin-center  h-[45px]  w-full bg-[#ff1c1c] text-white flex items-center justify-center cursor-pointer  "> {t[2]} </button>
				</div>
			</div>

		</div>
	</div>
  )
}
 