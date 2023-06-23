import React from 'react';
import {Auth, Provider} from "../FirebaseConfig.js";
import {signInWithPopup} from "firebase/auth";

const Login = () => {

  const sign =()=>{
    signInWithPopup(Auth, Provider)
    .then(res=>console.log("sign in"))
    .catch(err=>console.log(err));
  }

  return (
    <div className="text-center m-5">
  <p className="text-gray-600">Login here</p>
  <button
    onClick={sign}
    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
  >
    Login with Google
  </button>
</div>

    
  )
}

export default Login