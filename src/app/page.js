"use client"
import HeroSection from './components/hero'
import 'animate.css'
import Load from "./components/loader"
import WhoWeAreSection from "./components/who"
import WhyChooseUsSection from "./components/why"

export default function Home() {
  return (
    <>
    <Load/>
    <HeroSection/>
    <WhoWeAreSection/>
    <WhyChooseUsSection/>
    </>
  )
}
