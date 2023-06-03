import { useCallback, useEffect, useRef, useState } from 'react'

interface IVolume {
  id:string;
  etag:string;
  volumeInfo: {
    title:string;
    authors: string [];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string [];
    language: string;
    previewLink: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    }
  }
}
interface IVolumeResponse {
  totalItems: number;
  items: IVolume []
}

export function useFetchData(query: string) {
 const [data, setData] = useState <IVolume[]>([]);
 const [isLoading, setIsloading] = useState(false);
 const [hasMore, setHasMore] = useState(false);
 const [page, setPage] = useState(0);
 const abortController = useRef(new AbortController());

 const loadMore = async ()=> {
  setIsloading(true);
  setHasMore(false);
  const maxResults= 10;
  const startIndex = (page)*maxResults;
  setPage(page + 1);
  try {
    const googleapi = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&startIndex=${startIndex}`;
    const response = await fetch(googleapi, {signal: abortController.current.signal});
    const responseData =await response.json() as unknown as IVolumeResponse;
    const totalPage = Math.ceil(responseData.totalItems/maxResults) || 1;
    if( page + 1 < totalPage ) {
      setHasMore(true);
    }
    setData(responseData && responseData.items || []);
  } catch (e){
    console.log(e);
  } finally {
    setIsloading(false);
  }
};

 useEffect(()=>{
  if(query && page < 1 && data.length < 1) {
    loadMore();
  }
 },[page, data]);



 useEffect(()=>{
    setData([]);
    setPage(0);
 },[query]);

 return {isLoading, hasMore, loadMore, data, abortController};
}
