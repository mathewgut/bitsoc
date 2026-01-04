import EventCard from "./EventCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function CardCarousel({cardType, data}:{cardType?:"svg"|"img", data?:Array<{title:string, date?:string, description:string, image:string}>}) {
    
    if (!data) {
        return(
            <section className="flex w-full justify-center items-center">
                <article className="hover:scale-105 ease-in-out duration-200 hover:cursor-pointer">
                    <div className="flex flex-col border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-45 sm:w-55 lg:w-65 scroll-smooth scroll">
                        <div className="p-4 bg-white">
                            <h3 className="text-xl font-semibold mb-2">No events found</h3>
                            <p className="text-gray-700 text-base">There are currently no events.</p>
                        </div>
                    </div>
                </article>
            </section>
        )
    }

    // if no cardtype or is img, return img cards
    if (cardType !== "svg") {
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
    else if (cardType === "svg") {   
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
                            />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        )

         return(
            <Carousel
            opts={{
                align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-xs"
            >
            <CarouselContent className="-mt-1 h-[200px]">
                {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                    <div className="p-1">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        )
    }
    else {
        return (<></>);
    }

}