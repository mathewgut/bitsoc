import { useEffect, useState } from "react";

interface GalleryResponse {
    status?: string|"0";
    message: string;
    data?: Array<{
        thumbnail: string;
        file: string;
        filename: string;
        mime: string;
        size: number; //bytes
    }>
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
    else if(data) {
         return(
            <div className="flex flex-wrap gap-4 w-full h-fit justify-center items-center">
                { data.data?.map((item, index) =>
                    <button key={index} className="hover:scale-110 ease-in-out duration-200 hover:shadow-md"> 
                        <img className="h-fit w-40 rounded-md" src={fixGalleryUrl(item.thumbnail)} />
                    </button> 
                )}
            </div>
        )
    }
    
    
}