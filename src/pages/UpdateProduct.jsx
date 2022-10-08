import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [company, setCompany] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
   

    getProductDetails();
  }, [])
  
  const getProductDetails= async()=>{


      let  result=  await fetch(`http://localhost:8000/product/${id}`,{
        headers:{
          authorization: `bearer ${JSON.parse( localStorage.getItem('token') )}`
        }
      })

       result= await result.json();

       setCategory(result.category)
       setCompany(result.company)
       setName(result.name)
       setPrice(result.price)

  }

 


   const updateProduct= async()=>{

     let result= await fetch(`http://localhost:8000/product/${id}`,{
      method:"PUT",
      body:JSON.stringify({name,price,company,category}),
      headers:{
        'Content-Type':"application/json",
        authorization: `bearer ${JSON.parse( localStorage.getItem('token') )}`
      }
     })
     
      result= await result.json()

    console.log(result);
    navigate("/")

   }




  return (
    <div>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Update Product</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />

            

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="price"
              placeholder="Enter product price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
           
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="category"
              placeholder="Enter product category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
           
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="company"
              placeholder="Enter product company"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
            />
            

            <button
              type="submit"
              onClick={updateProduct}
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
