import { useEffect, useState } from "react";
import {marked} from "marked";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface Response {
  status: string;
  message: string;
  data: CategoryData;
}

export interface CategoryData {
  key: string;
  name: string;
  description: string;
  permalink: string;
  pages: BluditPage[];
}

export interface BluditPage {
  key: string;
  title: string;
  content: string;
  contentRaw: string;
  description: string;
  type: "published" | "draft" | "static" | "sticky"; 
  slug: string;
  date: string;
  dateRaw: string;
  tags: string | string[];
  username: string;
  category: string;
  uuid: string;
  dateUTC: string;
  permalink: string;
  coverImage: string | boolean;
  coverImageFilename: string | boolean;
}

// assumes the contact object is inside the <p></p> tag
// contact string input should be in format: <p>{name:my name, contact:mail@mail.com}</p>
const parseContactContent = (contact:BluditPage["content"]) => {
    const markupString = String(marked(contact)).trim();
    const contactString = JSON.parse(JSON.stringify(markupString.slice(4,-5)));
    const contactArray = contactString.split(",");
    
    contactArray[0] = contactArray[0].split(":")[1];
    contactArray[1] = contactArray[1].split(":")[1];

    const contactObject = {name:contactArray[0],contact:contactArray[1]}
    return contactObject;
}



export default function ExecContact(){
    const [data, setData] = useState<Response | null>(null);
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(()=>{
        async function fetchGallery() {
            try {
                const response = await fetch("/connect/get-execs/");
                if (!response.ok) {
                    setisLoading(false);
                    setIsError(true);
                }

                const result: Response = await response.json();
                setisLoading(false);
                setData(result);
            } catch (error: any) {
                console.log(error)
                setisLoading(false);
                setIsError(true);
            }
        }
        
        fetchGallery();
        },[])
    
    if(isError){
        return(<p>error</p>)
    }
    else if (isLoading){
        return(<p>Loading</p>)
    }
    else if(data?.data.pages){
        return(
            <Accordion
                type="single"
                collapsible
                className="w-full py-4 px-2 bg-white text-black"
                defaultValue="item-1"
                >
                <h2 className="flex text-xl font-semibold">Executive info</h2>
            
                { data.data.pages.reverse().map((item,index) => 
                    
                    <>
                        <AccordionItem value={String(index)}>
                            <AccordionTrigger className="cursor-pointer">{item.title}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 text-balance pl-4">
                                <h2 className="text-lg font-semibold">
                                    {parseContactContent(item.content).name}
                                </h2>
                                <div className="flex gap-2">
                                    <p>Contact: </p>
                                    <a type="mail" className="text-blue-500 hover:cursor-pointer hover:underline" href={"mailto:" + parseContactContent(item.content).contact}>
                                        {parseContactContent(item.content).contact}
                                    </a>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </>
                    
                )}
                </Accordion>
           
        )
    }
    
}