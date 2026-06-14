export default async function handler(request, response) {
    const { city } = request.query;
    if (!city) {
        return response.status(400).json({ error: 'City name parameter is required.' });
    }
    const API_KEY = process.env.API_KEY; 
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    const targetUrl = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    try {
        const apiResponse = await fetch(targetUrl);
        if (!apiResponse.ok) {
            return response.status(apiResponse.status).json({ error: 'City missing or API server issue' });
        }
        const weatherData = await apiResponse.json();
        return response.status(200).json(weatherData);
    } catch (error) {
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}