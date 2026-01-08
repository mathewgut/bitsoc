export async function GET() {
    const apiKey = import.meta.env.API_KEY;
    const endpoint = "https://bitsoc.ca/manage/api/categories/executives?token=" + String(apiKey);

    if (!apiKey) {
        console.error("API KEY is not set in .env file");
        return new Response(
            JSON.stringify({ message: "Server config error." }),
        { status: 501 }
        );
    }


    try {
        const res = await fetch(endpoint);

        if (!res.ok) {
            throw new Error(`Failed to fetch from backend: ${res.statusText}`);
        }

        const data = await res.json();
       
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } 
    catch (error) {
        return new Response(
            JSON.stringify({ message:error }),
            { status: 500 }
        );
    }
}