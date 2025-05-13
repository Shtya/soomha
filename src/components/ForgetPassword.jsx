import { X } from 'lucide-react'
import {Link} from '@/navigation';

import React from 'react'

const ForgetPassword = ({show , setShow}) => {
  return (
    <div className='forget-password '>
      <div className="overlay"></div>
      <div className="container">
            <h1> Not yet </h1>
            <Link onClick={_=> setShow(!show)}  href="" className="x" > <X /> </Link>
      </div>
    </div>
  )
}

export default ForgetPassword