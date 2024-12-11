import React from 'react'
import ProjectItem from './ProjectItem'
import hima from '../assets/projects/hima.png'
import demorest from '../assets/projects/demorest.png'
import rest from '../assets/projects/rest.png'
import ravenapp from '../assets/projects/ravenapp.png'
import weatherapp from '../assets/projects/weatherapp.png'
import tradingapp from '../assets/projects/tradingapp.png'


const Projects = () => {

  return (
    <div id='projects' className='w-full'>
      <div className='max-w-[1240px] mx-auto px-2 py-16 text-center'>
        <p className='text-xl tracking-widest font-bold uppercase text-[#90185c]'>Projects</p>
        <h2 className='py-4'>What I've Built</h2>
        <div className='p-8 grid md:grid-cols-2 gap-8'>
          <ProjectItem title='Restaurant' bgImg={ravenapp} projectUrl='https://www.ravenapp.org/home' projectCode={false} toolsUsed="React Js, Node Js, Hasura, PostgreSQL" />
          <ProjectItem title='PeakStays' bgImg={hima} projectUrl='https://peak-stays.netlify.app/' projectCode='https://github.com/adeljaseem/travelapp-peakstays.git' toolsUsed='React Js' />
          <ProjectItem title='Demo Restaurant App' bgImg={demorest} projectUrl='https://demo-restaurant-app.netlify.app/' projectCode={false}  toolsUsed='React Js' />
          <ProjectItem title='Restaurant' bgImg={rest} projectUrl='https://restaurants-free.netlify.app/' projectCode='https://github.com/adeljaseem/restaurant.git'  toolsUsed='React Js' />
          <ProjectItem title='Restaurant' bgImg={weatherapp} projectUrl='https://weather-app-6239.netlify.app/' projectCode={false}  toolsUsed='React Js' />
          <ProjectItem title='Restaurant' bgImg={tradingapp} projectUrl='https://trading-app001.netlify.app/' projectCode={false}  toolsUsed='React Js' />
          
        </div>
      </div>
    </div>
  )
}

export default Projects

