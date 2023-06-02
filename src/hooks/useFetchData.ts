import React, { useEffect, useState } from 'react'

export const delay = (ms:number) => {
  return new Promise((resovle)=>{
   setTimeout(resovle, ms)
  });
}
export function useFetchData() {
 const [data, setData] = useState<number[]>([]);
 const [isLoading, setIsloading] = useState(true);
 const [hasMore, setHasMore] = useState(false);
 
 const loadMore = ()=> {
  setIsloading(true);
  setHasMore(true);
  delay(3000)
  .then(()=> {
    if(data.length > 75) {
      setHasMore(false);
    } else {
      setData((prev)=> [...prev, ...Array(25).fill(0)])
    }
  })
  .finally(()=>setIsloading(false));
 }

 useEffect(()=>{
  setIsloading(true);
  setHasMore(true);
  delay(1000).then(()=> setData(Array(25).fill(0))).finally(()=>setIsloading(false));
 },[]);
 return {isLoading, hasMore, loadMore, data};
}
