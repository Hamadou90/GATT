import React from 'react'
import users from '../usersData/users';
import { useState } from 'react';
import Table from '../components/table';
import { useEffect } from 'react';
// import Search from '../components/search';

const Searching_page = () => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const previousPage = _ => {
        if(currentPage !== 1)
            setCurrentPage(currentPage - 1);
    }
    const nextPage = () => {
        if(currentPage !== npage)
            setCurrentPage(currentPage + 1);
    }
    const changeCurrentPage = (number) => {
        setCurrentPage(number);
    }


    // const keys = ['first_name', 'last_name', 'email'];

    // const searchFunction = data => data.filter(datum => datum.first_name.toLowerCase().includes(query) || datum.last_name.toLowerCase().includes(query) || datum.email.toLowerCase().includes(query));
    // // Best way of doing the above code:
    // const searchFunction = data => data.filter(datum => keys.some(key => datum[key].toLowerCase().includes(query)));

    useEffect(() => {
      const fetchUsersData = async () =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/usersDataAPI?q=${query}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          })
          let response = await res.json();

        console.log('Res: ', response.result);

        setUsers(response.result)
      }

      if(query.length === 0 || query.length > 2)
        fetchUsersData();
    }, [query])
    
    
    console.log("Users = ", users);
    console.log("Query: ", query);

    

  return (<>
    <div style={{marginTop: '150px', marginLeft: '30%'}}>
        <h1>Searching Page:</h1>
            {/* <Search /> */}
            <input type="text" onChange={(e) => setQuery(e.target.value)} name="search" placeholder='Search...' className='search' />
            {/* <ul className='list'>
                {(users).filter(user => user.first_name.toLowerCase().includes(query)).map((user, index) => {
                  return  <li key={user.id} className='listItem'>{user.first_name}</li>
                })}
            </ul> */}
            <div className="col-7 mt-2">
                {/* <Table data={searchFunction(users)} /> */}
                {/* <Table data={users} /> */}
                <Table data={records} />
            </div>
            {/* <div className="col-4">
    <div className="list-group" id="list-tab" role="tablist">
      <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Home</a>
      <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Profile</a>
      <a className="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Messages</a>
      <a className="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Settings</a>
    </div>
  </div> */}

    </div>

        {/* Pagination Section Start */}
            <nav className='col-5 offset-3'>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={previousPage}>Prev</a>
                    </li>
                    <div className='w-[50vw] d-flex overflow-y-hidden overflow-x-auto'>
                        {numbers.map((n, i) => 
                            <li className={`page-item over ${currentPage === n? 'active': ''}`} key={i}>
                                <a href="#" className="page-link" onClick={() => changeCurrentPage(n)}>{n}</a>
                            </li>
                        )}
                    </div>
                        <li className="page-item"><a href="#" className="page-link" onClick={nextPage}>Next</a></li>
                </ul>
            </nav>
        {/* Pagination Section End */}
    </>
  )
}

export default Searching_page;