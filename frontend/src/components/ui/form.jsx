import React from "react"
import { useForm } from "react-hook-form"
import emailjs from "emailjs-com"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const ContactForm = () => {
  const form = useForm()

  const onSubmit = (data, e) => {
    e.preventDefault()

    emailjs
      .send(
        "service_aixp4jm",      // ✅ Your Gmail Service ID
        "template_ijfjcfn",     // ✅ Your Template ID
        data,                   // ✅ Form data: { name, email, message }
        "TI8MO4DpP8pwrWi6V"       // 🔑 Replace with your EmailJS Public Key
      )
      .then(() => {
        alert("✅ Message sent successfully!")
        form.reset()
      })
      .catch((err) => {
        console.error("EmailJS Error:", err)
        alert("❌ Failed to send message. Try again.")
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Your message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
