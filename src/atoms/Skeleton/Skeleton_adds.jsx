import React from "react";

const Skeleton_adds = () => {
  return (
            <div  role="status" className="skeleton1 justify-center skeleton_card_raw mb-4 max-w-sm p-4  rounded animate-pulse md:p-6 ">
              <div className="avatar-parent flex items-center mt-4">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
              </div>
            </div>

  );
};


export const Skeleton = ({classname}) => {
  return (
        <div  role="status" className="animate-pulse container ">
          {/* <div className="h-[100px] bg-gray-200 mt-3 mb-6 rounded" ></div> */}
          <div className=" h-[300px] max-md:h-[200px] w-full flex items-center mt-4">
            <svg className=" object-contain p-[30px] w-full h-full bg-gray-100 text-gray-300 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
          </div>
        </div>
  );
};
export const SkeletonText = ({classname}) => {
  return (
        <div  role="status" className=" animate-pulse ">
          <div className=" w-full flex flex-col  gap-[15px] ">
            <div className="h-[15px] bg-gray-200  rounded" ></div>
            <div className="h-[15px] bg-gray-200  rounded" ></div>
            <div className="h-[15px] bg-gray-200  rounded" ></div>
            <div className="h-[15px] bg-gray-200  rounded" ></div>
            <div className="h-[15px] bg-gray-200  rounded" ></div>
            <div className="h-[15px] bg-gray-200  rounded" ></div>
            <div className="h-[15px] bg-gray-200  rounded" ></div>

          </div>
        </div>
  );
};

export const Rows = ({number}) => {
  return (
        Array.from({length : number}).map((e,i)=>(
          <div  key={i} role="status" className="animate-pulse mt-[30px] container ">
          <div className="h-[60px] bg-gray-200 mt-3  rounded" ></div>
          <div className="h-[100px] bg-gray-200 mt-2  rounded" ></div>
        </div>
        ))
  );
};
export const OrderSkelton = ({number}) => {
  return (
    <div className="container">
        {Array.from({length : number}).map((e,i)=>(
          <div  key={i} role="status" className="animate-pulse mt-[30px] flex flex-row justify-between items-center ">
            
            <div className="w-full">
              <div className="h-[25px] w-[300px] bg-gray-200 mt-3  rounded" ></div>
              <div className="h-[25px] w-[150px] bg-gray-200 mt-2  rounded" ></div>
            </div>

            <div className="h-[25px] w-[25px] bg-gray-200 mt-2  rounded" ></div>
        </div>
        ))}
        </div>
  );
};

export default Skeleton_adds;
