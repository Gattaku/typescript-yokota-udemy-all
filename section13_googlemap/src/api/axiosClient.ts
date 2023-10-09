import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode",
});

export default axiosClient;
