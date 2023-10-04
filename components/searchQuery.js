import React from 'react'
import { useState } from 'react';

const SearchQuery = ({users}) => {
  const [searching_text, setSearching_text] = useState('');
  console.log('Searching Text: ', searching_text);

  const handleChange = (e) => {
    if(e.target.name === 'searching_text') setSearching_text(e.target.value);
  };
  const handleSearchSubmit = () => {

  }

  return (
    <div>
        <form >
            <div onSubmit={handleSearchSubmit} className="form-floating mb-3 d-flex">
                <input onChange={handleChange} name='query' type="search" className="form-control form-control" id="floatingInput" placeholder="Search Query" />
                <label htmlFor="floatingInput">Search Query</label>
            </div>
        </form>

        {/* <div className="col-3">
        {(users).filter(user => user.first_name.toLowerCase().includes(query)).map((user, index) => {
                  return  <li key={user.id} className='listItem'>{user.first_name}</li>
                })}

          <div className='justify-content-center'>Items here</div>
          <div className='justify-content-center'>Items here</div>
          <div className='justify-content-center'>Items here</div>
        </div> */}
    </div>
  )
}

export default SearchQuery;