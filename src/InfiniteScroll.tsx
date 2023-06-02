import { ReactNode, useEffect, useRef } from 'react'
import { useIntersecting } from './hooks/useIntersecting';

interface IInfiniteScrollProps {
    isLoading:boolean,
    hasMore:boolean,
    children:ReactNode,
    loadMoreFunc:()=>unknown,
    loader?:ReactNode
}
export function InfiniteScroll({
  isLoading,
  hasMore,
  children,
  loadMoreFunc,
  loader
}: IInfiniteScrollProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersecting(elementRef);

  useEffect(()=>{
    if(isIntersecting && !isLoading && hasMore) {
      loadMoreFunc();
    }
  },[isIntersecting, isLoading, hasMore]);
  
  return (
    <>
      {children}
      <div ref={elementRef} style={{display : hasMore ? "block":"none"}}>
        {loader ? loader : <span style={{margin:"0 auto"}}>Loading...</span>}
      </div>
    </>
  );
}

