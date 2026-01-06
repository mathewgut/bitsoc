import { useEffect, useState } from "react";
import { TailSpin } from 'react-loader-spinner'

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
        selectedImage == null ? document.body.classList.remove("overflow-y-hidden") : null
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
                        <div className="h-40 w-40 bg-neutral-600 animate-pulse" key={i}></div>
                        ))
                    }
            </div>
        )
    }

    else if(data?.data && data.data.length == 0) {
         return(
            <div className="flex flex-col gap-2 w-fit h-fit justify-center items-center py-6 px-6 sm:px-12 shadow-md rounded-md border-2 border-bitsoc-blue/50">
                <h2 className="sm:text-lg font-semibold">No images found!</h2>
                <p className="text-sm text-center">Looks like our gallery is empty :(</p>
            </div>
        )
    }

    else if(data?.data && data.data.length >= 1) {
         return(
            <div className="flex flex-wrap gap-4 w-full h-fit justify-center items-center -mx-10">
                { data.data?.map((item, index) =>
                    <button onClick={() => setSelectedImage(item)} key={index} className="hover:scale-110 ease-in-out duration-200 hover:shadow-md "> 
                        <img className="h-fit w-30 sm:w-40 rounded-md" src={fixGalleryUrl(item.thumbnail)} />
                    </button> 
                )}
                { selectedImage &&
                    <>
                    {document.body.classList.add("overflow-y-hidden")}
                    <ImageLightBox src={fixGalleryUrl(selectedImage.file)} alt={selectedImage.filename}  setState={setSelectedImage}/>
                    </>
                }
            </div>
        )
    }
    
}

function ImageLightBox({src, alt, setState}:{src:string,alt:string, setState:(arg0:GalleryImage|null)=>void}){
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    
    return(
        <div onClick={(e) => e.currentTarget === e.target ? setState(null) : null} className="flex z-50 fixed w-full h-full top-0 bg-black/50 backdrop-blur-md justify-center items-center animate-in fade-in">
            {!isLoaded && <p>Loading</p> }
            <img onLoad={() => setIsLoaded(true)} id="shown-image" className={`max-w-4/5 h-fit max-h-4/5 z-50 ${isLoaded ? "opacity-100" : "opacity-0"}`} src={src} alt={alt} ></img>
            
        </div>
    )
}


