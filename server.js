
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    if (
        req.path === "/server.js" ||
        req.path === "/.env" ||
        req.path.startsWith("/node_modules")
    ) {
        return res.sendStatus(404);
    }
    next();
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`KiddoLand server http://localhost:${PORT} da ishga tushdi 🎉`);
});

