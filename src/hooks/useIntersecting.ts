import { useEffect, useState } from "react";

export const useIntersecting = (elementRef: React.RefObject<Element | null>, options?:IntersectionObserverInit) =>{
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=> {
        console.log(entry.isIntersecting, "is intersect")
        setIsIntersecting(entry.isIntersecting);
      })
    },options);

    if(elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return ()=>{
      observer.disconnect();
    }
  },[elementRef,options]);
  
  return isIntersecting;
};

