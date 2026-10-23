'use client'

import Image from "next/image";
import Link from "next/link";
import { Moon,Sun,Menu  } from 'lucide-react';

import icon from "../../../public/vercel.svg"
import ghicon from "../../../public/github.svg"
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";


export default function Navbar(){
    const {mode, changeMode} = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    

    return(
        <nav className="flex justify-between py-6 -mx-44 px-44 border-b border-(--line)">
            {/* first part  */}
                <Link className="flex flex-r items-center gap-2" href="/">
                <Image className="dark:invert" src={icon} alt="shapecrate logomark" width={24} height={24} />
                <span className="font-extrabold text-xl">shapecrate</span>
                </Link>
                
       
            {/* second part  */}
            
                <ul className="flex gap-8 font-semibold text-sm text-(--ink-2)">
                    <Link href="/components" className="p-2 rounded-lg transition-colors hover:bg-(--surface-2) hover:border-(--line) hover:text-(--ink)">
                    <li>Components</li>
                    </Link>
                    <Link href="/docs" className="p-2 rounded-lg transition-colors hover:bg-(--surface-2) hover:border-(--line) hover:text-(--ink)">
                    <li>Documentation</li>
                    </Link>
                    <Link href="/open-source" className="p-2 rounded-lg transition-colors hover:bg-(--surface-2) hover:border-(--line) hover:text-(--ink)">
                    <li>Open Source</li>
                    </Link>
                </ul>
           
            
            {/* third part  */}
            <div className="flex gap-2 font-semibold text-sm">
                {/* dark and light mode toggle  */}
                <button 
                type="button"
                onClick={() => changeMode(mode === "dark" ? "light" : "dark")}
                className="border border-(--line) p-2 rounded-md hover:border-(--ink) transition-all cursor-pointer">
                    {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <Link href="https://github.com/Virenishere/shapecrate" target="_blank">
                <button className="flex flex-row border border-(--line) p-2 rounded-md text-center items-center hover:border-(--ink) transition-colors cursor-pointer">
                    <Image className="dark:invert" src={ghicon} alt="github icon" width={20} height={20}/> <span>GitHub</span>
                </button>
                </Link>
            </div> 

            {mobileMenuOpen && (
                <div>
                    <Menu />
                </div>
            )}
        </nav>
    )
}