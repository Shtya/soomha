
import Image from 'next/image'
  import logo from '@/assets/logo.png'
  
  const Loading = () => {
	return (
	  <div className="  bg-gray-100  fixed flex justify-center items-center w-screen h-screen top-0 left-0 right-0 z-[1000000000000] ">
        <Image className='animate-pulse object-contain w-[300px] h-[300px] max-md:w-[150px] max-md:h-[150px] ' src={logo} alt='logo' width={300} height={300} />
	  </div>
	);
  };
  
  export default Loading;




  