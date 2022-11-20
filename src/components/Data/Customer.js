import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customer.css"

export default function Coustemers() {
  const [data, setData] = useState([]);
  const [value,setValue]=useState("")
  const [sortValue,setSortvalue]= useState("")

  useEffect(() => {
    loadCustomer();
  }, []);
  const loadCustomer = async () => {
    return await axios
      .get("https://my-json-server.typicode.com/Ved-X/assignment/orders")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const handleReset =()=>{
    loadCustomer();
  }


  const handleSort = async(e)=>{
    let value = e.target.value;
    setSortvalue(value)
    return await axios.get(`https://my-json-server.typicode.com/Ved-X/assignment/orders?_sort=${value}&_order=asc`)
    .then((res)=>{
        setData(res.data)
        console.log(value)
        setValue("")
    }).catch((err)=>{
        console.error(err)
    })
    }

    const handleFilter = async(e)=>{
        let value = e.target.value;
        setSortvalue(value)
        return await axios.get(`https://my-json-server.typicode.com/Ved-X/assignment/orders?status=${value}`)
        .then((res)=>{
            setData(res.data)
            console.log(value)
            setValue("")
        }).catch((err)=>{
            console.error(err)
        })
        }

  const handleSearch = async(e)=>{
    e.preventDefault();
    return await axios.get(`https://my-json-server.typicode.com/Ved-X/assignment/orders?q=${value}`)
    .then((res)=>{
        setData(res.data)
        console.log(value)
        setValue("")
    }).catch((err)=>{
        console.error(err)
    })


    }
 
  

  return (
    <div className="container">
       <h1 className="heading"> VedX Orders Search Sort Filter</h1>
        <div className="header">
            <form action=""
            onSubmit={handleSearch}
            >
                <input type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">Search</button>
                <button onClick={()=>handleReset}>  Reset  </button>
            </form>
        <span >
        <select 
        onChange={handleFilter}
        value= {sortValue}
        className="btn-grp"
        >
            
            <option>Filter</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
            <option value="Prepared">Prepared</option>

        </select>
       
        </span>
   

        </div>
      <table className="head">
      
        <tr className="detail">
         
          <th>ORDER ID </th>
          <th>CUSTOMER</th>
          <th>ADDRESS</th>
          <th>PRODUCT </th>
          <th>Date Order </th>
          <th>STATUS </th>
          
        </tr>
       
        {data.length === 0 ? (
          <tr>
            <td>
              <h1>No data</h1>
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr className="orderid">
              <th >#{item.order_id}</th>
              <td>{item.customer}</td>
              <td>{item.address}</td>
              <td>{item.product_title}</td>
              <td>{item.date}</td>
              <td><button className="status">{item.status}</button></td>
            </tr>
          ))
        )}
      </table>
      <span>

        <select 
        onChange={handleSort}
        value= {sortValue}
        className="sort"
        >
            
            <option>Sort By</option>
            <option value="date">Date</option>

        </select>
      </span>
    </div>
  );
}
