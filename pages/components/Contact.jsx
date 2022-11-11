import Link from "next/link";
import React, {useRef} from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import emailjs from '@emailjs/browser';

const Contact = () => {

    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_d4ngv0h', 'template_0cvm7xm', form.current, 'zuGwnHelKQqZ85lu0')
          .then((result) => {
              console.log(result.text);
              alert("Message Sent!")
          }, (error) => {
              console.log(error.text);
              alert("Failed!!")
          });
          e.target.reset()
      };

  return (
    <div id="contact" className="w-full">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full text-center">
        <p className="text-xl tracking-widest uppercase text-[#90185c] font-bold">
          Contact
        </p>
        <h2 className="py-4">Get In Touch</h2>
        <div className="p-8 grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl">
            <div className="lg:h-full">
              <div className="p-4">
                <img
                  className="w-full h-full rounded-xl hover:scale-105 ease-in duration-200"
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNoYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                  alt="/"
                />
              </div>
              <div>
                <h2 className="py-2">Adil Jaseem</h2>
                <p className="text-[#90185c]">Web Developer</p>
                <p className="py-4">
                  Available for full-time positions. Contact me.
                </p>
              </div>
              <div>
                <h5 className="uppercase pt-5 text-[#90185c] ">
                  Connect With Me
                </h5>
                <div className="flex justify-between items-center p-8">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-5 cursor-pointer hover:scale-110 ease-in duration-300">
                    <Link
                      href="https://www.linkedin.com/in/adil-jaseem-775457231"
                      target="_blank"
                    >
                      <FaLinkedinIn className="text-[#90185c]" />
                    </Link>
                  </div>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-5 cursor-pointer hover:scale-110 ease-in duration-300">
                    <Link
                      href="https://www.instagram.com/adilljaseem"
                      target="_blank"
                    >
                      <FaInstagram className="text-[#90185c]" />
                    </Link>
                  </div>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-5 cursor-pointer hover:scale-110 ease-in duration-300">
                    <AiOutlineMail className="text-[#90185c]" />
                  </div>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-5 cursor-pointer hover:scale-110 ease-in duration-300">
                    <Link href="https://github.com/adeljaseem" target="_blank">
                      <FaGithub className="text-[#90185c]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
            <div className="p-4">
              <form ref={form} onSubmit={sendEmail}>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">Name</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      name="user_name"
                      type="text"
                      required
                    ></input>
                  </div>
                  <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Email</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    name="user_email"
                    type="email"
                    required
                  />
                </div>
                  {/* <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">
                      Phone Number
                    </label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      name="number"
                      type="text"
                    />
                  </div> */}
                </div>
                
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Subject</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    name="subject"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Message</label>
                  <textarea
                    className="border-2 rounded-lg p-3 border-gray-300"
                    rows="10"
                    name="message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full p-4 bg-[#90185c] text-gray-100 mt-4">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <Link href="/">
            <div className="rounded-full shadow-lg shadow-gray-400 p-5 cursor-pointer hover:scale-110 ease-in duration-300">
              <HiOutlineChevronDoubleUp className="text-[#90185c]" size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
