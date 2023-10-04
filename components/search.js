import React from 'react';
import { useState } from 'react';



const Search = () => {
  const [searching_text, setSearching_text] = useState('');
  console.log('Searching Text: ', searching_text);

  const handleChange = (e) => {
    if(e.target.name === 'searching_text') setSearching_text(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    
  }


  return (
    <div className='col-md-6'>
        <form onSubmit={handleSearchSubmit} className="d-flex">
                <input onChange={handleChange} name='searching_text' className="form-control me-1" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit">
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                    <i className="bi bi-search"></i>
                </button>
            </form>
    </div>
  )
}

export default Search;