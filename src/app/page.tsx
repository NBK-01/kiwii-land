'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { useSpring, animated } from '@react-spring/web'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Loader, X} from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share'
import axios from "axios"

const formSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
})

export default function KiwiiLandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isMobile])

  const gradientProps = useSpring({
    from: { opacity: 0.5 },
    to: { opacity: 1 },
    config: { duration: 1200 },
    loop: { reverse: true },
  })

  const bulletPoints = [
    "It's fun!",
    "It's engaging",
    "It's just for you"
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const res = await axios.post("/api/createWaitlist", {
        method: "POST",
        email: JSON.stringify(values.email),
      })
      toast.success("You're in! Expect updates very soon...")
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.")
    }
    setIsLoading(false)
  }

  const shareUrl = 'https://kiwii.app'
  const title = 'Check out Kiwii - dont miss out on the big reveal'

  const ShareModal = () => (
    <AnimatePresence>
      {isShareModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsShareModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white p-6 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Share Kiwii</h3>
              <button onClick={() => setIsShareModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FacebookShareButton url={shareUrl}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FacebookIcon size={48} round />
                </motion.div>
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <TwitterIcon size={48} round />
                </motion.div>
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={title}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <LinkedinIcon size={48} round />
                </motion.div>
              </LinkedinShareButton>
              <WhatsappShareButton url={shareUrl} title={title}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <WhatsappIcon size={48} round />
                </motion.div>
              </WhatsappShareButton>
              <EmailShareButton url={shareUrl} subject={title} body="Check out this awesome new app!">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <EmailIcon size={48} round />
                </motion.div>
              </EmailShareButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <Toaster richColors position="top-center"/>
      <ShareModal />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0" />

      <animated.div
        style={gradientProps}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-300 to-transparent rounded-full filter blur-3xl z-0"
      />
      <animated.div
        style={gradientProps}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-300 to-transparent rounded-full filter blur-3xl z-0"
      />

      <nav className="sticky top-0 z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <Image src="/kiwi-logo.png" width={40} height={40} alt="Kiwii Logo"/>
            </Link>
            <div className="flex-1" />
            <div className="flex items-center">
            </div>
            <div className="flex-1 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-green-600 hover:text-green-800 transition-colors"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={isMobile ? { opacity: 1 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: isMobile ? 0 : 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                Something Exciting is Coming Your Way!
              </h1>
              <motion.p
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : 0.2 }}
                className="text-xl text-gray-600 mb-2"
              >
                A daily dose of joy awaits. Be the first to experience it.
              </motion.p>
              <motion.p
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : 0.4 }}
                className="text-lg text-gray-500 mb-6"
              >
                Get ready for a new kind of excitement!
              </motion.p>
              <ul className="space-y-4">
                {bulletPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={isMobile ? { opacity: 1 } : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : 0.6 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="mr-2 text-green-500">🥝</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <h2 className="text-3xl font-bold mb-2 text-gray-800">Don&apos;t miss out on the big reveal!</h2>
                  <h1 className="text-sm font-normal mb-6 text-gray-500">Enter your email below to stay updated and secure your spot for early access.</h1>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            disabled={isLoading} 
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    disabled={isLoading} 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {isLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Join Now
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
