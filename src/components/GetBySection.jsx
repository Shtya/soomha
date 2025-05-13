'use client'
import { GetUser } from '@/utils/GetUser'
import useFetch from '@/utils/useFetch'
import React from 'react'

const GetBySection = ({type}) => {
  const user = GetUser()
  const [load , data] = useFetch(`/website/sections/get/${type}` , "dd")

  return (
    <>
        <div className="h1-head yellow"> {data?.title}  </div>
        <div className="p-head text-center"> {data?.content}  </div>
    </>
  )
}

export default GetBySection