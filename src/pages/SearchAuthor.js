import React from 'react';
import axios from 'axios';

const SearchAuthor = () => {
  const [data, setData] = useState(null);

  const q = useSearchParams()[0].get('q');
  const page = useSearchParams()[0].get('page');
  const navigate = useNavigate();

  useEffect(async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await axios.get(`${serverUrl}/search/books?q=${q}&page=${page}`);
    console.log(res.data);
    setData(res.data);
  }, [q, page])

  return (
    <div>
      {data &&
        data.docs.map(book => (
          <div key={book.key} onClick={() => navigate(`/books/${book.key}`)}>
            <h3>{book.title}</h3>
            <h4>{book.author_name ? book.author_name[0] : 'Anonymous'}</h4>
            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i || '-1'}-M.jpg`} alt="" />
          </div>
        ))
      }
    </div>
  )
}

export default SearchAuthor