import { useEffect, useState } from "react";
import {marked} from "marked";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { BluditPage, BluditResponse } from "@/types";

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



export default function ExecContact({data}:{data:BluditResponse}){
    if(data.data.pages.length >= 1){
        return(
            <Accordion
                type="single"
                collapsible
                className="w-full py-4 px-2 bg-bit text-black animate-in fade-in duration-500 max-w-350 border-bitsoc-orange"
                defaultValue="item-1"
                >
                <h2 className="flex text-xl font-semibold">Executive info</h2>
            
                { data.data.pages.map((item,index) => 
                    <AccordionItem key={index} value={String(index)}>
                        <AccordionTrigger className="cursor-pointer">{item.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 text-balance pl-4">
                            <h3 className="text-lg font-semibold">
                                {parseContactContent(item.content).name}
                            </h3>
                            <div className="flex gap-2">
                                <p>Contact: </p>
                                <a type="mail" className="text-blue-500 hover:cursor-pointer hover:underline" href={"mailto:" + parseContactContent(item.content).contact}>
                                    {parseContactContent(item.content).contact}
                                </a>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        )
    }
    else if (data.data.pages.length < 1){
        return(
            <div className="flex flex-col gap-2 w-fit h-fit justify-center items-center py-4 px-8 shadow-md rounded-md border-2 border-bitsoc-blue/50">
                <h2 className="sm:text-lg font-semibold">No contact information found</h2>
                <p className="text-sm max-w-100">This could be due to an error in how we setup our roles. Reach out to us if this issue persists.</p>
            </div>
        )
    }
    
}