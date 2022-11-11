import React from 'react'
import { Link } from 'react-scroll'

const About = () => {
  return (
    <div id='about' className=' text-center w-full md:h-screen flex items-center p-2 py-16'>
          <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
            <div className='col-span-2'>
                <p className='uppercase text-xl font-bold tracking-widest text-[#90185c]'>About</p>
                <h2 className='py-4'>I'm a Web Developer</h2>
                <p className='py-2 text-gray-600'>I have 6 months of experience in building and designing web applications based in Kochi, India.
                <br/>Currently, I love to work on web applications using technologies like React Js, Tailwind, Angular Js, Next Js etc.</p>
                <Link to="projects" spy={true} smooth={true} offset={-50} duration={500}><p className='py-2 text-gray-600 underline cursor-pointer hover:scale-105 ease-in duration-300'>Check out some of my latest projects.</p></Link>
            </div>
            <div className='p-20'>
              <div className='w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center  hover:scale-105 ease-in duration-300'>
                <img className='rounded-xl' src='https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2Vic2l0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60' alt='/'/>
              </div>
            </div>
          </div>
    </div>
  )
}

export default About