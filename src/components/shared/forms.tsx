"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
  email: z.string().email({message: ""}),
 
})

export function WaitlistForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-4xl items-center space-x-2">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem className="mt-7">
                <FormControl>
                <Input className="w-[400px] py-5" placeholder="hello@kiwii.com" {...field} />
                </FormControl>
                <FormDescription>
                  Join the waitlist to get early-access and benefits!
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit" size="lg" className="my-auto">Submit</Button>
        </form>
    </Form>
  )
}
