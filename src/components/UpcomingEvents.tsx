import { useEffect, useState } from "react";
import CardCarousel from "./CardCarousel";
import type { BluditResponse, BluditScheduledResponse } from "@/types";
import { marked } from "marked";
import type { EventData } from "@/types";

function FormatTime (time:string) {
    time = time.slice(0,-3);
    let hour = Number(time.split(":")[0]);
    const minute = Number(time.split(":")[1]);
    let suffix = "am"

    if (hour > 12){
        hour -= 12;
        suffix = "pm";
    }
    else if (hour === 12){
        suffix = "pm";
    }
    else if (hour === 0){
        hour = 12;
        suffix = "am";
    }
    
    return `(${hour}:${minute < 10 ? String(minute) + "0" : minute} ${suffix})`;
}


export default function UpcomingEvents() {
    const [data, setData] = useState<BluditScheduledResponse|null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);
    const [events, setEvents] = useState<EventData[]>([]);
    
    // get data
    useEffect(() => {
        let isMounted = true; 

        async function fetchEvents() {
            const endpoint = "https://bitsoc.ca/getEvents.php";

            setIsLoading(true);


            try {
                const res = await fetch(endpoint);

                if (!res.ok) throw new Error("Network response was not ok");

                const data: BluditScheduledResponse = await res.json();
                
                if (isMounted) {
                    setData(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
                if (isMounted) {
                    setError(true);
                    setIsLoading(false);
                }
            }
        }

    fetchEvents();
    
    return () => { isMounted = false; };
    }, []);

 
    useEffect(() => {
        if(data && data.data.length >=1){
            setEvents( data.data.map((item) => ({
                title: item.title,
                description: item.description,
                image: item.coverImage ? String(item.coverImage) : "/frown.svg",
                date: item.date + ` ${FormatTime(item.dateRaw.split(" ")[1])}`,
                location: String(marked((item.content).trim())).slice(3, -4),

                // if a link exists in the description, extract it and make it clickable, otherwise set link to a falsy string
                link: item.description.includes("https://") ? item.description.split("https://")[1].split(" ")[0] : "",
            })))
        
        }

    else {
        setEvents([{title:"", description:"",image:""}])
    }

    console.log(events)
    }, [data])
    

    if(isLoading){
        return (
            <div className="flex flex-col justify-center items-center gap-2">
                    <div className=" bg-bitsoc-orange animate-bounce rounded-full w-4 h-4 border-2 border-white" />
                    <p className="text-black sm:text-black text-shadow-md">Loading...</p> 
            </div> 
        )
    }

    else if (!error && data && events){
        return (
            <section className="flex justify-center w-full py-5 bg-linear-0 lg:px-20">
                {
                    data.data.length < 1 &&
                    <div className="flex flex-col justify-center items-center gap-3 border-gray-300 border-2 rounded-lg p-5 shadow-md my-4 h-50 bg-white">
                        <h3 className="text-center text-lg font-semibold">There are no upcoming events</h3>
                        <img src="/frown.svg" />
                    </div>
                }
                
                {
                    data.data.length >= 1 &&
                    <CardCarousel data={events} cardType="event" />
                }
            
            </section>
        )
    }
    else {
        return (
            <p>Failed to load upcoming events. Please try again later.</p>
        )
    }
}


