import React, { useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [toggle, setToggle] = useState(true);

  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="w-full  h-[60px] bg-black">
      <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full">
        <div>
          <img
            className=" w-[50px] h-[50px] rounded-full"
            src="https://media.istockphoto.com/vectors/online-shop-logo-design-template-vector-id1150644423?k=20&m=1150644423&s=612x612&w=0&h=xKnuj3AhBbMAjxnJdT6Mh7o4BDIGaEwyol33tRwG7mU="
            alt="logo"
          />
          {/* <h1 className="text-[#00d8ff] ">E-Dashboard</h1> */}
        </div>
        <div className=" hidden md:flex">
          <ul className="flex text-white items-center">
            {auth ? (
              <>
                <Link to={"/"}>
                  <li>Products</li>
                </Link>
                <Link to={"/add"}>
                  <li>Add Product</li>
                </Link>
                <Link to={"/profile"}>
                  <li>Profile</li>
                </Link>{" "}
              </>
            ) : (
              <></>
            )}

            {auth ? (
              <Link onClick={logOut} to={"/signup"}>
                <li>Logout ({JSON.parse(auth).name}) </li>
              </Link>
            ) : (
              <>
                <Link to={"/signup"}>
                  <li>SignUP</li>{" "}
                </Link>
                <Link to={"/login"}>
                  <li>Login</li>
                </Link>
              </>
            )}
          </ul>
        </div>
        {/* Ham burger */}
        <div className="block md:hidden ">
          {/* <AiOutlineMenu size={30} className="text-white" /> */}
          {toggle ? (
            <AiOutlineMenu
              size={30}
              className="text-white cursor-pointer"
              onClick={() => handleToggle()}
            />
          ) : (
            <AiOutlineClose
              size={30}
              className="text-white cursor-pointer"
              onClick={() => handleToggle()}
            />
          )}
        </div>
        {/* mobile menu */}
        {!toggle ? (
          <div className="  md:hidden w-full  bg-black text-white absolute top-[60px] left-0  flex justify-center text-center">
            <ul className="">
              {auth ? (
                <>
                  <Link to={"/"}>
                    <li>Products</li>
                  </Link>
                  <Link to={"/add"}>
                    <li>Add Product</li>
                  </Link>
                  <Link to={"/profile"}>
                    <li>Profile</li>
                  </Link>{" "}
                </>
              ) : (
                <></>
              )}

              {auth ? (
                <Link onClick={logOut} to={"/signup"}>
                  <li>Logout ({JSON.parse(auth).name}) </li>
                </Link>
              ) : (
                <>
                  <Link to={"/signup"}>
                    <li>SignUP</li>{" "}
                  </Link>
                  <Link to={"/login"}>
                    <li>Login</li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
