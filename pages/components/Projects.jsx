import React from 'react'
import ProjectItem from './ProjectItem'
import hima from '../assets/projects/hima.png'
import netf from '../assets/projects/netf.png'
import rest from '../assets/projects/rest.png'


const Projects = () => {
  return (
    <div id='projects' className='w-full'>
        <div className='max-w-[1240px] mx-auto px-2 py-16 text-center'>
            <p className='text-xl tracking-widest font-bold uppercase text-[#90185c]'>Projects</p>
            <h2 className='py-4'>What I've Built</h2>
            <div className='p-8 grid md:grid-cols-2 gap-8'>
                
               <ProjectItem title='PeakStays' bgImg={hima} projectUrl='https://peak-stays.netlify.app/' projectCode='https://github.com/adeljaseem/travelapp-peakstays.git'/>
               <ProjectItem title='Netflix-Dupe' bgImg={netf} projectUrl='https://netflix-dupe.netlify.app/' projectCode='https://github.com/adeljaseem/netflix.git'/>
               <ProjectItem title='Restaurant' bgImg={rest} projectUrl='https://restaurants-free.netlify.app/' projectCode='https://github.com/adeljaseem/restaurant.git'/>
            
            </div>
        </div>
    </div>
  )
}

export default Projects

