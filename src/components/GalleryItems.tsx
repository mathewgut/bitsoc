import { useEffect, useState } from "react";

interface GalleryResponse {
    status?: string|"0";
    message: string;
    data?: Array<{
        thumbnail: string;
        file: string;
        filename: string;
        mime: string; //type
        size: number; //bytes
    }>
}

// by default the URL is https:bitsoc.ca/home/wwwbitsoc/public_html/manage which is obviously super wrong lol
const fixGalleryUrl = (href:string) => {
    const hrefArray = href.split("/");
    return "https://bitsoc.ca/" + hrefArray.slice(4).join("/")
}


export default function GalleryItems({galleryData, error}:{galleryData:GalleryResponse|null, error:boolean}) {
    const data = galleryData
    const [isLoading, setisLoading] = useState<boolean>(false);
    
    console.log(galleryData);

    if(error){
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