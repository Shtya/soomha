"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import { useTranslations } from 'next-intl'
import NotFound from '@/atoms/NotFound'
import {Link} from '@/navigation';

import { handleTime } from '@/utils/handleTime'
import Skeleton from '@/atoms/Skeleton'
import useFetch from '@/utils/useFetch'
import { GetUser } from '@/utils/GetUser'

const page = () => {
  const t = useTranslations("complains")

  const user = GetUser()
  const [load , data ] = useFetch(`/user/complains/getByUser/${user?.user?.id}` , user?.token)
  
  return (
    <div className='people clients-rating'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">
        {
          load == false ? 
            data?.length >= 1  ? 
                <> <div className="customers-oponion"> {
                  data.map((e,i) => (
                    <div className='mb-[15px] ' key={i} >
                      <div className="box bg-[#fcfcfc] p-[10px] !mb-0 " key={i} >
                          <div className="text-[16px] text-[#969798] mb-[10px] "> {handleTime(e.created_at)} </div>
                          <div className="text-[14] font-[500] text-[#272D2D] "> {e.message} </div>
                      </div>
                      
                        { e?.reply && <div className=" p-[10px] font-[500] !text-[14] text-[#272D2D] bg-[#F4FFEF] "> {e.reply } </div>}
                      
                    </div>
                      ))}
                  </div>
                  <Link className='btn1' href='/send-complains' > {t("button")} </Link>
                </> 
            : <NotFound message={t.raw('notFound')[0]} redirect={t.raw('notFound')[1]} href="/send-complains" />

          : <Skeleton />
        }
        
      </div>

    </div>
  )
}

export default page