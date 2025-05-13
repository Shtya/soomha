"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import Input, { Phone }         from '@/atoms/Input'
import Selection, { Selection1 }     from '@/atoms/Select'
import {  useEffect, useState } from 'react'

//! validation
import { banksSchema } from '@/validation/banksSchema'
import { CircleChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { GetUser } from '@/utils/GetUser'
import BtnSendFiles from '@/atoms/BtnSendFiles'
import useFetch from '@/utils/useFetch'
import ButtonLoad from '@/atoms/ButtonLoad'
import { notification } from '@/utils/notification'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { AXIOS } from '@/config/axios'
import Checkout from '@/components/Checkout_banks'
import Alert2 from '@/atoms/Alert2'



const page = () => {
  const t = useTranslations("banks")
  const lang = useTranslations()


  //! part of Choose File
  const [File , setFile ] = useState({ name : "No File Chosen" , value: ""  })
  const handleFile = (e) =>{
    const file = e.target.files[0];
    setFile({ value : file ,  name : file.name})
  }


  const user = GetUser()
  const {register , handleSubmit , formState:{errors} , getValues , control , watch , setValue , clearErrors } = useForm({resolver : yupResolver(banksSchema) })
  const [ isLoading ,setIsLoading]  = useState(false)
  const [DataCheckout , setDataCheckout] = useState()
  const navigate = useRouter()



  const [name , setName ] = useState()
  const Submit = handleSubmit( async data => { 
    setIsLoading(true)
    setName(data?.name)
    const formData = new FormData()
    formData.append("type" , "3")  
    formData.append("user_id" ,  user?.user?.id )  
    formData.append("phone" ,  data.phone )  
    formData.append("country" ,  data.country )  
    formData.append("city" ,  data.city )  
    formData.append("address" ,  data.address )  
    formData.append("name" ,  data?.name )  
    // formData.append("title" ,  data.name )  
    // formData.append("postal" ,  data.Zcode )  
    formData.append("postal_code" ,  data.Bcode )  
    formData.append("person" ,  data.person )  
    formData.append("person_title" ,  data.position )  
    formData.append("file" , File?.value)  

    try{
      if(!File?.value) return
      const res = await AXIOS.post("/user/order/import" ,  formData ,{headers:{ "Accept-Language": lang("lang") , Authorization:`Bearer ${user?.token}`}})

      if(res?.data?.message) notification(res?.data?.message , "success")
      if(res?.data?.message == "you must login first !!.") return navigate.push("/sign-in")

      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDataCheckout(res.data.data)
    }
    catch(err){
      const {response} = err ;
      if(response?.data?.message) return notification( response?.data?.message , 'error') 
      notification(t("notification_err") , 'error') 
    } 
    finally{ setIsLoading(false) }
  })


//! region 
  const [load , regions] = useFetch( "/regions" ,"" , "without token")

//! cities 
  const [cities , setCities] = useState()
  const cityWatch = watch("country")

  useEffect(()=>{
    let filter = regions.filter( e => e.id == getValues("country") )
    setCities(filter[0]?.cities)
  },[cityWatch ])


  //! collapse info-bank
  const [showBank , setShowBank] = useState(false)
  const [showCar , setShowCar] = useState(false)


  return (
    <>
    <Alert2 />
    <div className={`people ${DataCheckout ? "hidden" : "block"} `}>
      <BreadCrumbs main={t.raw("breadCrumbs")[0]} slash="/"  second={t.raw("breadCrumbs")[1]} />

      <div className={`container `}>

        <div className={`info-bank ${showBank ? "collapse1" : "" } `}>
            <div className="info-head" onClick={_=> setShowBank(!showBank)} > <CircleChevronUp  className='up'/> <div className="h3-head text-[24px] font-[800] max-md:text-[18px] max-md:font-[500]"> {t.raw("depart")[0]} </div>  </div>

            <form className="inputs" >
            
                  <Input     reg={register('name')}      err={errors.name}     id="name"       label={t.raw("boxes")[0].label}      place={t.raw("boxes")[0].place}     type="text"    />
                  <Phone     reg={register('phone')}     err={errors.phone}    id="phone"      label={t.raw("boxes")[1].label}      place={t.raw("boxes")[1].place}    type="phone"   />
                  
                  {/* <Selection reg={register('country')}   err={errors.country}  id="country"    label={t.raw("boxes")[2].label}      place={t.raw("boxes")[2].place}         lists={regions} />
                  <Selection reg={register('city')}      err={errors.city}     id="city"       label={t.raw("boxes")[3].label}      place={t.raw("boxes")[3].place}         lists={cities}   /> */}
                  
                  <Selection1 setValueHook={setValue} show_search={true} clearErrors={clearErrors} type="country" err={errors.country} id='country' label={t.raw("boxes")[2].label} place={t.raw('boxes')[2].place} lists={regions} />
                  <Selection1 setValueHook={setValue} show_search={true} clearErrors={clearErrors} type="city"    err={errors.city}    id='city'    label={t.raw("boxes")[3].label} place={t.raw('boxes')[3].place} lists={cities} />
                  
                  <Input     reg={register('address')}   err={errors.address}  id="address"    label={t.raw("boxes")[4].label}      place={t.raw("boxes")[4].place}         type="text"  />
                  <Input     reg={register('Zcode')}     err={errors.Zcode}    id="Zcode"      label={t.raw("boxes")[5].label}      place={t.raw("boxes")[5].place}         type="text"   />
                  <Input     reg={register('Bcode')}     err={errors.Bcode}    id="Bcode"      label={t.raw("boxes")[6].label}      place={t.raw("boxes")[6].place}         type="text"   />
                  <Input     reg={register('person')}    err={errors.person}   id="person"     label={t.raw("boxes")[7].label}      place={t.raw("boxes")[7].place} type="text"   />
                  <Input     reg={register('position')}  err={errors.position} id="position"   label={t.raw("boxes")[8].label}      place={t.raw("boxes")[8].place} type="text"   />
            </form>

        </div> <div className="divider"/>



        <div className={`info-car-company  ${showCar ? "collapse2" : "" }  `}>
            <div className="info-head" onClick={_=> setShowCar(!showCar)} > <CircleChevronUp  className='up'/> <div className="h3-head text-[24px] font-[800] max-md:text-[18px] max-md:font-[500]"> {t.raw("depart")[1]} </div>  </div>
            
            <BtnSendFiles setValue={setValue} File={File} label={t.raw("ul")[0]} onClick={handleFile} idDownload="download" idUpload="upload" titleUpload={t.raw("ul")[2]} titleDownload={t.raw("ul")[1]} />
            <span className='green'> {t.raw("ul")[3]} </span>
        </div>


        <ButtonLoad onClick={Submit} isLoading={isLoading} value1={t.raw("button")[0]} value2={ t.raw("button")[1]} />

      </div>
    </div>


      {DataCheckout && <Checkout name={name} type="2" fileName={File.name} data={DataCheckout} />}
    </>
  )
}

export default page

