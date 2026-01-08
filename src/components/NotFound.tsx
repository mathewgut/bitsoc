export default function NotFound(){
    return(
        <section className="flex flex-col gap-2 w-full justify-center items-center">
            <h1 className="text-9xl font-bold">404</h1>
            <span className="flex gap-2 justify-center items-center">
                Page
                <p className="bg-bitsoc-blue text-white px-2 py-0.5 rounded-md">
                    {window.location.pathname}
                </p>
                does not exist
            </span>
        </section>
    )
}