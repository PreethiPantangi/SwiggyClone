const About = () => {
    return (
        <div className="lg:mx-[10%] p-3 mt-20 flex items-center justify-center">
            <div className="bg-slate-200 p-4 w-1/2 shadow-xl">
                <img 
                    src='https://avatars.githubusercontent.com/u/22561209?v=4' 
                    className='rounded-full w-[40%] m-auto'
                    alt="Preethi Pantangi"
                />
                <div className='text-center mt-2'>
                    <div className='font-bold'>Sai Preethi Pantangi</div>
                    <div>George Mason University</div>
                    <div>Fairfax, Virginia</div>
                </div>
                <div className="flex items-center justify-center mt-3">
                    <a href="https://github.com/PreethiPantangi/" target="_blank" rel="noreferrer" className="mr-3">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            alt="Github"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://linkedin.com/in/preethipantangi" target="_blank" rel="noreferrer" className="mr-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png"
                            alt="LinkedIn"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://pantangisaipreethi3.wixsite.com/portfolio" target="_blank" rel="noreferrer">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/686/686165.png"
                            alt="Portfolio"
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About;
