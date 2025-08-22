import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 👀 Debug log
    console.log("Sending payload:", {
      name: data.name,
      email: data.email,
      message: data.message,
    });

    emailjs.send(
      "service_aixp4jm",     // ✅ Service ID
      "template_ijfjcfn",    // ✅ Template ID
      {
        name: data.name,
        email: data.email,
        message: data.message,
      },
      "3gZsX3mq1Q6UMKujI"    // ✅ Correct Public Key
    )
    .then((result) => {
      console.log("✅ Email sent successfully:", result.text);
      setSubmitStatus("success");
      reset();
    })
    .catch((error) => {
      console.error("❌ EmailJS Error:", error);
      setSubmitStatus("error");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Contact Us</h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Your full name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      {/* Email */}
      <input
        type="email"
        placeholder="you@example.com"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      {/* Message */}
      <textarea
        placeholder="Your message..."
        {...register("message", { required: "Message is required" })}
      />
      {errors.message && <p>{errors.message.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>

      {submitStatus === "success" && <p>✅ Message sent successfully!</p>}
      {submitStatus === "error" && <p>❌ Failed to send. Check console logs.</p>}
    </form>
  );
};

export default ContactForm;
