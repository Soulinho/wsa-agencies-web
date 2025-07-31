// src/socket.js
import { io } from "socket.io-client";

// Usa la URL donde corre tu backend (ajusta si es distinto)
const socket = io("http://localhost:5000"); // o http://tu-ip:3000

export default socket;
