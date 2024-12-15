import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import me from "../assets/me.jpg";

const Main = () => {
  return (
    <div id="home" className="w-full md:h-screen bg-cover text-center">
      <div className="max-w-[1240px] w-full h-screen mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase text-sm tracking-widest text-gray-600 mt-20">
            LET'S BUILD SOMETHING TOGETHER
          </p>
          <h1 className="py-4 text-gray-700">
            Hi, I'm <span className="text-[#90185c]"> Adil</span>
          </h1>
          <div className="flex justify-center items-center w-[240px] h-auto m-auto">
            <Image
              className="rounded-full shadow-lg shadow-gray-400 hover:scale-110 ease-in duration-300"
              src={me}
              alt="/"
            />
          </div>
          <p className="py-4 text-gray-600 max-w-[70%] m-auto">
          I'm a full-stack web developer with expertise in both front-end and back-end technologies. I build and design exceptional digital experiences, focusing on responsive web applications and leveraging my skills in frameworks like React.js, Node.js, and GraphQL.
          </p>
          <div className=" flex items-center justify-between max-w-[330px] m-auto py-4">
            <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
              <Link href="https://www.linkedin.com/in/adil-jaseem-775457231" target="blank">
                <FaLinkedinIn className="text-[#90185c]" />
              </Link>
            </div>
            <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
              <Link href='https://github.com/adeljaseem' target="blank"><FaGithub className="text-[#90185c]" /></Link>
            </div>
            {/* <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
              <AiOutlineMail className="text-[#90185c]" />
            </div> */}
            <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
              <Link href='https://www.instagram.com/adelljaseem' target='_blank'><FaInstagram className="text-[#90185c]" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
