'use client'

import Image from "next/image";
import Link from "next/link";
import { Moon,Sun } from 'lucide-react';

import icon from "../../../public/vercel.svg"
import ghicon from "../../../public/github.svg"
import { useTheme } from "@/hooks/useTheme";


export default function Navbar(){
    const {mode, changeMode} = useTheme();
    
    return(
        <nav className="flex justify-between py-6 -mx-44 px-44 border-b border-gray-300">
            {/* first part  */}
                <Link className="flex flex-r items-center gap-2" href="/">
                <Image className="dark:invert" src={icon} alt="shapecrate logomark" width={24} height={24} />
                <span className="font-extrabold text-xl">shapecrate</span>
                </Link>
                
       
            {/* second part  */}
            
                <ul className="flex gap-8 font-semibold text-sm">   
                    <Link href="/components" className="  p-2 rounded-lg transition-colors hover:bg-gray-200 hover:border-gray-200 dark:border-gray-900 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                    <li>Components</li>
                    </Link>
                    <Link href="/docs" className="  p-2 rounded-lg transition-colors hover:bg-gray-200 hover:border-gray-200 dark:border-gray-900 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                    <li>Documentation</li>
                    </Link>
                    <Link href="/open-source" className="  p-2 rounded-lg transition-colors hover:bg-gray-200 hover:border-gray-200 dark:border-gray-900 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                    <li>Open Source</li>
                    </Link>
                </ul>
           
            
            {/* third part  */}
            <div className="flex gap-2 font-semibold text-sm">
                {/* dark and light mode toggle  */}
                <button 
                type="button"
                onClick={() => changeMode(mode === "dark" ? "light" : "dark")}
                className="border border-gray-300 p-2 rounded-md hover:border-black transition-all cursor-pointer dark:border-gray-700 dark:hover:border-white">
                    {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <Link href="https://github.com/Virenishere/shapecrate" target="_blank">
                <button className="flex flex-row border border-gray-300 p-2 rounded-md text-center items-center hover:border-black transition-colors cursor-pointer dark:border-gray-700 dark:hover:border-white">
                    <Image className="dark:invert" src={ghicon} alt="github icon" width={20} height={20}/> <span>GitHub</span>
                </button>
                </Link>
            </div> 
        </nav>
    )
}