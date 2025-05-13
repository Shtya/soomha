"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import {  useEffect, useRef} from 'react'

//! validation


import { accountSchema } from '@/validation/accountSchema'
import { Toaster } from 'react-hot-toast'
import { useTranslations } from 'next-intl'

import InputPlus from '@/atoms/InputPlus'
import {Link} from '@/navigation'
import Input from '@/atoms/Input'
import ButtonLoad from '@/atoms/ButtonLoad'
import { GetUser } from '@/utils/GetUser'
import { usePostAuth } from '@/utils/usePost'


const page = () => {
  const t = useTranslations("my-account")
  
  //! Submit handler
  const user = GetUser();

  useEffect(()=> {
    setValue ("phone" , user?.user?.phone)
  } ,[user])
  
  const DATA = (data)=>({    email : user?.user?.email ,   phone :data.phone ,   old_password :data.passwordCurrent ,   password :data.newPassword ,   c_password :data.confirmPassword , })
  const [ register , Submit , errors , isLoading , getValues , success , control , watch , setValue  ] = usePostAuth(accountSchema , `/user/auth/update/${user?.user?.id}` , 'my-account' , DATA , user?.token)


  const hidden1 = useRef(null)
  const handleClick = ()=>{ 
    hidden1.current.classList.toggle("hidden-collapse")
  }


  return (
    <div className='people my-account'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className={`container `}>

        <div className="head"> <svg width="67" height="80" viewBox="0 0 67 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52.1347 19.267C52.1347 24.5617 50.2359 29.1448 46.4902 32.8913C42.7444 36.637 38.1606 38.5358 32.8659 38.5358H32.8567C27.5686 38.5339 22.988 36.6352 19.2422 32.8913C15.4959 29.1448 13.5977 24.5617 13.5977 19.267C13.5977 13.9741 15.4959 9.39031 19.2422 5.64453C22.9861 1.9 27.5669 0.001875 32.8567 0H32.8659C38.1589 0 42.7425 1.89875 46.4902 5.64453C50.2359 9.39031 52.1347 13.9741 52.1347 19.267Z" fill="#FFBB85"/><path d="M66.745 66.2414C66.745 70.4188 65.4163 73.8008 62.7991 76.2914C60.2125 78.7531 56.7912 80 52.6319 80H14.1114C9.95172 80 6.53078 78.7531 3.94578 76.2916C1.32719 73.7988 0 70.4175 0 66.2416C0 64.635 0.053125 63.0456 0.159375 61.5173C0.267188 59.9548 0.485937 58.2544 0.808125 56.4606C1.13281 54.652 1.55031 52.9425 2.05031 51.38C2.56906 49.7625 3.27094 48.1672 4.13938 46.6388C5.04156 45.0525 6.10109 43.6706 7.28875 42.533C8.53406 41.3422 10.0561 40.3858 11.8158 39.6888C13.5694 38.9953 15.5133 38.6438 17.5934 38.6438C18.4094 38.6438 19.1997 38.9777 20.7231 39.9702C21.8082 40.6768 22.8965 41.3785 23.988 42.0752C25.0355 42.743 26.4539 43.3692 28.2073 43.935C29.7486 44.4336 31.3128 44.7119 32.8583 44.76C33.0286 44.7663 33.1989 44.7694 33.3692 44.7694C35.0855 44.7694 36.8212 44.488 38.5327 43.935C40.2862 43.3692 41.7066 42.7428 42.7533 42.0752C43.8444 41.3792 44.9323 40.6781 46.0169 39.972C47.5416 38.9777 48.3306 38.6439 49.1486 38.6439C51.2267 38.6439 53.1708 38.9955 54.9255 39.6888C56.6852 40.3856 58.2073 41.3441 59.4513 42.533C60.6409 43.6706 61.7005 45.0525 62.6019 46.6388C63.4711 48.1684 64.1742 49.7625 64.6911 51.3781C65.1917 52.9425 65.6103 54.652 65.935 56.4617C66.2555 58.2575 66.4745 59.9578 66.582 61.5161C66.69 63.0395 66.7431 64.6289 66.745 66.2414Z" fill="#6AA9FF"/><path d="M32.8686 38.5358H32.8594V0H32.8686C38.1616 0 42.7452 1.89875 46.4928 5.64453C50.2386 9.39031 52.1373 13.9741 52.1373 19.267C52.1373 24.5617 50.2386 29.1448 46.4928 32.8913C42.747 36.637 38.1633 38.5358 32.8686 38.5358Z" fill="#F5A86C"/><path d="M66.7461 66.2414C66.7461 70.4188 65.4173 73.8008 62.8002 76.2914C60.2136 78.7531 56.7923 80 52.633 80H32.8594V44.7602C33.0297 44.7662 33.2 44.7692 33.3703 44.7692C35.0866 44.7692 36.8223 44.488 38.5337 43.9348C40.2873 43.3692 41.7077 42.743 42.7544 42.0752C43.8455 41.3792 44.9334 40.6781 46.018 39.972C47.5427 38.9777 48.3317 38.6439 49.1497 38.6439C51.2278 38.6439 53.1719 38.9955 54.9266 39.6887C56.6863 40.3856 58.2084 41.3441 59.4523 42.533C60.642 43.6706 61.7016 45.0525 62.603 46.6388C63.4722 48.1684 64.1753 49.7625 64.6922 51.3781C65.1928 52.9425 65.6114 54.652 65.9361 56.4617C66.2566 58.2575 66.4756 59.9578 66.5831 61.5161C66.6911 63.0395 66.7442 64.6289 66.7461 66.2414Z" fill="#2682FF"/></svg> </div>

        <form onSubmit={e=> e.preventDefault()} className="inputs" >


              <label className=' text-[18px] font-[700] text-[#424448] ' > {t.raw("box")[0].label} </label>
              <div className=" mb-[30px] flex items-center gap-[10px] text-[18px] font-[500] text-[#424448] "> {user?.user?.email} <svg className='order-[-1]' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 20C3.1 20 2.75 19.85 2.45 19.55C2.15 19.25 2 18.9 2 18.5V5.5C2 5.1 2.15 4.75 2.45 4.45C2.75 4.15 3.1 4 3.5 4H20.5C20.9 4 21.25 4.15 21.55 4.45C21.85 4.75 22 5.1 22 5.5V18.5C22 18.9 21.85 19.25 21.55 19.55C21.25 19.85 20.9 20 20.5 20H3.5ZM20.5 6.875L12.4 12.175C12.3333 12.2083 12.2708 12.2375 12.2125 12.2625C12.1542 12.2875 12.0833 12.3 12 12.3C11.9167 12.3 11.8458 12.2875 11.7875 12.2625C11.7292 12.2375 11.6667 12.2083 11.6 12.175L3.5 6.875V18.5H20.5V6.875ZM12 10.95L20.4 5.5H3.625L12 10.95ZM3.5 7.05V6.06707V6.08537V5.5V6.075V6.0522V7.05Z" fill="#B0B5AF"/></svg> </div>

              <InputPlus   err_star="no"  reg={register('phone')}    err={errors.phone}     id="phone"     label={t.raw("box")[1].label}  place={t.raw("box")[1].place} type="phone"  icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.47375 16.9455C1.5135 16.9125 6.00525 13.698 7.224 13.9088C7.80975 14.0122 8.145 14.4113 8.81625 15.2115C9.00183 15.4341 9.19161 15.6531 9.3855 15.8685C9.80975 15.7303 10.2236 15.5619 10.6238 15.3645C12.6896 14.3588 14.3588 12.6896 15.3645 10.6237C15.5619 10.2236 15.7303 9.80975 15.8685 9.3855C15.648 9.18375 15.339 8.9235 15.207 8.8125C14.4113 8.145 14.0122 7.80975 13.9088 7.22325C13.6965 6.009 16.9125 1.5135 16.9455 1.473C17.092 1.26529 17.2827 1.09269 17.504 0.967663C17.7252 0.842632 17.9715 0.768289 18.225 0.75C19.5285 0.75 23.25 5.577 23.25 6.39075C23.25 6.438 23.1817 11.241 17.259 17.2658C11.241 23.1817 6.438 23.25 6.39075 23.25C5.577 23.25 0.75 19.5285 0.75 18.225C0.768272 17.9714 0.842688 17.7251 0.967857 17.5038C1.09303 17.2825 1.26583 17.0918 1.47375 16.9455ZM6.47325 21.7455C7.12875 21.6915 11.1593 21.1597 16.1985 16.209C21.1747 11.1427 21.693 7.101 21.7448 6.47475C20.7617 4.93173 19.5744 3.52877 18.2153 2.304C18.1853 2.334 18.1455 2.379 18.0945 2.4375C17.0521 3.86042 16.1542 5.3837 15.414 6.98475C15.6547 7.2269 15.9091 7.45503 16.176 7.668C16.5899 7.98334 16.9699 8.34075 17.31 8.7345L17.4922 8.9895L17.4383 9.29775C17.2795 9.9853 17.0364 10.6506 16.7145 11.2785C15.5611 13.647 13.6472 15.5607 11.2785 16.7137C10.6507 17.0361 9.98539 17.2795 9.29775 17.4382L8.9895 17.4923L8.7345 17.31C8.33926 16.9684 7.98036 16.5869 7.6635 16.1715C7.42875 15.891 7.1145 15.5168 6.996 15.411C5.3904 16.1505 3.86322 17.0495 2.4375 18.0945C2.37525 18.147 2.33175 18.1875 2.3025 18.2137C3.52707 19.5733 4.93006 20.7609 6.47325 21.744V21.7455Z" fill="#B0B5AF"/></svg>}   />

              <div className='txt-icon' onClick={handleClick}> {t.raw('links')[0]} </div>

              <div ref={hidden1} className="hidden1">
                <Input   err_star="no"  reg={register('passwordCurrent')}    err={errors.passwordCurrent}     id="passwordCurrent"     label={t.raw("box_change")[0].label}  place={t.raw("box_change")[0].place} type="password"  />
                <Input   err_star="no"  reg={register('newPassword')}    err={errors.newPassword}     id="newPassword"     label={t.raw("box_change")[1].label}  place={t.raw("box_change")[1].place} type="password"  />
                <Input   err_star="no"  reg={register('confirmPassword')}    err={errors.confirmPassword}     id="confirmPassword"     label={t.raw("box_change")[2].label}  place={t.raw("box_change")[2].place} type="password"  />
                <Link className='txt-icon' href='/forget-password' > {t.raw('links')[1]} </Link>
              </div>

              <ButtonLoad isLoading={isLoading} onClick={Submit}  value1={t.raw('button')[0]} value2={t.raw('button')[1]} />
              
        </form>

      </div>
      <Toaster />
    </div>
  )
}

export default page