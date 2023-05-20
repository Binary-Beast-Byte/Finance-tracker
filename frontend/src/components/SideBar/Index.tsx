import React, { useState, useContext } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./NavBarStyles.css";
import { BiBookContent } from "react-icons/bi";
import { SiPhpmyadmin } from "react-icons/si";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft, AiOutlineUserAdd } from "react-icons/ai";
import { BsArrowLeftRight } from 'react-icons/bs'
import { FcMoneyTransfer } from "react-icons/fc";
import { menuContext } from "../../context/MenuContext";


const NavBar = () => {
  const token = 'dffdf'
  //hamBurger Button

  const { hamBurger, setHamBurger }: any = useContext(menuContext); //!define type

  const [dropDown, SetDropDown] = useState(false);
  const handleDropDown = () => {
    SetDropDown(!dropDown);
  };

  const navigate = useNavigate();

  //Route track using useLocation
  const localpath = useLocation();
  const paths = localpath.pathname.split("/");
  const length = paths.length;
  const currentPath = paths[length - 1];

  return (
    <>
      {/* TopNav */}
      <nav
        className={`rounded-r-lg py-3 px-5 z-10 border-b border-gray-200 ${hamBurger ? "ml-24" : "ml-72"
          }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-row-reverse">
            <Link to="/" className="flex items-center space-x-3">
              {/* <img
                src={Logo}
                alt="Logo"
                className="rounded-full shadow-lg w-12 h-12 "
              /> */}
              <h1 className="text-2xl capitalize font-medium font-mono">
                Rebira store
              </h1>
            </Link>
            <button
              onClick={() => setHamBurger(!hamBurger)}
              className="text-white mr-3 text-xl p-2 rounded-md transition-all"
            >
              <BsArrowLeftRight size={30} className="text-gray-700" />
            </button>
          </div>

          <div className="flex items-center">
            {
              token ?
                <button
                  // onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                  Logout
                </button>
                :
                <Link
                  to="/register"
                  className="ml-4 p-2 px-3 bg-blue-500 rounded-full text-white capitalize"
                >
                  create an account
                </Link>
            }

          </div>
        </div>
      </nav>

      {/* BottomNav */}

      {/* SideNav */}
      <div
        className={`fixed top-0 bottom-0 left-0 bg-[#4F46E5] transition-all ${hamBurger ? "w-24" : "w-72"
          }`}
      >
        <div className="logo flex justify-center items-center my-4">
          <h1 className="text-2xl text-white font-bold">
            <Link to="/" className="flex justify-center items-center">
              {hamBurger ? (
                <span className="p-2"><FcMoneyTransfer color='white' size={50} /></span>
              ) : (
                <span className="p-2"> <FcMoneyTransfer color='white' size={70} />
                </span>
              )}
            </Link>
          </h1>
        </div>
        <div className="mx-5">
          <ul>

            <li>
              <NavLink
                to="userpanel"
                className="flex items-center  text-white text-sm py-3 px-2 my-1 rounded-xl hover:bg-red-500"
              >
                <AiOutlineUserAdd className="mx-2 text-xl" />
                {hamBurger ? null : "user panel"}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="coremodel"
                className="flex items-center text-white text-sm py-3 px-2 my-1 rounded-xl hover:bg-red-500"
              >
                <SiPhpmyadmin className="mx-2 text-2xl" />
                {hamBurger ? null : "core model"}
              </NavLink>
            </li>


            <li>
              <NavLink
                to="records"
                className="flex items-center  text-white text-sm py-3 px-2 my-1 rounded-xl hover:bg-red-500"
              >
                <BiBookContent className="mx-2 text-xl" />
                {hamBurger ? null : "records"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${hamBurger ? "ml-[96px]" : "ml-[288px]"
          } transition-all  mt-[64px]`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
