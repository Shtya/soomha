"use client"
import Navbar from './Navbar'
import Footer from './Footer'
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/app/[locale]/loading';
import { Toaster } from 'react-hot-toast';

const LayoutRoot = ({children}) => {

    const pathname = usePathname();
    const routes = ['/sign-in' , '/en/sign-in' , '/en/sign-in/otp' , '/sign-in/otp' , '/sign-up' , '/en/sign-up']
    if(routes.includes(pathname)) return children


  return (
    <main>
      <Suspense fallback={<Loading />} >
        <Navbar  /> 
        {children}
        <Footer />
        <Toaster />
      </Suspense>
    </main>
  )
}

export default LayoutRoot