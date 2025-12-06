import axios from 'axios';

// Helper function to call the Google AI API
async function callGoogleAI(prompt) {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // We ask the AI to return a structured JSON response for reliability
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    recommendations: {
                        type: "ARRAY",
                        items: { type: "STRING" }
                    }
                }
            }
        }
    };

    try {
        const response = await axios.post(apiUrl, payload);
        const jsonText = response.data.candidates[0].content.parts[0].text;
        return JSON.parse(jsonText).recommendations;
    } catch (error) {
        console.error("Error calling Google AI API:", error.response ? error.response.data : error.message);
        throw new Error("Failed to get recommendations from AI.");
    }
}

export const getSimilarArtists = async (req, res) => {
    const { artistName } = req.body;
    if (!artistName) {
        return res.status(400).json({ error: 'Artist name is required.' });
    }

    try {
        // 1. Create a prompt and get a list of artist names from the AI
        const prompt = `Based on the musical style of "${artistName}", recommend 5 similar artists. Do not recommend "${artistName}".`;
        const recommendedNames = await callGoogleAI(prompt);

        if (!recommendedNames || recommendedNames.length === 0) {
            return res.status(200).json([]);
        }

        const artistPromises = recommendedNames.map(name =>
            axios.get(`https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}&limit=1`)
        );

        const artistResponses = await Promise.all(artistPromises);

        const detailedArtists = artistResponses
            .map(response => response.data.data[0]) // Get the first result for each search
            .filter(Boolean) 
            .map(artist => ({
                id: artist.id,
                name: artist.name,
                picture: artist.picture_medium,
            }));

        res.status(200).json(detailedArtists);

    } catch (error) {
        console.error("Error in getSimilarArtists controller:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
