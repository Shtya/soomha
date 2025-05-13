"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import {  useEffect, useRef, useState } from 'react'

//! validation

import { AXIOS } from '@/config/axios'
import { useTranslations } from 'next-intl'

import Image from 'next/image'
import notFound from '@/assets/notFound.png'
import {Link} from '@/navigation';


const page = () => {
  const t = useTranslations("my-notifications")

  useEffect(_=> {
    // AXIOS.get("")
  } ,[])

  return (
    <div className='people my-notifications'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">
        {
          t.raw('data').length >= 1  
            ? t.raw('data')?.map(( e, i)=>(
              <div className="box" key={i}>
                <div className="header"> 
                  <div className="_h3"> {e.res} </div>
                  <div className="_h4"> {e.details} </div>
                </div>
                <div className="txt-icon"> {e.date} </div>
            </div>))

            : <div className="not-found">
                <Image src={notFound} alt='not found' width={200} height={200} />
                <div className="p"> {t.raw('error')[0]} </div>
                <Link className='btn1' href='/'> {t.raw('error')[0]} </Link>
            </div>
        }
      </div>

    </div>
  )
}

export default page