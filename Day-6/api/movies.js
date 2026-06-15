export default async function handler(req, res) {
    const { s, i } = req.query;
    let url = "";
    if (s) {
        url = `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=${process.env.OMDB_API_KEY}`;
    }
    else if (i) {
        url = `https://www.omdbapi.com/?i=${i}&apikey=${process.env.OMDB_API_KEY}`;
    }
    else {
        return res.status(400).json({
            error: "Missing query parameter"
        });
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            error: "Failed to fetch movie data"
        });
    }
}