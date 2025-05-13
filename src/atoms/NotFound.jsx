import Image from 'next/image'
import notFound from '@/assets/notFound.png'
import {Link} from '@/navigation';


const NotFound = ({redirect , message , href }) => {
  return (
    <div className="not-found">
      <Image src={notFound} alt='not found' width={200} height={200} />
      <div className="p"> {message} </div>
      <Link className='btn1' style={{margin:"30px 0"}} href={href || '/'}> {redirect} </Link>
    </div>
  )
}

export default NotFound