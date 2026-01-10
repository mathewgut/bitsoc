import{ useEffect, useState } from "react";


interface Choice {
    title:string,
    shorthand:string,
}


// shorthand is used for text options on small screens and as target ID's to jump to on a page
export default function InnerNav({scrollThreshold,choices}:{scrollThreshold:number,choices:Choice[]} ) {
    const [isSmall, setIsSmall] =  useState<boolean>();
    const [hasPassedThreshold, setHasPassedThreshold] = useState<boolean>(false);

    const navStyles = hasPassedThreshold ?
    "text-center max-w-full text-sm md:text-base lg:max-w-125 flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 rounded-md px-4 py-3"
    :
    "text-center max-w-full md:text-lg lg:max-w-125 flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 rounded-md px-8 py-6"; 

    useEffect(() =>{

        const handlePosChange = () => {
            if (window.scrollY >= scrollThreshold) {
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

    const ScrollToElement = (element: HTMLElement|null) => {
        if(!element) return;
        const navbarHeight = 140; 
        const elementPosition = element.offsetTop - navbarHeight; // set offset when scrolling to element to account for size of navbar
        window.scrollTo({ top: elementPosition, left: 0, behavior: 'smooth' });
    }

    if(!isSmall){
        return(
            <div className={`flex justify-center items-center sticky sm:p-2 top-15 z-30 w-fit backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300 rounded-md`}>
                {choices.map((item, index) =>
                <a onClick={() => ScrollToElement(document.getElementById(item.shorthand.toLowerCase()) ?? null)} aria-label={`${item.shorthand} Navigation button`}>
                    <button data-program className={
                        `${navStyles} ease-in-out duration-300 `}>
                        {item.title}
                    </button>
                </a>
                )}
            </div>
            )

    }

    else if (isSmall){
        return(
            <div className="flex justify-center gap-2 sm:gap-6 mb-4 p-2 -mx-50 rounded-lg flex-wrap sticky top-15 z-30 w-fit hover:cursor-pointer  backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300">
                {choices.map((item, index) =>
                    <a onClick={() => ScrollToElement(document.getElementById(item.shorthand.toLowerCase()) ?? null)} aria-label={`${item.shorthand} Navigation button`}>
                        <button className="text-center font-semibold sm:text-lg w-fit p-2 flex flex-col gap-2 rounded-md hover:bg-gray-200 transition-colors duration-300">
                            {item.shorthand}
                        </button>
                    </a>
                )}
            </div>
           
        )
    }
}