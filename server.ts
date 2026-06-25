import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import http from "http";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.post("/api/calltouch", express.json(), async (req, res) => {
    try {
      const { fio, phoneNumber, subject, sessionId } = req.body;
      
      const params = new URLSearchParams();
      if (fio) params.append('fio', fio);
      if (phoneNumber) params.append('phoneNumber', phoneNumber);
      if (subject) params.append('subject', subject);
      if (sessionId) params.append('sessionId', sessionId);

      const response = await fetch("https://api.calltouch.ru/calls-service/RestAPI/requests/83555/register/", {
          method: 'POST',
          body: params,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
      
      if (!response.ok) {
          console.error("Calltouch error:", await response.text());
          return res.status(response.status).json({ error: "Calltouch API error" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/feed", async (req, res) => {
    try {
      const response = await fetch("https://export.maxposter.ru/dealer-export/1983-38233.xml");
      if (!response.ok) {
        return res.status(response.status).send(response.statusText);
      }
      const text = await response.text();
      res.set("Content-Type", "application/xml");
      res.send(text);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch feed" });
    }
  });

  app.get("/feed.php", async (req, res) => {
    try {
      const response = await fetch("https://export.maxposter.ru/dealer-export/1983-38233.xml");
      if (!response.ok) {
        return res.status(response.status).send(response.statusText);
      }
      const text = await response.text();
      res.set("Content-Type", "application/xml");
      res.send(text);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch feed" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
