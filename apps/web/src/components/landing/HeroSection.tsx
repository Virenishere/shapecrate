"use client";

import { ArrowRight } from 'lucide-react';


export default function HeroSection(){
    return(
        <section className='flex'>
            <div>
                
                <div className="border border-(--line) rounded-2xl flex items-center">
                    <span className="bg-(--lime) rounded-2xl py-1 px-2 font-medium text-sm">New</span>
                    <span>Built for copy, paste, and ship</span>
                    <span><ArrowRight /></span>
                </div>

                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div></div>
        </section>
    )
}