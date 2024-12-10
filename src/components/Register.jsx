import React, { useState } from 'react';
import login_img from "../assets/login-img.avif";   
import user from "../assets/user.avif";
import pass from "../assets/pass.avif";
import gstno from "../assets/gst.avif";
import phone from "../assets/phone.avif";
import role from "../assets/role.avif";
import { MdOutlineArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function Register() {
    const [user,setuser]=useState(""); 
    const [mail,setmail]=useState(""); 
    const [pass,setpass]=useState(""); 
    const [conpass,setconpass]=useState(""); 
    const [role,setrole]=useState("role"); 
    const [mobile,setmobile]=useState("");
    const navigate=useNavigate();
    function submitForm(){
        alert("Your request is on verification");
    }
    return (
        <>
        <div className='h-screen flex justify-center items-center font-popins bg-gray-200'>
            <div className="flex rounded-md shadow-xl w-2/3  h-auto ">
                <div className='bg-white h-auto w-1/2  hidden lg:flex items-center justify-center'> 
                    <img src={login_img} className='h-full w-full object-cover'></img>
                </div>
                <div className='w-full h-auto  lg:w-3/4 justify-center items-center  bg-white'>
                    <button className="text-xs mt-5 ml-5 p-2 rounded-full bg-white shadow flex items-center" onClick={() => navigate('/login')}>
                        <MdOutlineArrowLeft className="mr-1 text-base align-middle" />
                        <span className="leading-none">back</span>
                    </button>
                    <form className=' h-auto w-3/4 mb-5 pl-20 pr-0 pb-0 pt-5'>
                        <div className='text-xl font-extrabold'>Register</div>
                        <br/>
                        <input type="text"  placeholder="Enter name"  value={user}  onChange={(e)=>{setuser(e.target.value);}} className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        <br/>
                        <input type="text"  placeholder="Enter mail" value={mail} onChange={(e)=>{setmail(e.target.value);}}className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        <br/>
                        <input type="text"  placeholder="Enter mobile" value={mobile} onChange={(e)=>{setmobile(e.target.value);}} className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        <br/>
                        <input type="password"  placeholder="Enter password" value={pass} onChange={(e)=>{setpass(e.target.value);}}className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        <br/>
                        <input type="password"  placeholder="Confirm password " value={conpass} onChange={(e)=>{setconpass(e.target.value);}}className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        <br/>
                        <select id="" className='text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2' onChange={(e)=>{setrole(e.target.value)}}>
                            <option value="" >Role</option>
                            <option  value="Admin">Admin</option>
                            <option value="Pharmacist">Pharmacist</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Healthcare Professional">Healthcare Professional</option>
                        </select>
                        {(role === "Pharmacist" || role === "Vendor") && (
                        <input type="text" id="gstno" placeholder="Enter GST Number" className="text-xs pl-3 border border-grey rounded-md h-10 w-full mb-2"/>
                        )}
                        <br/>
                        <div className='flex place-content-evenly'>
                            <button type="button" className="border-black border rounded-sm p-2 w-1/4 hover:bg-green-500 duration-200" onClick={()=>{if(confirm("Your data is being submitted ensure the details once or twice")){submitForm()}}} >Accept </button>
                            <button type="button" className="border-black border rounded-sm p-2 w-1/4  hover:bg-red-500 duration-200" onClick={()=>{if(confirm("Are you sure to decline ? ")){location.reload()}}}>Decline </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register