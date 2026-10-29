import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import OpenSourceSection from "./OpenSourceSection";

export default function Landing(){
    return(
        <div>
            <HeroSection />
            <HowItWorks />
            <OpenSourceSection />
        </div>
    )
}