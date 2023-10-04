import React from 'react'
import users from '../usersData/users';
import { useState } from 'react';
import Table from '../components/table';
import { useEffect } from 'react';

const Pagination2 = ({usersreceived, currentPage, firstIndex, lastIndex, records, npage, numbers, previousPage, nextPage, changeCurrentPage}) => {

    const [query, setQuery] = useState("");
    const [users, setUsers] = useState(usersreceived);
    console.log('Pagination 2, usersreceived: ', usersreceived);

    // const [currentPage, setCurrentPage] = useState(1);
    // const recordsPerPage = 5;
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    // const records = usersreceived.slice(firstIndex, lastIndex);
    // const npage = Math.ceil(usersreceived.length / recordsPerPage);
    // const numbers = [...Array(npage + 1).keys()].slice(1);

    // const previousPage = _ => {
    //     if(currentPage !== 1)
    //         setCurrentPage(currentPage - 1);
    // }
    // const nextPage = () => {
    //     if(currentPage !== npage)
    //         setCurrentPage(currentPage + 1);
    // }
    // const changeCurrentPage = (number) => {
    //     setCurrentPage(number);
    // }


    // const keys = ['first_name', 'last_name', 'email'];

    // const searchFunction = data => data.filter(datum => datum.first_name.toLowerCase().includes(query) || datum.last_name.toLowerCase().includes(query) || datum.email.toLowerCase().includes(query));
    // // Best way of doing the above code:
    // const searchFunction = data => data.filter(datum => keys.some(key => datum[key].toLowerCase().includes(query)));





    // useEffect(() => {
    //   const fetchUsersData = async () =>{
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/usersDataAPI?q=${query}`,
    //     {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" }
    //       })
    //       let response = await res.json();

    //     console.log('Res: ', response.result);

    //     setUsers(response.result)
    //   }

    //   if(query.length === 0 || query.length > 2)
    //     fetchUsersData();
    // }, [query])
    
    
    console.log("Users = ", usersreceived);
    console.log("Query: ", query);

    


  return (
     <nav className='col-5 offset-3'>
        <ul className="pagination">
            <li className="page-item">
                <a href="#" className="page-link" onClick={previousPage}>Prev</a>
            </li>
            <div className='w-[50vw] d-flex overflow-y-hidden overflow-x-scroll'>
                {numbers.map((n, i) => 
                    <li className={`page-item over ${currentPage === n? 'active': ''}`} key={i}>
                        <a href="#" className="page-link" onClick={() => changeCurrentPage(n)}>{n}</a>
                    </li>
                )}
            </div>
                <li className="page-item"><a href="#" className="page-link" onClick={nextPage}>Next</a></li>
        </ul>
    </nav>
  )
}

export default Pagination2;