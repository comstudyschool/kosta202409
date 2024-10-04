import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data); // 데이터는 response.data 안에 들어있습니다.
        setLoading(false); // 로딩 상태를 false로 변경합니다.
      })
      .catch(error => {
        setError(error); // 오류 발생시 error 상태를 설정합니다.
        setLoading(false); // 로딩 상태를 false로 변경합니다.
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 API 호출을 실행합니다.

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data && data.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;