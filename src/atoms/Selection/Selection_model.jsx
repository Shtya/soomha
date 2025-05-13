
"use client"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"

const Selection_model = ({reg , err , id , label , lists , place ,onClick }) => {
  const t = useTranslations()

  return (
    <div className="select">
      <label htmlFor={id}> {label} <span>*</span> </label>
      <div className="inner-select">
        <select name="country" {...reg}  placeholder={place}  id={id} onClick={onClick}  >  
          <option key={0} > {place} </option> 
          { lists?.map((e,i)=> ( 
            <option key={i}  value={e?.id}> {e?.name} </option> 
            )) }</select>
        <ChevronDown />
      </div>
      <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
}

export default Selection_model
