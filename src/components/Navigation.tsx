// navigation for all screens, changes depending on size determined by tailwind breakpoints: https://tailwindcss.com/docs/responsive-design
import { useEffect, useState } from "react"
import "../styles/global.css";
import type { JSX } from "astro/jsx-runtime";

const buttonClasses = "px-4 py-2 hover:cursor-pointer rounded-md hover:bg-gray-200/50 transition-colors duration-200";

// sm: 640px, md:768px, lg:1024px, xl:1280px

export default function Navigation() {
    const [currentNav, setCurrentNav] = useState<JSX.Element | null>(null)

    useEffect(() =>{
        const handleResize = () => {
            window.innerWidth < 768 ? setCurrentNav(<MobileNav />) : setCurrentNav(<DesktopNav />);
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[])
    
    
    return (currentNav)
}

function DesktopNav(){
    const [scrolledStyles, setScrolledStyles] = useState<string>()
    const scrollThreshold = 60; // px

    window.addEventListener("scroll", () => {
        if (window.scrollY) {
            hasScrolled();
        } 
    });

    function hasScrolled() {
        if (window.scrollY >= scrollThreshold) {
            console.log(window.scrollY)
            setScrolledStyles("ease-in-out duration-200 flex z-50 gap-2 h-15 backdrop-blur-xs text-sm fixed top-0 w-full justify-between items-center border-b border-black px-4 bg-white/30 bg-linear-to-l from-white via-white/70 to-transparent");
        }
        else if (window.scrollY < scrollThreshold ) {
             setScrolledStyles("ease-in-out duration-200 flex z-50 gap-2 h-17 backdrop-blur-xs text-lg fixed top-0 w-full justify-between items-center border-b border-black px-4 bg-white/30 bg-linear-to-l from-white via-white/70 to-transparent");
        }
    }
    return(
        <nav className={scrolledStyles ? scrolledStyles : "ease-in-out duration-200 flex z-50 gap-2 h-17 backdrop-blur-xs text-lg fixed top-0 w-full justify-between items-center border-b border-black px-4 bg-white/30 bg-linear-to-l from-white via-white/70 to-transparent"}>
            <a className="flex h-full" href="/">
                <button className="hover:cursor-pointer">
                    <img className="h-full" src="/logo.ico" alt="bit society logo" />
                </button>
            </a>
            
            <div className="flex gap-2">
                <a href="/"><button className={buttonClasses}>Home</button></a>
                <a href="/about"><button className={buttonClasses}>Events</button></a>
                <a href="/about"><button className={buttonClasses}>About</button></a>
                <a href="/about"><button className={buttonClasses}>Membership</button></a>
                <a href="/programs"><button className={buttonClasses}>BIT Programs</button></a>
                <a href="/about"><button className={buttonClasses}>Gallery</button></a>

            </div>
        </nav>
    )
}

function MobileNav () {
    const [isOpen, setIsOpen] = useState(false);

    const openStyles = "h-6 w-6 rotate-90 ease-in-out transition-transform duration-300";
    const closedStyles = "h-6 w-6 rotate-0 ease-in-out transition-transform duration-300";

    return (
        <>
            <Sidebar isOpen={isOpen} />
            <nav className={"flex fixed top-0 z-50 justify-between  items-center w-full h-14 pl-5 pr-2 backdrop-blur-xs text-lg border-b border-black bg-white"}>
                <a className="flex h-15" href="/">
                    <button>
                        <img className="h-15" src="/logo.ico" alt="bit society logo" />
                    </button>
                </a>

                <button className={buttonClasses} onClick={() => setIsOpen(!isOpen)}> 
                    <img className={isOpen ? openStyles : closedStyles} src="/menu.svg" alt="menu" />
                </button>
            </nav>
        </>
    )
}

function Sidebar ({isOpen}: {isOpen: boolean}) {
    if (isOpen){
        // locks scrolling when sidebar is open
        document.body.classList.add("overflow-y-hidden")
        return (
            <aside className="fixed ease-in-out duration-200 top-0 right-0 w-svw h-svh backdrop-blur-xs shadow-lg z-50 animate-in fade-in">
                <div className="fixed ease-in-out duration-200 top-0 right-0 w-64 h-full bg-white shadow-lg z-50 animate-in fade-in border-l-black border-l-1">
                    <button className="absolute top-4 right-4" ></button>
                    <ul className="mt-16 flex flex-col gap-4 px-4">
                        <li><a href="/"><button className={buttonClasses}>Home</button></a></li>
                        <li><a href="/about"><button className={buttonClasses}>Events</button></a></li>
                        <li><a href="/about"><button className={buttonClasses}>About</button></a></li>
                        <li><a href="/about"><button className={buttonClasses}>Membership</button></a></li>
                        <li><a href="/programs"><button className={buttonClasses}>BIT Programs</button></a></li>
                        <li><a href="/about"><button className={buttonClasses}>Gallery</button></a></li>
                    </ul>
                </div>

              
                
            </aside>
        )
    }
    else {
        document.body.classList.remove("overflow-y-hidden")
        return (<></>);
    }
}