import {Link} from '@/navigation';

import React from 'react'

const BreadCrumbs = ({main , second , slash , third}) => {
  return (
    <div className='bread-crumbs mb-[50px]'>
      <div className="container">
          <div> <Link href="/"> {main} </Link> </div> 
          <div>{slash}</div> 
          {
            third && <>
            <Link href='/complains' className={third} > {third} </Link> 
            <div className='else'>{slash}</div> 
            </>
          }
          <span className={second} > {second} </span> 
      </div>
      </div>
  )
}

export default BreadCrumbs