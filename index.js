import { Loader } from "https://cdn.skypack.dev/@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyADVTYJmrHC-uO7b3dRQNENvB_ysgVTIeM",
  version: "weekly",
});

let map;

async function initMap() {
  try {
    await loader.load();

    // 緯度・経度を設定
    const location = { lat: -34.397, lng: 150.644 };

    map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 8,
    });

    // ピンを立てる
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  } catch (error) {
    console.error("Error loading Google Maps API: ", error);
  }
}

initMap();
