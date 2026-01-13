import { useState, useRef } from "react";
import EventCard from "./EventCard";
import { ImageLightBox, type GalleryImage } from "./GalleryItems";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function CardCarousel({ cardType, data }: { cardType?: "info" | "event" | "photos", data?: Array<{ title: string, date?: string, link?: string, description: string, location?:string, image: string }> }) {
    // 1. Initialize state for the lightbox
    const [selectedImage, setSelectedImage] = useState<string | GalleryImage | null>(null);

    if (!data || data.length === 0) {
        return (
            <section className="flex w-full justify-center items-center pb-6">
                <article className="hover:scale-105 ease-in-out duration-200 hover:cursor-pointer bg-white text-center">
                    <div className="flex flex-col border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-45 sm:w-55 lg:w-65 scroll-smooth scroll justify-center items-center h-80 " >
                        <h3 className="text-xl font-semibold mb-2">No events found</h3>
                        <p className="text-gray-700 text-base">There are currently no events.</p>
                    </div>
                </article>
            </section>
        )
    }

    if (cardType === "photos") {
        return (
            <>
                {selectedImage && (
                    <ImageLightBox 
                        src={String(selectedImage)} 
                        alt="Lightbox View" 
                        setState={setSelectedImage} 
                    />
                )}

                <Carousel
                    plugins={[
                        Autoplay({ delay: 2750 }),
                    ]}
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="py-4">
                        {data.map((item, index) => (
                            <CarouselItem onClick={() => setSelectedImage(item.image)} key={index} className="flex basis-1/1 justify-center md:max-w-fit">
                                <div className="px-4">
                                    <img 
                                        src={item.image} 
                                        alt={item.title || `Gallery image ${index}`} 
                                        className="cursor-pointer w-full max-w-250 hover:scale-105 ease-in-out duration-200 rounded-lg"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
            </>
        )
    }

    if (cardType === "info") {
        return (
            <Carousel
                plugins={[Autoplay({ delay: 3200 })]}
                opts={{ align: "center", loop: true }}
                className="w-fit"
                orientation="vertical"
            >
                <CarouselContent className="h-125 sm:h-150">
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="pt-5 basis-full">
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

    return (
        <Carousel
            plugins={[Autoplay({ delay: 2750 })]}
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl"
        >
            <CarouselContent>
                {data.map((item, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:1/4 p-5">
                        <div className="p-1">
                            <EventCard
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                date ={item.date} 
                                location={item.location}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}