const env = process.env;
var rooms = {};

const roomsVars = Object.keys(env).filter(key => key.startsWith("REACT_APP_ROOM_"));
roomsVars.forEach(function(key) {
    const [rn, k] = key.split("REACT_APP_ROOM_").pop().split("_");
    rooms[rn] = rooms[rn] || { name: rn }; // initialize in case empty
    rooms[rn][k] = env[key];
})

export default {
    ASSET_PATH: env.REACT_APP_ASSET_PATH || ".",
    DAILY_SUBDOMAIN: env.REACT_APP_DAILY_SUBDOMAIN || "https://licimeet.daily.co",
    COMPANY_NAME: env.REACT_APP_COMPANY_NAME || "Lici Meet",
    COMPANY_URL: env.REACT_APP_COMPANY_URL || "",
    rooms: rooms,
}