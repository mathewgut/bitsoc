// cards used in IndexEvents component to show events
export default function EventCard({title, description, image, link, type}:{title:string, description:string, image:string, link?:string, type?:"svg"|"img"|"detail"}) {
    if( type === "svg") {
        return (
            <article className="hover:scale-105 ease-in-out duration-200 hover:cursor-pointer">
            <div className="flex flex-col items-center justify-between border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-70 h-105 sm:w-80 sm:h-120 scroll-smooth scroll">
                <div className ="flex flex-col items-center pt-8">
                    <img className="w-30 sm:w-40 h-30 sm:h-40 object-cover" src={image} alt={title} />
                    <div className="p-4 pb-0 bg-white">
                        <h3 className="flex text-lg text-center font-semibold mb-2">{title}</h3>
                        <p className="text-gray-700 text-base">{description}</p>
                    </div>
                </div>
                <a className="flex w-2/3 mb-4 my-8 justify-center" href={link ?? " "}>
                    <button className=" py-2 px-4 hover:cursor-pointer text-bitsoc-orange border-2 border-bitsoc-orange rounded-lg hover:bg-bitsoc-orange hover:text-white transition-colors duration-300">
                        More information
                    </button>
                </a>
            </div>
            
        </article>
        )
    }

    if(type === "detail"){
        return (
            <article className="hover:scale-105 ease-in-out duration-200 hover:cursor-pointer">
            <div className="flex flex-col items-center justify-between border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-50 h-90 sm:w-60 sm:h-100 scroll-smooth scroll">
                <div className ="flex flex-col items-center pt-8">
                    <img className="w-30 sm:w-40 h-30 sm:h-40 object-cover" src={image} alt={title} />
                    <div className="p-4 pb-0 bg-white">
                        <h3 className="flex text-lg text-center font-semibold mb-2">{title}</h3>
                        <p className="text-gray-700 text-base">{description}</p>
                    </div>
                </div>
            </div>
            
        </article>
        )
    }
    
    return (
        <article className="hover:scale-105 ease-in-out duration-200 hover:cursor-pointer">
            <div className="flex flex-col border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-45 sm:w-55 lg:w-65 scroll-smooth scroll">
                <img className="h-3/4 object-cover" src={image} alt={title} />
                <div className="p-4 bg-white">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-700 text-base">{description}</p>
                </div>
            </div>
        </article>
    )
}