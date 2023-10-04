import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";

const MultiSelect = () => {
    const [users, setUsers] = useState([]);
  const laptopList = [
    {
      label: "HP",
      value: 250000,
    },
    {
      label: "SamSung",
      value: 300000,
    },
    {
      label: "Asus",
      value: 450000,
    },
    {
      label: "MacBook Air M2",
      value: 950000,
    },
  ];

  const [laptopName, setLaptopName] = useState();

  const handleChange = e => {
    console.log('Received element: ', e);y
    setLaptopName(Array.isArray(e)? e.map(datum => datum.value) : []);
  }


  console.log("Users received: ", users);

  useEffect(() => {
    const fetchUsers = async () => {
      let allUsers = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Users/getAllUsers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      let response = await allUsers.json();
      console.log("The Response of FetchUsers:", response.result);
      setUsers(response.result);
    };

    

    // Function calls
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Multi-Select Components for Test of the Library</h2>
      <Select options={laptopList} isMulti onChange={handleChange}></Select>
      <center>
        <b>Selected Laptop(s): <h3 style={{color: "red"}}>{laptopName}</h3>  </b>
      </center>

      <Select options={users}></Select>
    </div>
  );
};

export default MultiSelect;
