import axios from "axios";
import getGoogle from "./api/getAddress";

declare const google: any;

const form = document.querySelector("#form")!;
const inputAddress = document.querySelector("#address")! as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const submitHandler = async (event: Event) => {
  event.preventDefault();
  console.log(inputAddress.value);
  const params = `/json?address=${encodeURI(
    inputAddress.value
  )}&key=YOUR_API_KEY`;
  // const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
  //   inputAddress.value
  // )}&key=YOUR_API_KEY`;
  inputAddress.value = "";

  // axios
  //   .get<GoogleGeocodingResponse>(URL)
  //   .then((response) => {
  //     if (response.data.status !== "OK") {
  //       throw new Error("座標を取得できませんでした。");
  //     }
  //     const coordinates = response.data.results[0].geometry.location;
  //     const map = new google.maps.Map(document.getElementById("map"), {
  //       center: { lat: coordinates.lat, lng: coordinates.lng },
  //       zoom: 16,
  //     });
  //     new google.maps.Marker({ position: coordinates, map: map });
  //   })
  //   .catch((err) => {
  //     alert(err.message);
  //     console.log(err);
  //   });

  const result = await getGoogle.getAddress(params);
  if (result.data.status !== "OK") {
    throw new Error("座標を取得できませんでした。");
  }
  const coordinates = result.data.results[0].geometry.location;
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: coordinates.lat, lng: coordinates.lng },
    zoom: 16,
  });
  new google.maps.Marker({ position: coordinates, map: map });
};

form.addEventListener("submit", submitHandler);
