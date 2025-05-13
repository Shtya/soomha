"use client"
import { ChevronDown, Globe } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouter , usePathname} from '../navigation'



const DropLang = () => {

  //! lang 
  // const pathname = usePathname();
  // const cleanPathname = pathname.replace(/^\/(en|ar)/, '');

  
  const [show , setShow] = useState(false)
  const styles = {
    a : " text-[14px] font-[400] hover:text-[#3e64f4] w-full  flex justify-center px-[20px] py-[5px] hover:bg-[#f7f9ff] duration-300 transition-all "
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

// const handle = ()=>{
//   setTimeout(() => {
//     location.reload()
//   }, 1000);
// }

const router = useRouter();
	const pathname = usePathname();

	const handleLanguageChange = (language) => {
		router.push(pathname, { locale: language });
	};

  return (
    <div ref={selectRef} className=' z-[10000] w-[50px] h-[40px] relative ' onClick={_=> setShow(!show)} >
      <div className=" cursor-pointer flex items-center justify-between gap-[5px] h-full  "  >  <ChevronDown className={`  ${show ? "rotate-[180deg]" : "rotate-[0deg]"} duration-500 transition-all`} />  <Globe />  </div>
      <ul className=' w-[150px] absolute  bg-white shadow-md border-[1px] border-[#aaa5] top-[120%] duration-500 transition-all ltr:right-[-20px] rtl:left-[-20px] max-lg:rtl:translate-x-[-50%] max-lg:rtl:left-[50%] max-lg:ltr:translate-x-[50%] max-lg:ltr:right-[50%]' style={{clipPath : show ? "polygon(0px -130%, 130% 0px, 130% 130%, 0% 130%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)"}}  >
        <li onClick={_=> handleLanguageChange("ar") }> <Link className={styles.a}  href="" locale="ar" >  العربية  </Link> </li>
        <li onClick={_=> handleLanguageChange("en") }> <Link className={styles.a}  href="" locale="en" >  English </Link> </li>
      </ul>
    </div>
  )
}

export default DropLang