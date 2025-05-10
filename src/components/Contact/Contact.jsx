import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/rajdhani";
import "@fontsource/rajdhani/400.css";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Start loading

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error("All fields are required. Please fill in all fields.");
      setIsLoading(false);  // Stop loading
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);  // Stop loading
      return;
    }

    // Web3 form submission logic
    const form = new FormData(e.target);
    form.append("access_key", "d0467132-dda7-40a6-b1cc-3d0e3d8269b4");

    const object = Object.fromEntries(form);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Thank you! Your message has been sent.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      toast.error("Sorry! Failed to send message.");
    }
    setIsLoading(false);  // Stop loading
  };

  return (
    <section className="container mx-auto px-10 py-10 border border-grey-50 rounded-xl my-5 font-[Rubik]">
      <div className="text-center md:text-left">
        <div className="flex items-center gap-5 md:gap-10">
          <h2 className="text-[20px] md:text-[30px] font-bold text-black font-[Rajdhani]">GET IN TOUCH</h2>
          <svg className="w-20 h-5 text-gray-300" viewBox="0 0 120 10" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill="currentColor" />
            <line x1="5" y1="5" x2="115" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="115" cy="5" r="5" fill="currentColor" />
          </svg>
        </div>
        {/* <h1 className="text-[30px] md:text-[40px] font-extrabold mt-3 font-[Rajdhani]">Elevate your brand with a the</h1>
        <p className="mt-4 text-[10px] md:text-[16px] text-gray-500 max-w-2xl mx-auto md:mx-0 font-[Rubik]">
          Finished fact that a reader will be distracted by the readable content of a page when looking at its layout. 
        </p> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="sr-only">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              placeholder="Your Name"
              className="placeholder-gray-600 text-[16px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
              maxlength="50"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="Your Email"
              className="placeholder-gray-600 text-[16px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
              maxlength="50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              id="phone"
              placeholder="Phone Number"
              className="placeholder-gray-600 text-[16px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
              maxlength="15"
            />
          </div>
          <div>
            <label htmlFor="subject" className="sr-only">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              id="subject"
              placeholder="Subject"
              className="placeholder-gray-600 text-[16px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
              maxlength="100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="sr-only">Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            id="message"
            placeholder="Your Message"
            className="placeholder-gray-600 text-[16px] w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
            maxlength="1000"
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={isLoading}  // Disable button when loading
          className="w-full bg-[#ff014f] text-white text-lg font-bold py-3 rounded-3xl transition-all duration-300 hover:bg-[#d9003c] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> {/* Spinner icon */}
              Sending...
            </>
          ) : (
            <>
              Send <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            </>
          )}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default Contact;
