import axiosClient from "./axiosClient";

const getGoogle = {
  getAddress: (params: string) => axiosClient.get(`${params}`),
};

export default getGoogle;
