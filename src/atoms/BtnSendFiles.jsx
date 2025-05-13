'use client'
import React from 'react'
import { useTranslations } from "next-intl";

const BtnSendFiles = ({ label, idDownload, idUpload, titleUpload, titleDownload, onClick, File }) => {
  
  const lang = useTranslations();
  const exportUrl = `https://api.soomha.net/export/${lang("lang") === 'ar' ? 'ar' : 'en'}`;

  return (
    <>
      <label> {label} <span>*</span> </label>

      <div className="btns">
        <label htmlFor={idDownload} className='choose-file'>
          <a href={exportUrl} target='_blank' rel="noopener noreferrer" download id={idDownload}>
            {titleDownload}
          </a>
        </label>

        <label htmlFor={idUpload} className='choose-file'>
          <button>{titleUpload}</button>
          <input onChange={onClick} type="file" accept=".xlsx" id={idUpload} />
        </label>

        <span className='no-file-chosen'> {File?.name} </span>
      </div>
    </>
  )
}

export default BtnSendFiles;