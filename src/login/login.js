import axios from "axios";
import { Buffer } from "buffer";
import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const APP_URL = import.meta.env.VITE_APP_URL;

const clientMix =
  "Basic " + Buffer(clientId + ":" + clientSecret).toString("base64");

const spotifyToken = axios.create({
  baseURL: "https://accounts.spotify.com/api/token",
});

const authorizeUser = () => {
    const data = new URLSearchParams({ grant_type: "client_credentials" });

    spotifyToken
      .post("", data, {
        headers: {
          Authorization: clientMix,
        },
      })
      .then(({ data }) => {
        localStorage.setItem(ACCESS_TOKEN, data.access_token);
        localStorage.setItem(TOKEN_TYPE, data.token_type);
        localStorage.setItem(EXPIRES_IN, (Date.now() + (data.expires_in * 1000)));
        window.location.href = APP_URL;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click", authorizeUser);

})



window.addEventListener("load", () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }
})
