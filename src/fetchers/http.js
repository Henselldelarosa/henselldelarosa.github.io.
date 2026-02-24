import axios from "axios";

const http = axios.create({
  baseURL: "/", // important for static export
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { http };
