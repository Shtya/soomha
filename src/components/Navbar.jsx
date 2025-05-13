"use client"
import Image from 'next/image'
import {Link} from '@/navigation';

import React, {  useEffect,  useRef, useState } from 'react'
import Logo from '@/assets/logo.png'
import DropUser from '@/atoms/DropUser'
import { useLocale, useTranslations } from 'next-intl'
import { GetUser } from '@/utils/GetUser'

import { useRouter, usePathname , Link as Link2  } from '@/navigation'
import { Globe } from 'lucide-react'
import DropLang from '@/atoms/DropLang'



const Navbar = () => {
  const t = useTranslations('navbar2' )
  const pathname = usePathname()
  //! ref
  const ul_ref = useRef(null)
  const container_ref = useRef(null )

  //! IsAuth
  const user = GetUser()
  const [IsAuth , setIsAuth] = useState(false)
  useEffect(_=> {
      localStorage.getItem("soomha-user") ? setIsAuth(true) : setIsAuth(false) ;
  } ,[])


  const handleOpen = ()=>{
    document.querySelector(".open-close").classList.toggle("active")
    ul_ref.current.classList.toggle("active-inner")
    document.querySelector("nav").classList.toggle("fixed")
  }

  useEffect(_=> {
    //! close menu when click on any element
    let li = document.querySelectorAll("nav .inner ul li a")
    li.forEach(ele =>{
      ele.addEventListener("click" , function(e){
        li.forEach(lis => lis.classList.remove("active"))
        ele.classList.add("active")
        document.querySelector(".open-close").classList.remove("active")
        ul_ref.current.classList.remove("active-inner")
        document.querySelector("nav").classList.remove("fixed")
      })
    })

  } ,[])


    //! up down navbar 
    useEffect(_=> {
      let lastScrollY = window.scrollY;
        const navbar = document.querySelector("nav");
      window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) navbar.style.top = "-140px"; 
        else navbar.style.top = "0";
        lastScrollY = window.scrollY;
        });
  
    } , [])
  

  return (
    <nav>
      <div ref={container_ref} className="container">
        
        <Link href='/' className="logo"> 
            <Image src={Logo} alt='Logo' />
            <span> Soomha </span>
        </Link>


        <div className="inner" ref={ul_ref} >
            <ul className='main-ul'>
                {
                  t.raw('box1').map((e,i)=> (
                    <li key={i}><Link className={(pathname == e.path || pathname == '/en' + e.path) ? "active" : ""} href={e.path}> {e.name}</Link></li>
                  ))
                }


              <div className="drops">
                <DropLang />
                { IsAuth 
                  ? <DropUser t={t} /> 
                  : <Link href="/sign-in" className='btn1' > {t("button")} </Link>  }
              </div>


            </ul>
            
      </div>
        

        <div className="open-close" onClick={handleOpen}> <span></span> <span></span> <span></span> </div>
      </div>
    </nav>
  )
}

export default Navbar