'use client'
import { AXIOS } from "@/config/axios";
import { banksUrls, peopleUrls } from "@/constant/constant";
import { axiosFetch } from "@/utils/Evaluate_reqs";
import { GetUser } from "@/utils/GetUser";
import { notification } from "@/utils/notification";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = ({data  , manual ,modelName}) => {
  const people = useTranslations("people")
  const kilos = people.raw("distance")
  const motor = people.raw("boxes2")[4].choose
  const gearbox = people.raw("boxes2")[5].choose

  const t = useTranslations('info-card');
  const lang = useTranslations('');
  const navigate = useRouter()

  const user = GetUser()
  const brand = axiosFetch(`website/brands/show/${data?.order?.brand_id}` , 2)  
  const order = data?.order


    //! Get checkout..
  	const [checkoutData , setCheckoutData ] = useState()
	const GetCheckoutData = ()=>{
		user  && AXIOS.post("/checkout" , { type:"1" , user_id : user?.user?.id , final_orders : [data?.order_details?.order_id], order_id  : data?.order_details?.order_id } )
	   .then(res => setCheckoutData(res.data.data))
	}
	useEffect(_=> { GetCheckoutData() } ,[user])	

	//! Use Coupon
  	const [coupon , setCoupon] = useState()
	const handleCoupon = ()=>{
		if(!coupon) return notification("you must provide a coupon" , 'error')
		if(checkoutData?.coupon) return notification("you already use a coupon")

			AXIOS.post("/user/coupon/submit" , { coupon:coupon , user_id : user?.user?.id , order_id  : data?.order_details?.order_id } , {headers : {Authorization : `Bearer ${user?.token}`}} )
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
		const data = {
			success_url : peopleUrls.success_url,
			declined_url: peopleUrls.declined_url,
			cancel_url  : peopleUrls.cancel_url,
			description : "" ,
			user_sub    : checkoutData?.user_sub ,
			rest        : checkoutData?.rest ,
			name        : user?.user?.name ,
			amount      : checkoutData?.price_after_coupon ,
			order_id    : [checkoutData?.id]
		}

		if(checkoutData?.price_after_coupon == 0){
			navigate.push(peopleUrls?.success_url)
		}
		else AXIOS.post("/telr/payment" , data  , {headers: { 'Authorization': 'Bearer '+user?.token,  "Accept-Language": lang('lang'),   }})

		.then(res => 
			navigate.push(res?.data?.order?.url)  			
		).catch(err => console.log(err) )

	}

	useEffect(() => {
		if(manual == 0) {
			localStorage.setItem("final-price" , order?.final_price)
		}else{
			localStorage.removeItem("final-price" , null)
		}
	},[manual , data] )



  return (
    <div className="info-card">
		<div className="container">
			{/* <pre className="" dir="ltr" > {JSON.stringify(data , null , 2)} </pre> */}
			
			<div className="flex items-center justify-between mb-[40px] " >
				<div className="h3"> {t("h1")} </div>
			</div>

			<div className="boxes">
				<div className="box">
					<div> <div className="p"> {t.raw("left")[0]} </div> <b> {`${brand?.title_en} , ${modelName}`} </b>  </div>
					<div> <div className="p"> {t.raw("left")[1]} </div> <b> {order?.made_year} </b>  </div>
					<div> <div className="p"> {t.raw("left")[2]} </div> <b> {people.raw("boxes2")[3].choose[order?.car_case].title} </b>  </div>
					<div> <div className="p"> {t.raw("left")[3]} </div> <b> {order?.current_price} </b>  </div>
					{/* <div> <div className="p"> {t.raw("left")[7]} </div> <b> {order?.final_price} </b>  </div> */}
					<div> <div className="p"> {t.raw("left")[4]} </div> <b> {kilos?.filter((e)=> e?.id == data?.order?.kilos)[0]?.title} </b>  </div>
					<div> <div className="p"> {t.raw("left")[5]} </div> <b> {order?.damage_pieces > 0 ? t.raw("spry")[0] : t.raw("spry")[1] } </b>  </div>
					<div> <div className="p"> {t.raw("left")[6]} </div> <b> {order?.damage_pieces} </b>  </div>
					<div> <div className="p"> {people.raw('boxes2')[4].label} </div> <b>{motor?.filter((e)=> e?.id == data?.order?.motor)[0]?.title} </b>  </div>
					<div> <div className="p"> {people.raw('boxes2')[5].label} </div> <b>{gearbox?.filter((e)=> e?.id == data?.order?.gearbox)[0]?.title} </b>  </div>
				</div>

				<div className="box">

					<label htmlFor="code"> {t.raw("discount")[0]}  </label>

					<div className="group ">
						<input value={coupon} onChange={e => setCoupon(e.target.value)} type="text" placeholder={t.raw("discount")[1]} />
						<button onClick={handleCoupon} className="btn1 coupon"> {t.raw("discount")[2]} </button>
					</div>

					{checkoutData?.coupon && <span> {t.raw("discount")[3]} </span>}

					<p />

					<div> <div className="p"> {t.raw("right")[0]} </div> <b className="rtl:flex-row-reverse flex flex-row items-center gap-[4px] " >  {checkoutData?.service_price} </b>  </div>
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
