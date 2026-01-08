import { useEffect, useRef, useState } from "react";

interface GalleryImage {
    thumbnail: string;
    file: string;
    filename: string;
    mime: string; //type
    size: number; //bytes
}

interface GalleryResponse {
    status?: string|"0";
    message: string;
    data?:GalleryImage[]
}

// by default the URL is https:bitsoc.ca/home/wwwbitsoc/public_html/manage which is obviously super wrong lol
const fixGalleryUrl = (href:string) => {
    const hrefArray = href.split("/");
    return "https://bitsoc.ca/" + hrefArray.slice(4).join("/")
}



export default function GalleryItems() {
    const [data, setData] = useState<GalleryResponse|null>(null);
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage|null>(null)
    
    useEffect(()=>{
        async function fetchGallery() {
            try {
                const response = await fetch("/connect/get-gallery/");
                if (!response.ok) {
                    setisLoading(false);
                    setIsError(true);
                }

                const result: GalleryResponse = await response.json();
                setisLoading(false);
                setData(result);
            } catch (error: any) {
                setisLoading(false);
                setIsError(true);
            }
        }
        
        fetchGallery();
    },[])

    useEffect(()=>{
        selectedImage == null ? document.body.classList.remove("overflow-y-hidden") : document.body.classList.add("overflow-y-hidden");
    },[selectedImage])

    if(isError){
        return (
            <div className="flex flex-col gap-2 w-fit h-fit justify-center items-center py-4 px-8 shadow-md rounded-md border-2 border-bitsoc-blue/50">
                <h2 className="sm:text-lg font-semibold">Oops! Something went wrong loading the gallery.</h2>
                <p className="text-sm">Try again later. If the issue persists feel free to reach out to us.</p>
            </div>
        )
    }
    else if(isLoading) {
        return(
            <div className="flex flex-wrap gap-4 w-full h-fit justify-center items-center">
                    { Array.from({ length: 26 }).map((_, i) => (
                        <div className="h-40 w-40 rounded-md bg-neutral-600 animate-pulse" key={i}></div>
                        ))
                    }
            </div>
        )
    }

    else if(data?.data && data.data.length == 0) {
         return(
            <div className="flex flex-col gap-2 w-fit h-fit justify-center items-center py-6 px-6 sm:px-12 shadow-md rounded-md border-2 border-bitsoc-blue/50 ">
                <h2 className="sm:text-lg font-semibold">No images found!</h2>
                <p className="text-sm text-center">Looks like our gallery is empty :(</p>
            </div>
        )
    }

    else if(data?.data && data.data.length >= 1) {
         return(
            <div className="flex flex-wrap gap-4 w-full h-fit justify-center items-center -mx-10 animate-in fade-in-20">
                { data.data?.map((item, index) =>
                    <button onClick={() => setSelectedImage(item)} key={index} className="hover:scale-110 ease-in-out duration-200 hover:shadow-md "> 
                        <img className="h-fit w-30 sm:w-40 lg:w-45 xl:w-55 rounded-md" src={fixGalleryUrl(item.thumbnail)} />
                    </button> 
                )}
                { selectedImage &&
                    <>
                    <ImageLightBox src={fixGalleryUrl(selectedImage.file)} alt={selectedImage.filename}  setState={setSelectedImage}/>
                    </>
                }
            </div>
        )
    }
    
}

function ImageLightBox({src, alt, setState}:{src:string,alt:string, setState:(arg0:GalleryImage|null)=>void}){
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(1);
    const [imageBaseHeight, setImageBaseHeight] = useState<number>(0);
    const [imageBaseWidth, setImageBaseWidth] = useState<number>(0);

    // we have to define dynamic style classes before inputting to tailwind as tailwind does not support in line conditions
    // this way we are just swapping classes rather than evaluating conditions in-line
    const buttonClasses = "hover:cursor-pointer rounded-md active:bg-gray-400/50 hover:bg-gray-400/50 transition-colors duration-200"
    const zoomOutClasses = zoom <= 1 ? "invert-30" : null;
    const zoomInClasses = zoom >= 2 ? "invert-30" : null;
    const hasZoomedClasses = zoom >= 1.2 ? "bg-white/50 backdrop-blur-md" : "bg-white"
    const currentImage = useRef<HTMLImageElement>(null);


    const setDimensions = () => {
        if(currentImage.current){
            setImageBaseHeight(Number(currentImage.current.naturalHeight))
            setImageBaseWidth(Number(currentImage.current.naturalWidth))
        }
    }

    return(
        <div onClick={(e) => e.currentTarget === e.target ? setState(null) : null} className="flex flex-col z-50 fixed w-full h-full top-0 bg-black/50 backdrop-blur-md justify-center items-center animate-in fade-in overflow-scroll">
            {!isLoaded && 
                <div className="absolute top-1/2 flex flex-col justify-center items-center gap-2 z-50">
                    <div className=" bg-bitsoc-orange animate-bounce rounded-full w-4 h-4 border-2 border-white" />
                    <p className="text-white text-shadow-md">Loading...</p> 
                </div> 
            }
            <img style={{transform: `scale(${zoom})`}} ref={currentImage} onLoad={() => {setIsLoaded(true); setDimensions()}} id="shown-image" className={`rounded-xl ease-in-out drop-shadow-md duration-250 max-w-4/5 h-fit max-h-4/5 z-50 ${isLoaded ? "opacity-100 flex" : "opacity-0"}`} src={src} alt={alt} ></img>
            <div className={`flex mt-4 px-2 py-1 rounded-2xl items-center justify-between w-65 ${hasZoomedClasses} border-neutral-300 shadow border-2 delay-400 ease-in-out duration-300  ${isLoaded ? "opacity-100 flex" : "opacity-0"} z-50`}>
                <button onClick={() => {zoom > 1 ? setZoom(zoom-0.2) : null; console.log(zoom)}} className={`p-1 sm:p-2 ${buttonClasses} ${zoomOutClasses} `} aria-label="zoom out button"><img className="w-4 h-4 sm:w-5 sm:h-5" src="zoom-out.svg" alt="zoom out" /></button>
                <button onClick={() => {zoom < 2 ? setZoom(zoom+0.2) : null; console.log(zoom)}} className={`p-1 sm:p-2 ${buttonClasses} ${zoomInClasses} `} aria-label="zoom in button"><img className="w-4 h-4 sm:w-5 sm:h-5" src="zoom-in.svg" alt="zoom" /></button>
            </div>
        </div>
    )
}


