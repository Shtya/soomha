'use client'
import Image from 'next/image'
import React from 'react'

import useFetch from '@/utils/useFetch'
import Skeleton_brands from '@/atoms/Skeleton/Skeleton_brands'
import NotFound from '@/atoms/NotFound'

const Section2 = () => {

  // let [ load , brand_car] = useFetch("/website/brands" , 'dd') ;
  let [ load , section1] = useFetch("/website/sections/get/1" , 'dd') ;


  return (
    <section className='section2'>
      <div className="container">
        {
          load == false 
            ? <>
                <h2 className="h1-head"> {section1?.title} </h2>
                <p className="p-head"> {section1?.content} </p>
                <div className="boxes">
                  {
                    section1?.images?.length >= 1 
                      ? section1?.images?.map((e,i)=> (e && <Image key={i} src={e} alt=""  width={300} height={300} /> )) 
                      : <div className='text-[22px] font-sans font-[600] ' > There is no brands yet </div>
                  }
                </div>
              </>

          : <div className="skel"> 
              <div className="h-3  w-[200px] m-auto  bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
              <div className="h-3  w-[300px] m-auto2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
              <Skeleton_brands /> 
            </div>
        }
      </div>

    </section>
    
  )
}

export default Section2