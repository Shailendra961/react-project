import { useState } from "react";
import { FiAlignCenter } from "react-icons/fi";
import { NavLink } from "react-router";

const Navigations =()=>
{
    const [toggle,setToggle]=useState(false);
    return(
        <>
        <section className="bg-indigo-500">
            <div className="container mx-auto">
                <div className="flex justify-between px-5 text-white">
                    <div className="uppercase py-3">All Projects</div>
                    <div className="flex items-center">
                        <ul className="hidden md:flex">
                            <li className="mx-2 py-3"><NavLink to="/">Home</NavLink></li>
                            <li className="mx-2 py-3"><NavLink to="/country-flags">Country Flags</NavLink></li>
                        </ul>
                        <div className="cursor-pointer ms-5 flex md:hidden" onClick={()=>setToggle(!toggle)}><FiAlignCenter/></div>
                    </div>
                </div>
                {
                    toggle?<div className="bg-slate-200 py-2"> 
                        <ul className="">
                            <li className="mx-2"><NavLink to="/">Home</NavLink></li>
                            <li className="mx-2"><NavLink to="/country-flags">Country Flags</NavLink></li>
                        </ul>
                    </div>:null
                }
                
            </div>
        </section>
    </>
    )
}
export default Navigations;