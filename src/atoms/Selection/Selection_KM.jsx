
"use client"

// import { Select } from "@chakra-ui/react"
import { useTranslations } from "next-intl"

const Selection_KM = ({reg , err , id , label , lists , place  }) => {
  const t = useTranslations()
	
  return (
    <div className="select">
      <label htmlFor={id}> {label} <span>*</span> </label>
      {/* <Select name="country" {...reg}   placeholder={place}  id={id} >
        {
          lists?.map((e,i)=> ( <option key={i}  value={e?.name}> {e?.name || e} </option> ))
        }
      </Select> */}
      <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
}

export default Selection_KM
