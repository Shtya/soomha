import { AXIOS } from '@/config/axios'
import { GetUser } from '@/utils/GetUser'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'



const ModalComponent = ({setOpen , open , id}) => {

      const t = useTranslations('modal')
      const navigate = useRouter()
      const user = GetUser()

      
      const close = ()=>{ setOpen(prev => !prev) }
      
      const Delete = ()=>{
            AXIOS.get(`/user/order/destroy/${id}` , {headers:{Authorization:`Bearer ${user?.token}`}}  )
            setTimeout(() => {
                  window.location.href = "/my-orders" 
            }, 1000);
      }

  return (
    open && <div className='modal'>
      <div className="overlay" onClick={close}></div>
      <div className="modal-box">
            <div className="title"> <span>{t('title')}</span> <X  onClick={close}/> </div>
            <div className="desc"> {t('desc')} </div>
            <div className="btns">
                  <button onClick={Delete}  type="button" className="btn1"> {t('cancel')} </button>
                  <button onClick={close} className="btn1"> {t('confirm')} </button>
            </div>
      </div>
    </div>
  )
}

export default ModalComponent