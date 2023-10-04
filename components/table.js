import React from 'react'

const Table = ({data}) => {
  return (
    <table className='table table-bordered table-responsive table-striped'>
        <tbody>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
            </tr>

            {data.map(datum => 
                <tr key={datum.id}>
                <td>{datum.first_name}</td>
                <td>{datum.last_name}</td>
                <td>{datum.email}</td>
            </tr>
                
                )}
        </tbody>
    </table>
  )
}

export default Table;