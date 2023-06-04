import { useEffect, useState } from 'react';
import './App.css';

import { useFetchData } from './hooks/useFetchData';
import { InfiniteScroll } from './components/InfiniteScroll';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);
  const { isLoading, hasMore, loadMore, data } = useFetchData(debounceQuery || "");
  const [volumes, setVolumes] = useState(data);

  useEffect(() => {
    if (!debounceQuery) {
      setVolumes([]);
    }
  }, [debounceQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumes([]);
    setQuery(e.currentTarget.value);
  }

  useEffect(() => {
    setVolumes((prev) => Array.from(prev.concat(data)))
  }, [data]);

  return (
    <>
      <p>React infinite scroll</p>
      <input value={query} onChange={handleChange} />
      {query && <p> Search query: {query}</p>}

      {isLoading && query && <p>Searching for : {query} ......</p>}
      <InfiniteScroll
        loadMoreFunc={loadMore.bind(null, query)}
        hasMore={hasMore && volumes.length > 0}
        isLoading={isLoading}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
          {
            volumes.map((item, index) => {
              return <div
                key={item.id + index}
                style={{ height: 200, width: 300, outline: "1px solid green", margin: "2px", outlineOffset: "4px" }}>
                <img src={item?.volumeInfo?.imageLinks?.thumbnail || item?.volumeInfo?.imageLinks?.smallThumbnail} alt={item?.volumeInfo?.imageLinks?.thumbnail || item?.volumeInfo?.imageLinks?.smallThumbnail} style={{ display: "block", height: "100%", width: "100%" }} />
              </div>
            })
          }
        </div>
      </InfiniteScroll>
    </>
  )
}

export default App
