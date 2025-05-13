"use client"
import { ChevronDown } from 'lucide-react'
import {Link} from '@/navigation';

import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const DropUser = ({t}) => {
  const router = useRouter()

  const [show , setShow] = useState(false)
  const styles = {
    a : "flex-row-reverse  text-[14px] font-[400] hover:text-[#3e64f4] w-full flex justify-between items-center px-[20px] py-[5px] hover:bg-[#f7f9ff] duration-300 transition-all "
  }

  const selectRef = useRef(null);
  useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) 
        setShow(false)
      }

    document.addEventListener('mousedown', handleClickOutside);
    return () =>  document.removeEventListener('mousedown', handleClickOutside);
    }, []);



  const handleLogout = (i)=>{
    if(i == 2){
      localStorage.removeItem("soomha-user")
      setTimeout(() => {
        router.push("/sign-in")
      }, 500);
    }
  }

  return (

    <div ref={selectRef} className=' z-[1000] w-[50px] h-[40px] relative ' onClick={_=> setShow(!show)} >
      <div className=" cursor-pointer flex items-center justify-between gap-[5px] h-full  "  >  <ChevronDown className={`  ${show ? "rotate-[180deg]" : "rotate-[0deg]"} duration-500 transition-all`} />  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.0346 4.81676C13.0346 6.14043 12.56 7.28621 11.6235 8.22281C10.6871 9.15926 9.54113 9.63395 8.21746 9.63395H8.21516C6.89312 9.63348 5.74797 9.15879 4.81152 8.22281C3.87496 7.28621 3.40039 6.14043 3.40039 4.81676C3.40039 3.49352 3.87496 2.34758 4.81152 1.41113C5.7475 0.475 6.8927 0.00046875 8.21516 0H8.21746C9.5407 0 10.6866 0.474688 11.6235 1.41113C12.56 2.34758 13.0346 3.49352 13.0346 4.81676Z" fill="#FFBB85"/> <path d="M16.6863 16.5605C16.6863 17.6049 16.3541 18.4504 15.6998 19.073C15.0531 19.6885 14.1978 20.0002 13.158 20.0002H3.52785C2.48793 20.0002 1.6327 19.6885 0.986445 19.0731C0.331797 18.4499 0 17.6046 0 16.5606C0 16.1589 0.0132812 15.7616 0.0398437 15.3795C0.0667969 14.9889 0.121484 14.5638 0.202031 14.1154C0.283203 13.6632 0.387578 13.2358 0.512578 12.8452C0.642266 12.4408 0.817734 12.042 1.03484 11.6599C1.26039 11.2633 1.52527 10.9179 1.82219 10.6334C2.13352 10.3357 2.51402 10.0966 2.95395 9.92238C3.39234 9.74902 3.87832 9.66113 4.39836 9.66113C4.60234 9.66113 4.79992 9.74461 5.18078 9.99273C5.45205 10.1694 5.72412 10.3448 5.99699 10.519C6.25887 10.6859 6.61348 10.8425 7.05184 10.9839C7.43715 11.1086 7.8282 11.1782 8.21457 11.1902C8.25715 11.1918 8.29973 11.1925 8.34231 11.1925C8.77137 11.1925 9.20531 11.1222 9.63316 10.9839C10.0716 10.8425 10.4266 10.6859 10.6883 10.519C10.9611 10.345 11.2331 10.1697 11.5042 9.9932C11.8854 9.74461 12.0827 9.66117 12.2871 9.66117C12.8067 9.66117 13.2927 9.74906 13.7314 9.92238C14.1713 10.0966 14.5518 10.3362 14.8628 10.6334C15.1602 10.9179 15.4251 11.2633 15.6505 11.6599C15.8678 12.0423 16.0436 12.4408 16.1728 12.8447C16.2979 13.2358 16.4026 13.6632 16.4837 14.1156C16.5639 14.5646 16.6186 14.9896 16.6455 15.3792C16.6725 15.7601 16.6858 16.1574 16.6863 16.5605Z" fill="#6AA9FF"/> <path d="M8.21715 9.63395H8.21484V0H8.21715C9.54039 0 10.6863 0.474688 11.6232 1.41113C12.5596 2.34758 13.0343 3.49352 13.0343 4.81676C13.0343 6.14043 12.5596 7.28621 11.6232 8.22281C10.6868 9.15926 9.54082 9.63395 8.21715 9.63395Z" fill="#F5A86C"/> <path d="M16.6865 16.5605C16.6865 17.6048 16.3543 18.4504 15.7 19.073C15.0534 19.6884 14.1981 20.0002 13.1582 20.0002H8.21484V11.1902C8.25742 11.1917 8.3 11.1925 8.34258 11.1925C8.77164 11.1925 9.20559 11.1221 9.63344 10.9839C10.0718 10.8425 10.4269 10.6859 10.6886 10.5189C10.9614 10.3449 11.2333 10.1697 11.5045 9.99316C11.8857 9.74457 12.0829 9.66113 12.2874 9.66113C12.807 9.66113 13.293 9.74902 13.7316 9.92234C14.1716 10.0966 14.5521 10.3362 14.8631 10.6334C15.1605 10.9178 15.4254 11.2633 15.6507 11.6598C15.868 12.0423 16.0438 12.4408 16.173 12.8447C16.2982 13.2358 16.4029 13.6632 16.484 14.1156C16.5641 14.5645 16.6189 14.9896 16.6458 15.3792C16.6728 15.76 16.6861 16.1574 16.6865 16.5605Z" fill="#2682FF"/> </svg>  </div>
      <ul className=' w-[200px] absolute  bg-white shadow-md border-[1px] border-[#aaa5] top-[120%] duration-500 transition-all ltr:right-[-20px] rtl:left-[-20px] max-lg:rtl:translate-x-[-50%] max-lg:rtl:left-[50%] max-lg:ltr:translate-x-[50%] max-lg:ltr:right-[50%]' style={{clipPath : show ? "polygon(0px -130%, 130% 0px, 130% 130%, 0% 130%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)"}}  >
        {
          t.raw('box2').map((e,i) => (
            <li key={i}> <Link onClick={_=> handleLogout(i)}  className={styles.a}  href={e.path} > {e.svg} {e.name} </Link> </li>
          ))
        }
      </ul>
    </div>


  )
}

export default DropUser