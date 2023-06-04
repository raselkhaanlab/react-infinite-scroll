import { useEffect, useRef, useState } from 'react'

interface IVolume {
  id: string;
  etag: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string[];
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
  items: IVolume[]
}

export function useFetchData(query: string) {
  const [data, setData] = useState<IVolume[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const abortController = useRef(new AbortController());

  const loadMore = async () => {
    setIsloading(true);
    const maxResults = 10;
    const startIndex = (page - 1) * maxResults;
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      const googleapi = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&startIndex=${startIndex}`;
      const response = await fetch(googleapi, { signal: abortController.current.signal });
      const responseData = await response.json() as unknown as IVolumeResponse;
      const totalPage = Math.ceil(responseData.totalItems / maxResults) || 1;
      if (nextPage <= totalPage) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setData(responseData && responseData.items || []);
    } catch (e) {
      console.log(e);
    } finally {
      setIsloading(false);
    }
  };


  useEffect(() => {
    if (query && page == 1) {
      loadMore();
    }
  }, [page, query]);


  useEffect(() => {
    setPage(1);
  }, [query]);

  return { isLoading, hasMore, loadMore, data, abortController };
}
