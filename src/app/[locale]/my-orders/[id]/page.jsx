
'use client'
import NoResponsd from '@/atoms/NoRes'
import Responed from '@/atoms/Res'
import { GetUser } from '@/utils/GetUser';
import useFetch from '@/utils/useFetch';
import { useParams } from 'next/navigation';


const page = () => {
  const {id} = useParams()
  const user = GetUser()
  const [load , data]  = useFetch(`/user/order/get/${id}` , user?.token)

  if( data){
    if(data.reply == null) return <Responed order={data} />
    else return <NoResponsd order={data} />
  }

}

export default page
