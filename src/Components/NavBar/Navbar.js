import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImHome } from 'react-icons/im'
import { FaUserPlus } from 'react-icons/fa'
import { IoMdLogIn } from 'react-icons/io'
import { AiFillCaretDown } from 'react-icons/ai'
import { AiFillMessage } from 'react-icons/ai'
import { BiNetworkChart } from 'react-icons/bi'
import { getAuth, signOut } from 'firebase/auth';
import ContextProvider from "../context/ContextProvider";
import Darkmode from '../DarkMode/Darkmode'
function Navbar() {
  const auth = getAuth();
  console.log(auth);
  const { darkMode , profileData , userInformation } = useContext(ContextProvider);
  const [showDropDown, setShowDropDown] = useState(false);
  const handleLogout = () => {
    if (auth.currentUser) {
      signOut(auth)
        .then(() => {
          alert("logout")
          localStorage.removeItem('st-hub')
        })
        .catch((err) => { console.log(err) })
    } else {
      alert("already logout")
    }
    setShowDropDown(false)
  }
  useEffect(()=>{
   userInformation(); 
  },[])
  const showAndHideDropDown =()=>{
    showDropDown ? setShowDropDown(false) : setShowDropDown(true)
  }
  return (
    <>
      <nav className={`nav  border-b flex flex-wrap items-center justify-between px-4 shadow ${darkMode ? 'bg-slate-900 text-white' : "bg-white"}`}>
        <div className="flex flex-no-shrink items-center lg:ml-24 sm:ml-10 py-3 text-grey-darkest">
          <h1 className="leading-none text-2xl font-medium text-grey-darkest">
            <Link className="no-underline text-grey-darkest hover:text-black" to="/">
              <span className='text-yellow-500 px-2 mx-0.5'>Students</span><span className='bg-yellow-400 rounded px-2 py-1.5'>Hub</span>
            </Link>
          </h1>
        </div>
        <Darkmode/>
        <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
        <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" htmlFor="menu-btn">
          <span className="navicon bg-grey-darkest flex items-center relative"></span>
        </label>
        <ul className='menu'>
          <input className="px-7 py-1 border-2 border-yellow-300 md:w-auto text-slate-700 shadow-sm  rounded-lg m-2 active:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 " placeholder="Search..." type="text" />
        </ul>
        <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">

          {auth.currentUser ? (<>
            <li className="border-t md:border-none">
              <Link to="/" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"> <ImHome size="30" color='gold' className='inline lg:block mx-2' /><span className='text-sm font-medium'>My Feed</span></Link>
            </li>

            <li className="border-t md:border-none">
              <Link to="/connections" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><BiNetworkChart size="30" color='gold' className='inline lg:block mx-2 lg:mx-6' /> <span className='text-sm font-medium'>Connections</span> </Link>
            </li>

            <li className="border-t md:border-none">
              <Link to="/messages" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><AiFillMessage size="30" color='gold' className='inline lg:block mx-2 lg:mx-5' /><span className='text-sm font-medium'>Messages</span></Link>
            </li>
            <li className="border-t md:border-none flex md:block">
              <Link to="/profile" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">
                <img src={profileData.profileImg || 'https://www.w3schools.com/howto/img_avatar.png '} alt="" className='w-7 rounded-full border-2 border-gray-400 inline lg:block' />
                <span className='text-sm mx-2 lg:-mx-1.5 font-medium' id="menu-button" aria-expanded="true" aria-haspopup="true">Profile</span>
              </Link>
                <AiFillCaretDown className='inline cursor-pointer -ml-3 mt-0' aria-expanded="true" aria-haspopup="true" onClick={showAndHideDropDown} />
                {showDropDown ? (<>
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                      {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                      <Link to="/editProfile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</Link>
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                      <Link to='/nitpatna' className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">License</Link>
                      <Link to="/login" onClick={handleLogout} className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</Link>
                      <button onClick={showAndHideDropDown} className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">close</button>
                    </div>
                  </div>

                </>) : null}
            </li>
          </>) : (
            <>
              <li className="border-t md:border-none">
                <Link to="/signup" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><FaUserPlus size="30" color='gold' className='inline lg:block mx-2 lg:mx-1' /><span className='text-sm'>Join</span></Link>
              </li>
              <li className="border-t md:border-none">
                <Link to="/login" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><IoMdLogIn size="30" color='gold' className='inline lg:block mx-2 lg:mx-1' /><span className='text-sm'>Login</span></Link>
              </li>
            </>
          )}
        </ul>

      </nav>
    </>

  )
}

export default Navbar
