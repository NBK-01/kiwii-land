import { Main, Sub } from '@/lib/fonts'
import React from 'react'
import Image from 'next/image'
import { WaitlistForm } from "@/components/shared/forms"
import { Badge } from '../ui/badge'

const Hero = () => {
  return (
    <>
    <div className="container">
      <div className="flex flex-col md:py-44 py-20">
        <h1 style={Main.style} className="lg:text-5xl text-xl mx-auto text-center leading-tight font-medium">
			Something Exciting is Coming Your Way!
        </h1>
        <p className="text-md text-neutral-400 mx-auto max-w-4xl text-center mt-5" style={Sub.style}>


		Imagine each day with a little extra excitement—a moment that brightens your day and keeps you coming back for more. We're crafting an experience that does just that, and we can't wait to share it with you.


        </p>
        <div className="mx-auto items-center">
          <WaitlistForm/>
        </div>
      </div> 
    </div>

    </>
  )
}

export default Hero
