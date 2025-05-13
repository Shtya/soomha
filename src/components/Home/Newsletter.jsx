"use client"
import { GetUser } from '@/utils/GetUser';
import useFetch from '@/utils/useFetch';
import React from 'react'
import IMG_offer from '@/assets/home/offer.png'
import Image from 'next/image';
import { Skeleton } from '@/atoms/Skeleton/Skeleton_adds';


const Newsletter = () => {

	const user = GetUser() ;
	let [ load2 , section2] = useFetch("/website/sections/get/2" , "dd") ;
  
  return (
        load2 == false 
          ? section2?.id
            ? <div className="newsletter">
                <div className="container">
                    <Image src={IMG_offer} alt='text' width={1400} height={400} />
                    <p  > {section2?.content }  </p>  
                </div>
              </div>
            : null
          : <Skeleton />
  )
}

export default Newsletter