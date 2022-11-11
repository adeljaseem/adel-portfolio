import React from 'react'
import Image from 'next/image'

const Skills = () => {
  return (
    <div id='skills' className='text-center w-full lg:h-screen p-2'>
        <div className='max-w-[1240px] mx-auto flex flex-col justify-center h-full'>
            <p className='text-xl tracking-widest uppercase font-bold text-[#90185c]'>Skills</p>
            <h2 className='py-4'>What I Can Do</h2>
            <div className='p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8'>

                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/html.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>HTML</h3>
                        </div>
                    </div>
                </div>
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/css.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>CSS</h3>
                        </div>
                    </div>
                </div>
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/javascript.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>Javascript</h3>
                        </div>
                    </div>
                </div>
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/tailwind.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>Tailwind</h3>
                        </div>
                    </div>
                </div>
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/react.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>React Js</h3>
                        </div>
                    </div>
                </div>
                
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/nextjs.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>Next Js</h3>
                        </div>
                    </div>
                </div>
                
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/node.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>Node Js</h3>
                        </div>
                    </div>
                </div>
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/github1.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>Github</h3>
                        </div>
                    </div>
                </div>
                <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300'>
                    <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                        <div className='m-auto'>
                            <Image src='/./assets/skills/mongo.png' width='64' height='64' alt='/'/>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3>Mongo Db</h3>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
  )
}

export default Skills