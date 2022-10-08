import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



   useEffect(() => {
   
     const  auth=localStorage.getItem("user");
     if(auth){
      navigate("/")
     }

   }, [])
   




  const collectData = async () => {

     if(!email || !password || !name){
         alert("please fill the data")
     }else{

     

    let result = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
  
  localStorage.setItem("user", JSON.stringify(result.result) )
  localStorage.setItem("token", JSON.stringify(result.auth) )
    if (result) {
      navigate("/");
    }
  }
  };

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Register</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
            
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="submit"
              onClick={collectData}
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-gray-400 text-grey-dark"
                href="/"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-gray-400 text-grey-dark"
                href="/"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue-400"
              href="/login"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
