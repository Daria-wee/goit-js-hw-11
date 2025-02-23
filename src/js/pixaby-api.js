import axios from "axios";

const API_KEY = "49011950-2d803ac0681f77f6ebc5cb6af";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 20,
            },
        });

        return response.data.hits;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
