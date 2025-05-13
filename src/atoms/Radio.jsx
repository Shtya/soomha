
import { useTranslations } from "next-intl"

export default function Radio({ id ,label , values , reg , err ,classn }) {
  const t = useTranslations()

  return (
    <div className="radio">
      <label htmlFor={id}> {label} <span>*</span> </label>
      <div className={`radio-values ${classn}`} >
        {values && values?.map((e,i) => (
              <div key={i} className="custom-circle mx-[10px]">
                <input value={e.value} type="radio" id={id+i} {...reg} />
                <label htmlFor={id+i}> {e.name} </label>
            </div>
          ))
        }
        </div>
        <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
  
}


export  function Radio2({ id ,label , values , reg , err ,classn , setShow }) {
  const t = useTranslations()

  return (
    <div className="radio">
      <label htmlFor={id}> {label} <span>*</span> </label>
      <div className={`radio-values ${classn}`} >
        {values && values?.map((e,i) => (
              <div key={i} className="custom-circle mx-[10px]">
                <input onChange={(e => setShow(e.target.value))} value={e.value} type="radio" id={id+i} name="group-spray" />
                <label htmlFor={id+i}> {e.name} </label>
            </div>
          ))
        }
        </div>
        <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
  
}
