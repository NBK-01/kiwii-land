"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {Loader} from "lucide-react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { cache, useState } from "react"
import React from "react"
// import {prisma} from "@/lib/prisma"
import { createWaitlist } from "@/lib/createWaitlist"
import axios from "axios";


const formSchema = z.object({
  email: z.string().email({message: ""}),
 
})


export function WaitlistForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const res = await axios.post("/api/createWaitlist", {
      method: "POST",
      email: JSON.stringify(values.email),
   })
   
    setIsLoading(false)
    toast.success("You're in! Expect updates very soon...")
    
    return res
  }

  return (
    <>
      <Toaster richColors position="top-center"/>    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row max-w-4xl items-center space-x-2 space-y-3 md:space-y-0">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem className="mt-7">
                <FormControl>
                <Input disabled={isLoading} className="md:w-[400px] w-[280px] py-5" placeholder="hello@kiwii.com" {...field} />
                </FormControl>
                <FormDescription>
                  Join the waitlist to get early-access and benefits!
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button disabled={isLoading} className="my-auto" size="lg">
              {isLoading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Join
            </Button>
        </form>
    </Form>
    </>
  )
}
