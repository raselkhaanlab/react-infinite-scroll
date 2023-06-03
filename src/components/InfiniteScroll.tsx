import { ReactNode, useEffect } from 'react'
import { useIntersecting } from '../hooks/useIntersecting';

interface IInfiniteScrollProps {
    isLoading:boolean,
    hasMore:boolean,
    children:ReactNode,
    loadMoreFunc:()=> void,
    loaderElement?: ReactNode
}
export function InfiniteScroll({
  isLoading,
  hasMore,
  children,
  loadMoreFunc,
  loaderElement
}: IInfiniteScrollProps) {
  
  const { elementRef, isIntersecting} = useIntersecting();
  
  useEffect(()=>{
    if(!isLoading && hasMore && isIntersecting) {
      loadMoreFunc();
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isIntersecting]);
  
  return (
    <>
      {children}
      <div ref={elementRef} style={{minHeight:"20px", display: hasMore? "block":"none"}}>
        {loaderElement ? loaderElement : <span> loading ... </span>}
      </div>
    </>
  );
}

