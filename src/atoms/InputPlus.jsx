import { useTranslations } from 'next-intl'
import React from 'react'

const InputPlus = ({classn ,label , id , type , place , err_star, reg , err , icon}) => {
  const t = useTranslations()
  
  return (
    <div className='input-plus'>
      <label htmlFor={id} > {label} <span  className={err_star} >*</span> </label>
      <div className="group">
        {icon}
        <input className={`input2 ${classn}`}  {...reg} type={type}  placeholder={place} id={id}  />
      </div>
      <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
}

export default InputPlus