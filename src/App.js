import React, { useEffect, useState } from 'react';

function App() {
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserList = () => {
      setLoading(true);
      fetch(`https://reqres.in/api/users?per_page=${perPage}&page=${page}`)
        .then(res => res.json())
        .then(res => {
          setTotalPages(res.total_pages);
          setUserList([...userList, ...res.data]);
          setLoading(false);
        });
    }
    getUserList();
  }, [page]);
  console.log(userList)

  return (
    <div className="App">
      <h3>Load more pagination in React - by <a href="https://sreerajsree.vercel.app/" target="_blank">Sreeraj S</a></h3>
      {userList.map((item, key) => {
        return <div key={key} className="box">
          <img src={item.avatar} />
          <div className="name">{item.first_name} {item.last_name}</div>
          <div className="email">{item.email}</div>
        </div>
      })}
      <div className="clearfix"></div>
      {totalPages !== page && <button className="btn-load-more" onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>}
    </div>
  );
}

export default App;
