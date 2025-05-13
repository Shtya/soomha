"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import Input, { Phone }         from '@/atoms/Input'
import Selection, { Selection1 }     from '@/atoms/Select'
import Radio         from '@/atoms/Radio'
import Spin          from '@/atoms/Spin'
import {  useEffect, useState } from 'react'

//! validation
import { useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import { companiesSchema } from '@/validation/companiesSchema'
import { notification } from '@/utils/notification'
import { AXIOS } from '@/config/axios'
import { CircleChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { GetUser } from '@/utils/GetUser'
import { useRouter } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import BtnSendFiles from '@/atoms/BtnSendFiles'
import Checkout from '@/components/Checkout_banks'
import Alert2 from '@/atoms/Alert2'



const page = () => {
  const t = useTranslations("companies")
  const box = t.raw("boxes")
  const lang = useTranslations()


  //! part of Choose File
  const [File , setFile ] = useState({ name : "No File Chosen" , value: ""  })
  const handleFile = (e) =>{
    const file = e.target.files[0];
    setFile({ value : file ,  name : file.name})
  }


  const user = GetUser()
  const {register , handleSubmit , formState:{errors} , getValues , control , watch , setValue , clearErrors } = useForm({resolver : yupResolver(companiesSchema) })
  const [ isLoading ,setIsLoading]  = useState(false)
  const [DataCheckout , setDataCheckout] = useState()
  const navigate = useRouter()




  const [name , setName ] = useState()
  const Submit = handleSubmit( async data => { 
    setIsLoading(true)
    setName(data?.name)
    const formData = new FormData()
    formData.append("type" , "2")  
    formData.append("user_id" ,  user?.user?.id )  
    formData.append("phone" ,  data.phone )  
    formData.append("country" ,  data.country )  
    formData.append("city" ,  data.city )  
    formData.append("address" ,  data.address )  
    formData.append("postal_code" ,  data.Bcode )  
    formData.append("name" ,  data.name )  
    formData.append("purpose" ,  data.active )  
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



  //! cloapse info-bank
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
              
                    <Input     reg={register('name')}       err={errors.name}     id="name"     label={box[0].label}   place={box[0].place}   type="text"    />
                    <Phone     reg={register('phone')}      err={errors.phone}    id="phone"    label={box[1].label}   place={box[1].place}  type="phone"   />
                    {/* 
                    <Selection reg={register('country')}    err={errors.country}  id="country"  label={box[2].label}   place={box[2].place}  lists={regions} />
                    <Selection reg={register('city')}       err={errors.city}     id="city"     label={box[3].label}   place={box[3].place}  lists={cities}   /> */}
                    
                    <Selection1 setValueHook={setValue} show_search={true} clearErrors={clearErrors} type="country" err={errors.country} id='country' label={box[2].label} place={box[2].place} lists={regions} />
                    <Selection1 setValueHook={setValue} show_search={true} clearErrors={clearErrors} type="city"    err={errors.city}    id='city'    label={box[3].label} place={box[3].place} lists={cities} />
                                      
                    
                    <Input     reg={register('address')}    err={errors.address}  id="address"  label={box[4].label}   place={box[4].place}  type="text"  />
                    <Input     reg={register('Zcode')}      err={errors.Zcode}    id="Zcode"    label={box[5].label}   place={box[5].place}  type="text"   />
                    <Input     reg={register('Bcode')}      err={errors.Bcode}    id="Bcode"    label={box[6].label}   place={box[6].place}  type="text"   />
                    <Input     reg={register('person')}     err={errors.person}   id="person"   label={box[7].label}   place={box[7].place} type="text"   />
                    <Input     reg={register('position')}   err={errors.position} id="position" label={box[8].label}   place={box[8].place}  type="text"   />
                    <Radio     reg={register('active')}     err={errors.active}   id="active"   label={box[9].label}  values={box[9].place}  />
              </form>
          </div>

          <div className="divider"/>

          <div className={`info-car-company  ${showCar ? "collapse2" : "" }  `}>
              <div className="info-head" onClick={_=> setShowCar(!showCar)} > <CircleChevronUp  className='up'/> <div className="h3-head text-[24px] font-[800] max-md:text-[18px] max-md:font-[500]"> {t.raw("depart")[1]}  </div>  </div>
              <BtnSendFiles setValue={setValue} File={File} label={t.raw("ul")[0]} onClick={handleFile} idDownload="download" idUpload="upload" titleUpload={t.raw("ul")[2]} titleDownload={t.raw("ul")[1]} />
              <span className='green'> {t.raw("ul")[3]} </span>
          </div>

            {
              isLoading   
                ? <button className="btn1 disabled" disabled={true} >  {t.raw("button")[1]}   <Spin />  </button>
                : <button className='btn1' onClick={Submit}  > {t.raw("button")[0]}  </button>
            }
        </div>
      </div>

      {DataCheckout && <Checkout name={name} type="3" fileName={File.name} data={DataCheckout} />}
    </>
  )
}

export default page