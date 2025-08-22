import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_aixp4jm';
    const templateId = 'template_dsfrseo';
    const publicKey = 'W_g8xgkNLhgZITS77';

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'gowrav',
      message: message,
      reply_to: email,
    };

    console.log("Sending params:", templateParams);

    emailjs.send(serviceId, templateId, templateParams, publicKey) // 👈 ensure this is send, not sendForm
      .then((response) => {
        console.log('✅ Email sent!', response);
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('❌ Error sending email:', error);
        setStatus('Failed to send. Try again later.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <textarea
        rows="5"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition-colors"
      >
        Send Email
      </button>
      {status && <p className="mt-2 text-center text-sm">{status}</p>}
    </form>
  );
};

export default EmailForm;
