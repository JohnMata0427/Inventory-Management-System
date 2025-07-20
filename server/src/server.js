import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({ msg: "El servidor está funcionando correctamente 🚀" });
});

app.get("/health", (_, res) => {
  res.status(200).json({
    msg: "El servidor se encuentra en buen estado",
    timestamp: new Date(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
		environment: process.env.NODE_ENV || "development",
		version: process.env.npm_package_version || "unknown",
  });
});

app.use("/api", [
  // authRoutes,
  // productoRoutes,
]);

app.use((_, res) => {
  res.status(404).json({ msg: "La ruta solicitada no existe" });
});

export { app };
