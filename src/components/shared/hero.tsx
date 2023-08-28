import { Main, Sub } from '@/lib/fonts'
import React from 'react'
import Image from 'next/image'
import { WaitlistForm } from "@/components/shared/forms"


const Hero = () => {
  return (
    <>
    <div className="container">
      <div className="flex flex-col py-44">
        <h1 style={Main.style} className="text-5xl mx-auto text-center leading-tight font-medium">
           One easy platform to handle your <br/> productized-service agency
        </h1>
        <p className="text-lg text-neutral-400 mx-auto max-w-2xl text-center mt-5" style={Sub.style}>
            Control your subscription based agency all in one dashboard, give your clients their own dashboards too for a smooth & async workflow for everyone
        </p>
        <div className="mx-auto items-center">
          <WaitlistForm/>
        </div>
      </div> 
    </div>

    <Image src="/grad-kiwii.png" className="absolute top-[455px] mx-auto -z-10" width={2000} height={1200} alt=""/>
    </>
  )
}

export default Hero
