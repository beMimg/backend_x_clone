require("dotenv").config();

let BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://backendxclone-production.up.railway.app"
    : "http://localhost:4000";

let FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://x-clone-bemimg.netlify.app"
    : "http://localhost:3000";

exports.BASE_URL = BASE_URL;
exports.FRONTEND_URL = FRONTEND_URL;
