import React from 'react';
import { Link } from 'react-scroll';
import me2 from "../assets/me2.jpg"
import Image from 'next/image';

const About = () => {
  return (
    <div id='about' className='text-center w-full md:h-screen flex items-center p-2 py-16'>
      <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
        <div className='col-span-2'>
          <p className='uppercase text-xl font-bold tracking-widest text-[#90185c]'>About</p>
          <h2 className='py-4'>I'm a Full-Stack Web Developer</h2>
          <p className='py-2 text-gray-600'>
            I'm a software developer with over two years of experience building and designing robust web applications. My skills encompass the entire stack, from front-end development using React.js, Next.js, and Tailwind CSS to back-end development with Node.js and GraphQL.  I've developed dynamic UIs, created efficient APIs, implemented scheduled tasks, and managed server-side functionality.  I also have a strong background in integrating AI features, including OpenAI GPT, Gemini AI, and Claude AI, for tasks such as content summarization, AI-generated content, and advanced search functionalities using Vector DB and Pinecone.  My experience includes projects such as Newsraven (featuring AI-powered search and story generation) and Clinasyst (with a focus on dynamic UI and interactive features).
          </p>
          <div className='flex justify-center gap-6'>
            <Link to="projects" spy={true} smooth={true} offset={-50} duration={500}>
              <p className='py-2 text-gray-600 underline cursor-pointer hover:scale-105 ease-in duration-300'>
                Explore my projects
              </p>
            </Link>
            <a href="/resumeAdil.pdf" download>
              <p className='py-2 text-gray-600 underline cursor-pointer hover:scale-105 ease-in duration-300'>
                Download my resume
              </p>
            </a>
          </div>
        </div>
        <div className='p-20'>
          <div className='w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center hover:scale-105 ease-in duration-300'>
            <Image className='rounded-xl' src={me2} alt='/' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;