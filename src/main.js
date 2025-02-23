import { fetchImages } from "./js/pixaby-api.js";
import { renderGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

const lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({ title: "Warning", message: "Please enter a search term!" });
        return;
    }

    gallery.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        const images = await fetchImages(query);
        if (images.length === 0) {
            iziToast.error({ title: "Error", message: "No images found for this query." });
            return;
        }

        renderGallery(images);
        lightbox.refresh();
    } catch (error) {
        iziToast.error({ title: "Error", message: "Something went wrong. Try again later." });
    } finally {
        loader.classList.add("hidden");
    }
});
