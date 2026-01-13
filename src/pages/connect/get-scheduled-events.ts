import type { BluditResponse, BluditScheduledResponse } from "@/types";

export async function GET() {
    const apiKey = import.meta.env.API_KEY;
    const endpoint = "https://bitsoc.ca/manage/api/pages?token=" + String(apiKey) + "&published=false&scheduled=true";

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

        const data:BluditScheduledResponse = await res.json();
        const filtered = data.data.filter((page) => page.category == "Events" ? true : false);
        
        return new Response(JSON.stringify(filtered), {
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