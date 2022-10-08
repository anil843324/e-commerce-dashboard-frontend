import React, { useEffect } from "react";
import { useState } from "react";
import {MdDelete} from "react-icons/md"

import { Link } from "react-router-dom"

 import {BiEdit} from "react-icons/bi"
const Products = () => {
  const [products, setProducts] = useState([]);

   
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/products",{
      headers:{
        authorization: `bearer ${JSON.parse( localStorage.getItem('token') )}`
      }
    });

    result = await result.json();

    setProducts(result);
  };

   const productDelete= async(id)=>{

      let result= await fetch(`http://localhost:8000/product/${id}` ,{
        method:"DELETE",
        headers:{
          authorization: `bearer ${JSON.parse( localStorage.getItem('token') )}`
        }
      });

       result= await result.json();
      if(result){
         getProducts()
      }


   }
 
    const searchProduct= async(event)=>{

       let key=event.target.value
       if(key){

          let result= await fetch(`http://localhost:8000/search/${key}`,{
            headers:{
              authorization: `bearer ${JSON.parse( localStorage.getItem('token') )}`
            }
          })
           result=await result.json();
           setProducts(result);

       }else{

         getProducts();
       }




    }



  return (
    <div className="w-[97%]">

      <div className="grid place-items-center mt-5 mb-5">

      <h1 className="mb-2 mt-2" > Products List</h1>
       
      <input type="text"  onChange={ searchProduct } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
       
      </div>
     

      <div className="h-screen ">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Company
                      </th>
                      
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Operation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    { products.length>0 ? products.map((ele, index) => (
                      <tr className="bg-white border-b" key={ele._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          ₹ {ele.price}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.category}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.company}
                        </td>

                        <td   className="text-sm flex gap-3  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            
                          <MdDelete className="cursor-pointer" onClick={ ()=> { productDelete(ele._id)} } size={25}/>

                       <Link to={`/update/${ele._id}`}>
                       <BiEdit className="cursor-pointer" size={25}/>
                       </Link>
                          
                        </td>
                      </tr> 
                    )) : <div > <h1 className="grid place-items-center">Not Found 😔</h1> </div> }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
