import React from "react";
import HeroSection from "./HeroSection";
import FeatureComponent from "./FeatureComponent";
import HowItWorks from "./HowItWorks";
import OpenSourceSection from "./OpenSourceSection";

export default function Landing() {
  return (
    <div>
      <HeroSection />
      <FeatureComponent />
      <HowItWorks />
      <OpenSourceSection />
    </div>
  );
}
