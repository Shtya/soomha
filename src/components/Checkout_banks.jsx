'use client'
import { AXIOS } from "@/config/axios";
import { banksUrls, companyUrls } from "@/constant/constant";
import { GetUser } from "@/utils/GetUser";
import { notification } from "@/utils/notification";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const Checkout = ({name , data  ,  fileName , type}) => {
  const t = useTranslations('info-card');
  const lang = useTranslations('');
  const user = GetUser()
  const navigate = useRouter()

  //! Get checkout..
	const [checkoutData , setCheckoutData ] = useState()

	const GetCheckoutData = ()=>{
		user  && AXIOS.post("/checkout" , { type: type , user_id : user?.user?.id , final_orders : data.orderIDs , order_id : data["last Order id "] , count : data["Number of Cars Inserted = "] } )
		.then(res => setCheckoutData(res.data.data))

	}
	useEffect(_=> { GetCheckoutData() } ,[user])	
	
	//! Use Coupon
	const [coupon , setCoupon] = useState()
	const handleCoupon = ()=>{
		if(!coupon) return notification("you must provide a coupon" , 'error')
		if(checkoutData?.coupon) return notification("you already use a coupon")
						
		AXIOS.post("/user/coupon/submit" , { coupon:coupon , user_id : user?.user?.id , order_id  : data["last Order id "] } , {headers : {Authorization : `Bearer ${user?.token}`}} )
		.then(res => notification("coupon applied successfully" , 'success') )
		.then(_=> GetCheckoutData())
		.catch(err=> {
			const msg = err?.response?.data?.message
			if(msg == "messages.used_before") return notification( "Please use another coupon this coupon doesn't valid.." || "an error occurred" , 'error')
			if(msg == "there is no data") return notification( "This id doesn't valid.." || "an error occurred" , 'error')
			notification( msg || "an error occurred" , 'error')
		} )
	}
	


	const confirmOrder = ()=>{
		if(checkoutData?.price_after_coupon == 0){
			navigate.push(banksUrls?.success_url)
		}
		else AXIOS.post("/telr/payment" , {
			//subscription_id:21
			success_url: type == "2" ? banksUrls.success_url : companyUrls.success_url,
			declined_url: type == "2" ? banksUrls.declined_url : companyUrls.declined_url ,
			cancel_url: type == "2" ? banksUrls.cancel_url : companyUrls.cancel_url ,
			description : "description" ,
			name : name ,
			user_sub : checkoutData?.user_sub ,
			rest     : checkoutData?.rest ,
			amount : checkoutData?.price_after_coupon ,
			"order_id" : data?.orderIDs
			} , {headers: { 'Authorization': 'Bearer '+user?.token,  "Accept-Language": lang('lang'),   }})

		.then(res => 
			navigate.push(res?.data?.order?.url)  			
		).catch(err => console.log(err) )

	}


  return (
    <div className="info-card">
		<div className="container">
			
			<div className="flex items-center justify-between mb-[40px] " > <div className="h3"> {t("h1")} </div> </div>

			<div className="boxes">


				<div className="box flex justify-start items-start flex-col ">
					<div> <div className=" mb-[20px] capitalize text-[18px] font-[700] "> {t("info")} </div> </div>
					<div className="flex flex-col items-start justify-start gap-[10px] " > 
						<div className="p justify-start w-full items-center flex gap-[5px] "> <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.09641 0H7.45115L11.9825 4.72993V13.9153C11.9825 15.0657 11.0541 16 9.90371 16H2.09641C0.951879 16 0.0175781 15.0657 0.0175781 13.9153V2.07883C0.0175579 0.934301 0.951879 0 2.09641 0Z" fill="#00733B"/><path fillRule="evenodd" clipRule="evenodd" d="M7.44531 0V4.68905H11.9825L7.44531 0Z" fill="white"/><path d="M4.99298 11.6496H4.21635L3.68497 10.7562L3.15357 11.6496H2.37109L3.29373 10.0963L2.48206 8.74742H3.26452L3.68495 9.44814L4.09954 8.74742H4.88202L4.07617 10.1022L4.99298 11.6496ZM5.26743 11.6496V8.74742H6.00904V11.0189H7.27035V11.6496H5.26743V11.6496ZM8.49663 11.6847C8.20465 11.6847 7.94773 11.5912 7.72584 11.4102C7.50977 11.235 7.38716 11.0131 7.36963 10.7504L8.00613 10.5635C8.02366 10.7036 8.08204 10.8263 8.18132 10.9197C8.28642 11.0131 8.40321 11.0598 8.53168 11.0598C8.63679 11.0598 8.72438 11.0365 8.79445 10.9898C8.85868 10.9431 8.89371 10.8788 8.89371 10.8029C8.89371 10.7387 8.86452 10.6861 8.81196 10.6394C8.7594 10.5985 8.68933 10.5635 8.60757 10.5343C8.52582 10.5051 8.42656 10.4759 8.32728 10.4526C8.22218 10.4234 8.11705 10.3883 8.01779 10.3416C7.91269 10.3007 7.81925 10.2482 7.7375 10.1839C7.6499 10.1255 7.58568 10.038 7.53312 9.927C7.48056 9.8219 7.45136 9.69342 7.45136 9.54744C7.45136 9.30803 7.55062 9.10948 7.75501 8.95182C7.95939 8.78831 8.20465 8.7124 8.49077 8.7124C8.7769 8.7124 9.02799 8.78247 9.23821 8.91679C9.44844 9.05692 9.58273 9.23796 9.63529 9.45985L8.9696 9.74014C8.94041 9.61751 8.88201 9.51825 8.80025 9.44234C8.7185 9.37227 8.6134 9.3314 8.49077 9.3314C8.39733 9.3314 8.32726 9.35474 8.26888 9.3898C8.21632 9.42483 8.19297 9.47739 8.19297 9.54162C8.19297 9.60002 8.228 9.65257 8.29807 9.69344C8.36814 9.72848 8.46158 9.75767 8.56668 9.7752C8.67178 9.79272 8.78857 9.82191 8.9112 9.86279C9.03967 9.90951 9.15062 9.95623 9.26156 10.0205C9.36666 10.0789 9.45426 10.1781 9.52433 10.3066C9.60024 10.4409 9.63527 10.5986 9.63527 10.7796C9.63527 11.0482 9.53017 11.2701 9.31994 11.4336C9.10972 11.5971 8.83533 11.6847 8.49663 11.6847Z" fill="white"/></svg>  {fileName} </div> 
						<div className="p"> {t.raw("banks")[0]}  <span className="text-green mx-[4px] font-[700] inline-block " > {checkoutData?.rest} </span>  {t.raw("banks")[1]} </div>
					</div>
				</div>


				<div className="box">

					<label htmlFor="code"> {t.raw("discount")[0]}  </label>

					<div className="group ">
						<input value={coupon} onChange={e => setCoupon(e.target.value)} type="text" placeholder={t.raw("discount")[1]} />
						<button onClick={handleCoupon} className="btn1 coupon"> {t.raw("discount")[2]} </button>
					</div>

					{checkoutData?.coupon && <span> {t.raw("discount")[3]} </span>}

					<p />

					<div> <div className="p"> {t.raw("right")[0]} </div > <b className="rtl:flex-row-reverse flex flex-row items-center gap-[4px] " > <dir> {checkoutData?.count} </dir> {` * `} <div>{checkoutData?.service_price}</div> </b>  </div>
                    <div> <div className="p"> {t.raw("right")[1]} </div> <b> {checkoutData?.tax} </b>  </div>
                    <div className="diff"> <div className="p"> {t.raw("right")[2]} </div> <b> {checkoutData?.price_befor_coupon} </b>  </div>

					<p />
                    <div className="diff2"> <div className="p"> {t.raw("right")[3]} </div> <b> {checkoutData?.price_after_coupon} </b>  </div>
                    
				</div>
			</div>

			<button className="btn1 btn2" onClick={confirmOrder} > {t("btn")} </button>

		</div>

		
    </div>
  );
};

export default Checkout;
