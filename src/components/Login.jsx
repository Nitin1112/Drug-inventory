import React from 'react';
import login_img from "../assets/login-img.avif";   
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate=useNavigate();
    return (
        <>
        <div className='h-screen flex justify-center items-center font-popins bg-gray-200'>
            <div className="flex rounded-md shadow-xl w-2/3  h-4/5 ">
                <div className='bg-white h-full w-1/2  hidden lg:flex items-center justify-center'> 
                    <img src={login_img} className='h-full w-full object-cover'></img>
                </div>
                <div className='w-full lg:w-3/4 flex justify-center items-center  bg-white'>
                    <form className=' h-auto w-3/4'>
                        <div className='text-xl font-extrabold'>Welcome back!</div>
                        <small className='text-xs text-grey-800 mt-0'>Sign-in</small>
                        <br/>
                        <br/>
                        <input type="text" id="user" placeholder='Enter mail or GSTIN' className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        <br/>
                        <input type='password' id="password" placeholder="Enter password" className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        <div className='text-xs py-2 '>
                            <input type="checkbox" id="remember" /><label htmlFor="remember" className='block md:inline'>Remember me</label>
                            <a href='#' className='text-gray-600 lg:float-right'>Forgot your password ?</a>
                        </div>
                        <button className="bg-black text-white rounded-sm p-2 w-full hover:bg-teal-400 duration-200">Sign-In</button>
                        <p className='text-center text-xs py-3 '>-----or------</p>
                        <button type="button" className="border-black border rounded-sm p-2 w-full hover:bg-teal-400 duration-200 hover:border-white" onClick={()=>navigate("/Register")} >Register </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
