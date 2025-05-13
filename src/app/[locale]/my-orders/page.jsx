"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'

import { useTranslations } from 'next-intl'
import useFetch from '@/utils/useFetch'
import { GetUser } from '@/utils/GetUser'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { OrderSkelton } from '@/atoms/Skeleton/Skeleton_adds'
import { useEffect, useState } from 'react'
import { AXIOS } from '@/config/axios'
import dummy from '@/dummy'

const page = () => {
  const t = useTranslations("my-orders")
  const lang = useTranslations("")
  const user = GetUser() ;
  const navigate = useRouter()
  
  const [load ,{data}] = useFetch(`/user/order/user/${user?.user?.id}` , user?.token )

  const handleOrder = (e) => {
    navigate.push(`/my-orders/${e.id}`)
  }


  const [orders, setOrders] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null,
    prevPageUrl: null,
    total: 0,
    per_page : 10 ,
  });

  const fetchOrders = async (pageUrl, token) => {
    const response =  user && await AXIOS.get(pageUrl, {
      headers: { 'Authorization': `Bearer ${token}`, "Accept-Language": lang('lang') }
    }); 

    if (response?.data) {
      setOrders(response.data.data.data);
      setPaginationInfo({
        currentPage: response.data.data.current_page,
        lastPage: response.data.data.last_page,
        nextPageUrl: response.data.data.next_page_url,
        prevPageUrl: response.data.data.prev_page_url,
        per_page: response.data.data.per_page,
        total: response.data.data.total
      });
    }
  };

  // Initial load
  useEffect(() => { user && fetchOrders(`/user/order/user/${user.user.id}`, user.token);  }, [user]);

  const handlePageChange = (url) => {
    if (url) fetchOrders(url, user.token);
  };

  const visiblePages = () => {
    const { currentPage, lastPage } = paginationInfo;
    const pages = new Set();
  
    if (lastPage <= 5) {
      // If total pages are 5 or less, display them all.
      for (let i = 1; i <= lastPage; i++) {
        pages.add(i);
      }
    } else {
      // Add the first two and the last two pages.
      pages.add(1);
      pages.add(2);
      pages.add(lastPage - 1);
      pages.add(lastPage);
  
      // Add current page if not already included
      if (currentPage > 2 && currentPage < lastPage - 1) {
        pages.add(currentPage);
      }
  
      // Calculate the middle page and add it.
      const middlePage = Math.floor((lastPage / 2));
      pages.add(middlePage);
  
      // You might want to add additional logic here if the middlePage is close to the current, first, or last pages
      // to ensure there's a meaningful distribution. For example:
      if (Math.abs(middlePage - currentPage) <= 2) {
        // When the middle page is very close to the current page,
        // you may want to add additional pages next to the middle for better spread.
        if (middlePage - 1 > 2) pages.add(middlePage - 1); // Ensure not to duplicate first two pages
        if (middlePage + 1 < lastPage - 1) pages.add(middlePage + 1); // Ensure not to duplicate last two pages
      }
    }
  
    // Convert the Set to an Array, sort it, and return.
    return Array.from(pages).sort((a, b) => a - b);
  };


  return (
    <div className='people my-orders'>
      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">
        {
          load == false ?
          orders?.length >=1 && orders.map((e,i) => (
              <div className="box-orders" key={i} onClick={_=> handleOrder(e)}>
                <ChevronLeft />
                <div className="h2 max-md:!text-[12px]  "> <span> {t("model")}</span> <span>{e.made_year}</span> <span> {e?.car_model?.name_en} </span> </div>
                <div className="reply max-md:!text-[12px] !font-[800] opacity-80 "> {`${t("price")} : `} <span className='font-[600] text-[#3e64f4] '  > {Number(e?.final_price).toFixed(0)} </span> </div>
                {/* <div className="reply"> {e.reply == null ? <span style={{color:"#D34440"}} > {t("not-reply")} </span> : <span style={{color:"#E6AF2E"}} > {t("reply")} </span> } </div> */}
              </div>
          ))
          : <OrderSkelton number={6} />
        }
      </div>


      <div className='pagination'>
      <button disabled={!paginationInfo.prevPageUrl} className="arrow" onClick={() => handlePageChange(paginationInfo.prevPageUrl)}><ChevronLeft /></button>

      <div className='flex gap-[10px] items-center'>
        {visiblePages().map((page, index) => (
          <button key={index}
            className={`${paginationInfo.currentPage === page ? "bg-[#3e64f4] text-white border-[#3e64f4]" : "hover:text-[#3e64f4] hover:border-[#3e64f4]"} max-sm:w-[30px] max-sm:h-[30px] duration-300 w-[40px] h-[40px] rounded-[50%] border-[1px] border-gray-600`}
            disabled={paginationInfo.currentPage === page}
            onClick={() => handlePageChange(`/user/order/user/${user.user.id}?page=${page}`)}>
            {page}
          </button>
        ))}
      </div>

      <button disabled={!paginationInfo.nextPageUrl} className="arrow" onClick={() => handlePageChange(paginationInfo.nextPageUrl)}><ChevronRight /></button>
    </div>



    </div>
  )
}

export default page