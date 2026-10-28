import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";

export default function Landing(){
    return(
        <div className="border-2 border-blue-300 ">
            <HeroSection />
            <HowItWorks />
        </div>
    )
}