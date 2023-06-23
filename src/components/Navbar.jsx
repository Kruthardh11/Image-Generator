import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import { Auth } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';

const Navbar = () => {

  const [user] = useAuthState(Auth);

  const navigator = useNavigate()

  const logOut = async () => {
    await signOut(Auth)
    navigator("/")
  }

  return (
    <nav className="bg-purple-800 p-4">
      <div className=" mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center ">
          <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400">
            Image Generator
          </Link>
        </div>
        <div className="flex items-center mr-5">
          <Link
            to="/"
            className="text-white hover:text-gray-200 px-4 py-2 rounded-md hover:text-blue-400 border-2 border-white mx-4"
          >
            Home
          </Link>
          <div className='flex flex-col'>
          {user?  <div className='flex flex-col'><div className=''><img className='w-10 h-10 rounded-lg ml-10' src={user.photoURL} alt="" />  <button onClick={logOut} className="text-white ml-10  hover:text-gray-600  py-2 ">Logout</button></div></div>
            : <Link  to={"/login"} className="text-white hover:text-gray-200 px-4 py-2 rounded-md hover:text-blue-400 border-2 border-white"
            >Login</Link>
            }
            <Link to='/generateimage' className="text-white ml-3 hover:text-gray-200 px-3 py-2 rounded-md hover:text-blue-400 border-2 border-white">
              {user && <div>Generate image</div> }
            </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
