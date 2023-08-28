import React from 'react'
import { Card } from '../ui/card'
import { CardHeader } from '../ui/card'
import { CardContent } from '../ui/card'
import Image  from "next/image"

const ClientCard = () => {
  return (
   <h1> TEST TEST </h1>
  )
}


const AgencyCard = () => {
   return (
     <h1> TEST </h1>
   )
}

export const HeroCardGrid = () => {
  return (
    <div className="grid grid-cols-12 container gap-x-8 py-24">
      <div className=" col-span-6"> 
          <AgencyCard/>
      </div>
      <div className=" col-span-6"> 
          <AgencyCard/>
      </div>
    </div>
  )
}

