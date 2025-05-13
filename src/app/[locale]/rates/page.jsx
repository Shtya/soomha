"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'

//! validation

import { useTranslations } from 'next-intl'
import NotFound from '@/atoms/NotFound'
import {Link} from '@/navigation';

import useFetch from '@/utils/useFetch'
import Skeleton_box from '@/atoms/Skeleton'
import { GetUser } from '@/utils/GetUser'
import { handleTime } from '@/utils/handleTime'
import Statics from '@/atoms/Statics'

const page = () => {
  const t = useTranslations("rating")

  const user = GetUser();
  const [load , data ] =  useFetch('/website/rate/' , user?.token)
  const [  , Avarage ] =  useFetch('/website/rate/show' , user?.token)

  return (
    <div className='people clients-rating'>
      
      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">
        {
          load == false ? 
            data?.rates?.length >= 1 
            ? <>
              <div className="statics">

                <div className="head">
                  <div className="depart"> {t('depart')} <span> {` ( ${data?.rates.length} ) `} </span> </div>
                  <div className="rate">  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.61065 15.443C3.22465 15.641 2.78665 15.294 2.86465 14.851L3.69465 10.121L0.171653 6.76501C-0.157347 6.45101 0.0136534 5.87701 0.454653 5.81501L5.35265 5.11901L7.53665 0.792012C7.73365 0.402012 8.26665 0.402012 8.46365 0.792012L10.6477 5.11901L15.5457 5.81501C15.9867 5.87701 16.1577 6.45101 15.8277 6.76501L12.3057 10.121L13.1357 14.851C13.2137 15.294 12.7757 15.641 12.3897 15.443L7.99865 13.187L3.61065 15.443Z" fill="#EFC762"/> </svg>  {data?.average}  </div>
                </div>

                <div className="boxes">

                    <Statics num={5} width={Avarage?.five} />
                    <Statics num={4} width={Avarage?.four}  />
                    <Statics num={3} width={Avarage?.three}  />
                    <Statics num={2} width={Avarage?.two}  />
                    <Statics num={1} width={Avarage?.one}  />

                </div>
              </div>



              <div className="customers-oponion"> 
                {
                data?.rates.map((e,i) => (
                  <div className="box" key={i}>
                      <div className="head">
                        <div className="name">  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_989_7307)"><path d="M12 23.625C18.4203 23.625 23.625 18.4203 23.625 12C23.625 5.57969 18.4203 0.375 12 0.375C5.57969 0.375 0.375 5.57969 0.375 12C0.375 18.4203 5.57969 23.625 12 23.625Z" fill="#E6ECFF"/><path d="M21.3259 18.9281C20.2417 17.4766 18.8339 16.298 17.2144 15.4859C15.5949 14.6738 13.8082 14.2507 11.9965 14.2501C10.1848 14.2495 8.39787 14.6715 6.77781 15.4825C5.15776 16.2936 3.74919 17.4713 2.66406 18.9221C3.74364 20.3803 5.14988 21.5653 6.77003 22.382C8.39017 23.1987 10.1791 23.6244 11.9935 23.625C13.8078 23.6255 15.5971 23.201 17.2177 22.3853C18.8384 21.5697 20.2454 20.3856 21.3259 18.9281Z" fill="#4294FF"/><path d="M12 12.75C14.4853 12.75 16.5 10.7353 16.5 8.25C16.5 5.76472 14.4853 3.75 12 3.75C9.51472 3.75 7.5 5.76472 7.5 8.25C7.5 10.7353 9.51472 12.75 12 12.75Z" fill="#4294FF"/></g><defs><clipPath id="clip0_989_7307"><rect width="24" height="24" fill="white"/></clipPath></defs></svg> {e.user?.email.split("@")[0]} </div>
                        <div className="date"> {handleTime(e.created_at)} </div>
                      </div>
                      <div className="rate">  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.61065 15.443C3.22465 15.641 2.78665 15.294 2.86465 14.851L3.69465 10.121L0.171653 6.76501C-0.157347 6.45101 0.0136534 5.87701 0.454653 5.81501L5.35265 5.11901L7.53665 0.792012C7.73365 0.402012 8.26665 0.402012 8.46365 0.792012L10.6477 5.11901L15.5457 5.81501C15.9867 5.87701 16.1577 6.45101 15.8277 6.76501L12.3057 10.121L13.1357 14.851C13.2137 15.294 12.7757 15.641 12.3897 15.443L7.99865 13.187L3.61065 15.443Z" fill="#EFC762"/> </svg> {e.count}  </div>
                      <div className="p"> {e.message} </div>
                  </div>))
                }
              </div>

              <Link className='btn1' href='/rate-us' > {t("button")} </Link>
            </>
            : <NotFound message={t.raw('notFound')[0]} redirect={t.raw('notFound')[1]} href='/rate-us' />
            : <Skeleton_box />
        }
        
      </div>

    </div>
  )
}

export default page