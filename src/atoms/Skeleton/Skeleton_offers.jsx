import React from "react";

const Skeleton_offers = ({classN}) => {
  return (
    <div className={"skeleton_brands grid grid-cols-3 w-[93vw]  " + classN}>
    {
      Array.from({length:5}).map((e,i) =>(
            <div key={i} role="status" className="skeleton1 w-full skeleton_card_column mb-4 max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            
              <div className="mb-[15px] h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 "></div>
              <div className="mb-[15px] h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <div className="mb-[15px] h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <div className="mb-[15px] h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>

            </div>
      ))
    }

</div>
  );
};



export const Skeleton_offersOne = ({classN}) => {
  return (
    <div className={"skeleton_brands  w-full min-h-[225px]  " + classN}>

            <div  role="status" className="skeleton1 w-full skeleton_card_column mb-4 max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            
              <div className="mb-[15px] h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 "></div>
              <div className="mb-[15px] h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <div className="mb-[15px] h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <div className="mb-[15px] h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>

            </div>

</div>
  );
};

export default Skeleton_offers;
