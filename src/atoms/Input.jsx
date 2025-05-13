import { useTranslations } from 'next-intl'
import React from 'react'

const Input = ({label , id , disabled , cn , cnInput , type , place , err_star, reg , err}) => {
  const t = useTranslations()
  return (
    <div className={`Input ${cn}`}>
      <label htmlFor={id} > {label} <span  className={err_star} >*</span> </label>
      <input disabled={disabled} className={` disabled:!bg-[#FAFAFA] disabled:!border-[#D6D6D6] input2 font-[500] placeholder:!text-[#909090] ${cnInput}`} {...reg} type={type}  placeholder={place} id={id}  />
      <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
}


export const Phone = ({label , id , cn , cnInput , type , place , err_star, reg , err}) => {
  const t = useTranslations()
  return (
    <div className={`Input ${cn} `}>
      <label htmlFor={id} > {label} <span  className={err_star} >*</span> </label>
      <div className={`relative ${cnInput} `} >
        <input maxLength={15}  className='input2  font-[500] placeholder:!text-[#909090] ' {...reg} type={type}  placeholder={place} id={id}  />
        {/* <span className='absolute top-[50%] mt-[1px] translate-y-[-50%] rtl:right-[10px] ltr:left-[10px] text-[18px] text-[#3e64f3] opacity-80 font-[500] ' > +966 </span> */}
      </div>
      <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
}

export default Input