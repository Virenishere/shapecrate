import Image from "next/image";

import img from "../../../public/vercel.svg"
export default function Navbar(){
    return(
        <nav className="flex justify-between border-1 border-red-400">
            {/* first part  */}
            <div className="flex items-center ">
                <Image className="dark:invert h-[14px] w-4" src={img} alt="shapecrate logomark" width={16} height={14} />
                <span>shapecrate</span>
            </div>
            {/* second part  */}
            <div className="">
                <ul className="flex">   
                    <li>Components</li>
                    <li>Documentation</li>
                    <li>Open Source</li>
                </ul>
            </div>
            
            {/* third part  */}
            <div >
                <button>toggle mode</button>
                <button>github</button>
            </div> 
        </nav>
    )
}