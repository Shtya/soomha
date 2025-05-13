// import { Textarea } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React from 'react'

const Text = ({label , id , err_star  , place , reg , err}) => {
  const t = useTranslations()
  return (
    <div className='textarea'>
      {label &&<label htmlFor={id} > {label} <span className={err_star}>*</span> </label>}

      {/* <Textarea className='input2'   {...reg}   placeholder={place} id={id}  /> */}
      <textarea className='input2' {...reg} cols={200}  placeholder={place} id={id}  />
      <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
  )
}

export default Text