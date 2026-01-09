import{ useEffect, useState } from "react";


interface Choice {
    title:string,
    shorthand:string,
}


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

    const ScrollToElement = (element: HTMLElement|null, small?: boolean) => {
        if(!element) return;
        const navbarHeight = small ? 140 : 200; // Adjust to your navbar height
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({ top: elementPosition, left: 0, behavior: 'smooth' });
    }

    if(!isSmall){
        return(
            <div className={`flex justify-center items-center sticky sm:p-2 top-18 z-30 w-fit backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300 rounded-md`}>
                {choices.map((item, index) =>
                <a onClick={() => ScrollToElement(document.getElementById(item.shorthand) ?? null, isSmall)} aria-label={`${item.shorthand} Navigation button`}>
                    <article data-program className={
                        `${navStyles} ease-in-out duration-300 `}>
                        <h3>{item.title}</h3>
                    </article>
                </a>
                )}
            </div>
            )

    }

    else if (isSmall){
        return(
            <div className="flex justify-center gap-2 sm:gap-6 mb-4 -mx-50 rounded-lg flex-wrap sticky top-20 z-30 w-fit ">
                {choices.map((item, index) =>
                    <a onClick={() => ScrollToElement(document.getElementById(item.shorthand) ?? null, isSmall)} aria-label={`${item.shorthand} Navigation button`}>
                        <article className="text-center sm:text-lg p-4 w-fit flex flex-col gap-2 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-full backdrop-blur-md bg-white/60 shadow-md border-2 border-neutral-300">
                            <h3 className="font-semibold">{item.shorthand}</h3>
                        </article>
                    </a>
                )}
            </div>
           
        )
    }
}