import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const ProjectItem = ({title, bgImg, projectUrl, projectCode}) => {
  return (
    <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4 group hover:bg-gradient-to-r from-[#b50b6b] to-[#f25eb2]'>
    <Image className='rounded-xl group-hover:opacity-10' src={bgImg} alt='/'/>
    <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <h3 className='text-2xl text-white -tracking-wider text-center'>{title}</h3>
      <p className='pb-4 pt-2 text-white text-center'>React JS</p>
      <div className='flex flex-cols justify-between gap-3'>
        <Link href={projectUrl ?? ''} target="_blank">
          <p className='text-center py-3 px-5 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer'>Demo</p>
        </Link>
        <Link href={projectCode ?? ''} target="_blank">
          <p className='text-center py-3 px-6 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer'>Code</p>
        </Link>
      </div>
    </div>
</div>
  )
}

export default ProjectItem