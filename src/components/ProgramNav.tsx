import { Scroll } from "lucide-react";
import React, { useEffect, useState } from "react";


// legacy of inner nav built for program page
export default function ProgramNav() {
    const [isSmall, setIsSmall] =  useState<boolean>();
    const [hasPassedThreshold, setHasPassedThreshold] = useState<boolean>(false);

    const programNavStyles = hasPassedThreshold ?
    "text-center max-w-full text-sm md:text-base lg:max-w-125 flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 rounded-md px-4 py-3"
    :
    "text-center max-w-full md:text-lg lg:max-w-125 flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 rounded-md px-8 py-6"; 

    useEffect(() =>{

        const handlePosChange = () => {
            if (window.scrollY >= 850) {
                console.log("scrolled past threshold");
                setHasPassedThreshold(true);
            } else {
        
                setHasPassedThreshold(false);
            }
        }

        window.addEventListener("scroll", handlePosChange);

        const handleResize = () => {
            
            if(window.innerWidth < 748){
                setIsSmall(true);
            
            }
            else{
                setIsSmall(false);
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => {window.removeEventListener('resize', handleResize);  window.removeEventListener("scroll", handlePosChange);}
    }, [window.onresize]
    )

    const ScrollToElement = (element: HTMLElement|null, small?: boolean) => {
        if(!element) return;
        const navbarHeight = small ? 140 : 200; // Adjust to your navbar height
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({ top: elementPosition, left: 0, behavior: 'smooth' });
    }

    if(!isSmall){
        return(
            <div className={`flex justify-center items-center sticky sm:p-2 top-18 z-30 w-fit backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300 rounded-md`}>
                <a onClick={() => ScrollToElement(document.getElementById("IMD") ?? null, isSmall)} aria-label="IMD Navigation button">
                    <article data-program className={
                        `${programNavStyles} ease-in-out duration-300 `}>
                        <h3>Interactive Multimedia and Design (IMD)</h3>
                    </article>
                </a>
                <a onClick={() => ScrollToElement(document.getElementById("NET") ?? null, isSmall)} aria-label="NET Navigation button">
                    <article data-program className={
                         `${programNavStyles} ease-in-out duration-300 `}>
                        <h3>Network Technology (NET)</h3>
                    </article>
                </a>
                <a onClick={() => ScrollToElement(document.getElementById("IRM") ?? null, isSmall)} aria-label="IRM Navigation button">
                    <article data-program className={
                         `${programNavStyles} ease-in-out duration-300 `}>
                    <h3>Information Resource Management (IRM)</h3>
                    </article>
                </a>
                <a onClick={() => ScrollToElement(document.getElementById("OSS") ?? null, isSmall)} aria-label="OSS Navigation button">
                    <article data-program className={
                         `${programNavStyles} ease-in-out duration-300 `}>
                        <h3>Optical Sensors and Systems (OSS)</h3>
                    </article>
                </a>
        </div>
        )
    }

    else if (isSmall){
        return(
            <div className="flex justify-center gap-2 sm:gap-6 mb-4 -mx-50 rounded-lg flex-wrap sticky top-20 z-30 w-fit ">
                <a onClick={() => ScrollToElement(document.getElementById("IMD") ?? null, isSmall)} aria-label="IMD Navigation button">
                    <article className="text-center sm:text-lg p-4 w-fit flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300">
                        <h3 className="font-semibold">IMD</h3>
                    </article>
                </a>
                <a onClick={() => ScrollToElement(document.getElementById("NET") ?? null, isSmall)} aria-label="NET Navigation button">
                    <article className="text-center  sm:text-lg p-4 w-fit flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300">
                        <h3 className="font-semibold">NET</h3>
                    </article>
                </a>
                <a onClick={() => ScrollToElement(document.getElementById("IRM") ?? null, isSmall)} aria-label="IRM Navigation button">
                    <article className="text-center sm:text-lg p-4  w-fit flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300">
                        <h3 className="font-semibold">IRM</h3>
                    </article>
                </a>
                <a onClick={() => ScrollToElement(document.getElementById("OSS") ?? null, isSmall)} aria-label="OSS Navigation button">
                    <article className="text-center sm:text-lg p-4 max-w-125 flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300">
                        <h3 className="font-semibold">OSS</h3>
                    </article>
                </a>
            </div>
        )
    }
}