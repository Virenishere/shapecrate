import Image from "next/image";
import Link from "next/link";
import { Moon,Sun } from 'lucide-react';

import icon from "../../../public/vercel.svg"
import ghicon from "../../../public/github.svg"


export default function Navbar(){
    return(
        <nav className="flex justify-between py-6 -mx-44 px-44 border-b border-gray-300">
            {/* first part  */}
                <Link className="flex flex-r items-center gap-2" href="/">
                <Image className="dark:invert" src={icon} alt="shapecrate logomark" width={24} height={24} />
                <span className="font-bold text-xl">shapecrate</span>
                </Link>
                
       
            {/* second part  */}
            
                <ul className="flex gap-8 font-medium text-sm ">   
                    <Link href="/components" className=" hover:bg-gray-200 border-1 border-[#fbfbfa] hover:border-gray-200 rounded-lg p-2 transition-colors">
                    <li>Components</li>
                    </Link>
                    <Link href="/docs" className=" hover:bg-gray-200 border-1 border-[#fbfbfa] hover:border-gray-200 rounded-lg p-2 transition-colors">
                    <li>Documentation</li>
                    </Link>
                    <Link href="/open-source" className=" hover:bg-gray-200 border-1 border-[#fbfbfa] hover:border-gray-200 rounded-lg p-2 transition-colors">
                    <li>Open Source</li>
                    </Link>
                </ul>
           
            
            {/* third part  */}
            <div className="flex gap-2 text-sm">
                {/* dark and light mode toggle  */}
                <button className="  border border-gray-300 p-2 rounded-md hover:border-black transition-colors cursor-pointer">
                    <Moon size={20}/>
                    {/* <Sun /> */}
                </button>

                <Link href="https://github.com/Virenishere/shapecrate" target="_blank">
                <button className="flex flex-row border border-gray-300 p-2 rounded-md text-center items-center hover:border-black transition-colors cursor-pointer">
                    <Image src={ghicon} alt="github icon" width={20} height={20}/> <span>GitHub</span>
                </button>
                    </Link>
            </div> 
        </nav>
    )
}