import http, { createServer } from "http";
import app from "./app.js";
const PORT=3000;

const server=createServer(app)

server.listen(PORT,()=>console.log(`server is running on port ${PORT}`));