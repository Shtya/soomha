'use client'
import React, { useEffect, useState } from 'react'
import { GetUser } from './GetUser';
import Alert from '@/atoms/Alert';
import { useRouter } from 'next/navigation';

export default function IsLogin() {
  
	const user = GetUser() ;
  	const [show , setShow ] = useState(true)
	const navigate = useRouter()


  const handleRoute = (e)=>{
	if(user)  {
		setShow(true) 
		navigate.push(e)
	}
	else      setShow(false)

  }


  return [handleRoute , show , setShow ]
  
}
