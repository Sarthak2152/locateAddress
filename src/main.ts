import axios from "axios";
import mapboxgl from "mapbox-gl";

const form = document.querySelector("form")!;
const userInput = <HTMLInputElement>document.getElementById("address")!;

const KEY: string = import.meta.env.VITE_MAPBOX_KEY;

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  try {
    const address = userInput.value;
    const response = await axios.get(
      `https://api.mapbox.com/search/geocode/v6/forward?`,
      {
        params: {
          q: encodeURI(address),
          access_token: KEY,
        },
      }
    );

    if (response.data.features.length > 0) {
      const [lng, lat] = response.data.features[0].geometry.coordinates;
      mapboxgl.accessToken = KEY;
      new mapboxgl.Map({
        zoom: 10,
        container: "map", // container ID
        center: [lng, lat],
      });
    }
  } catch (error) {
    console.log("An error occurred");
  } finally {
    userInput.value = "";
  }
};
form.addEventListener("submit", handleSubmit);
