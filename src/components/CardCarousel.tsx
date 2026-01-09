import EventCard from "./EventCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function CardCarousel({cardType, data}:{cardType?:"info"|"event"|"photos", data?:Array<{title:string, date?:string, link?:string, description:string, image:string}>}) {
    
    if (!data) {
        return(
            <section className="flex w-full justify-center items-center ">
                <article className="hover:scale-105 ease-in-out duration-200 hover:cursor-pointer ">
                    <div className="flex flex-col border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-45 sm:w-55 lg:w-65 scroll-smooth scroll justify-center items-center h-80" >
                        <h3 className="text-xl font-semibold mb-2">No events found</h3>
                        <p className="text-gray-700 text-base">There are currently no events.</p>
                    </div>
                </article>
            </section>
        )
    }

    // if event or not specified
    if (cardType == "event" || !cardType) {
        return (
            <Carousel
                plugins={[
                    Autoplay({
                    delay: 2750,
                    }),
                ]}

                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-5xl"
                >
                <CarouselContent className="">
                    {data.map((item, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:1/4 p-5">
                        <div className="p-1">
                        <EventCard
                            title={item.title}
                            description={item.description}
                            image={item.image}
                        />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
        )
    }
    else if (cardType === "info") {   
        return(
            <Carousel
                plugins={[
                    Autoplay({
                    delay: 3200,

                    }),
                ]}

                opts={{
                    align: "center",
                    loop: true,
                }}
                className="w-fit"
                orientation="vertical"
                >
                <CarouselContent className="h-125 sm:h-150">
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="pt-5 basis-1/1 ">
                            <div className="p-10">
                            <EventCard
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                type="svg"
                                link={item.link ?? " "}
                            />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        )
    }
    else if(cardType = "photos") {
        return (
            <Carousel
                plugins={[
                    Autoplay({
                    delay: 2750,
                    }),
                ]}

                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-5xl"
                >
                <CarouselContent className="">
                    {data.map((item, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:1/4 p-5">
                        <div className="p-1">
                            <img src={item.image} alt="title" />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
        )
    }

}