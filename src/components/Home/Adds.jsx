'use client' ;
import Image from 'next/image'
import React from 'react'
import useFetch from '@/utils/useFetch';
import Skeleton_brands from '@/atoms/Skeleton/Skeleton_brands';
import {Link} from '@/navigation';


const Adds = () => {
  const [load , data]  =useFetch("/website/ads/3" , "dd")
  
  return (
    <section className='adds'>
      
      <div className="container">
      {
        load == false 
          ? data.length >=1 
            ? data.map((e,i) => <Link target="_blank" key={i} href={ e.link || "" } > <Image className='object-contain' src={e.image} width={400} height={300}  alt='ads' /> </Link>  )
            : <h1> there are no exists adds </h1>
        : <Skeleton_brands classN='adds_3' />
      }
      </div>
    </section>
  )
}

export default Adds