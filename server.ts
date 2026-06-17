import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Lazy-initialization utility for Gemini SDK to prevent crash if key is missing on start
let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please set it in Settings > Secrets.");
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // REST api route for AI Chat Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getGenAI();

      // Context details for the resort and specific rooms based on the design
      const systemInstruction = `You are a helpful and ultra-luxurious AI Assistant Concierge at the Altyn Palace 5-Star Resort & Spa in Kyrgyzstan.
Our founder and owner is Guljan Yrysmendeeva (Гүлжан Ырысмендеева). She is a legendary hospitality visionary from Kyrgyzstan who founded this palace in 2024 to provide authentic mountain peace blended with ultra-luxury, absolute military-grade security, and five-star wellness therapies.

We have 4 gorgeous, spacious and private royal chambers (Suites):
1. Presidential Royal Suite (Президенттик Падышалык Люкс)
   - Price: $280 per night.
   - Size: 240 sqm. Max guests: 4.
   - Bedding: 2x Imperial King-Size (with premium organic silk sheets)
   - Features private Finnish sauna, whirlpool, Bang & Olufsen premium surround sounds, double-sided glass hearth & library nook, heated private panoramic terrace, and prestige organic bar.
   - Exclusive perk: Chilled vintage Dom Pérignon waiting on arrival.

2. Royal Celestial Penthouse (Падышалык Асмандагы Пентхаус)
   - Price: $350 per night.
   - Size: 320 sqm. Max guests: 6.
   - Bedding: 3x Grand King-Size beds with goose-down topper
   - Features private outdoor heated infinity pool, private IMAX cinema, professional kitchen with custom culinary instruments, private direct-access secure elevator code, and in-suite massage room.
   - Exclusive perk: Priority private helipad access on the roof & custom flight schedule.

3. Deluxe Garden Oasis Villa (Делюкс Бакча Оазис Вилласы)
   - Price: $190 per night.
   - Size: 180 sqm. Max guests: 4.
   - Bedding: 2x Imperial King-Size with organic Belgian linen
   - Features geothermal pure mineral outdoor plunge pool, rainforest experience outdoor slate shower, zen stone yoga podium, and an organic mountain herbal tea bar.
   - Exclusive perk: Daily bespoke alpine flower compositions curated in-suite.

4. Grand Ocean Executive Suite (Улуу Океан Представителдик Люкс)
   - Price: $220 per night.
   - Size: 210 sqm. Max guests: 4.
   - Bedding: 2x Royal King-Size with high-density premium velvet
   - Features suspended sea-sky cantilevered balcony, designer live coral aquascape wall, circadian lighting control system, and a caviar mini-bar.
   - Exclusive perk: 50% discount for private sunrise yacht chartering.

Elite VIP Services available on request:
- VIP Presidential Helicopter Transfer (Manas Airport directly to rooftop): $120 per night.
- Personal Butler & Elite Concierge Service 24/7: $40 per night.
- Michelin-Starred Personal Chef & Sommelier: $60 per night.
- Exclusive 24k Gold Thermal Spa & Full Therapy: $35 per night.

Our World-Class Geothermal Pool & Spa Salons (Visible in our Pool & Spa Gallery):
- Panoramic Geothermal Infinity Pool: Raw local hot mountain springs naturally containing therapeutic minerals, heated to a restorative 38°C. Offers a majestic 360-degree floating skyline view above the snowy mountain peak heights of Ala-Too.
- 24k Gold Spa & Treatment Salons: Opulent physical recovery clinics utilizing pure organic oils infused with genuine 24-carat gold leaf flakes, heated local volcanic basalt basalt stones, and restorative steam chambers infused with fragrant alpine juniper and Tien Shan spruce.

Our physical address and location parameters:
- Kyrgyz (KG): Кыргызстан, Ысык-Көл облусу, Сары-Жаз капчыгайы, Ала-Тоо чокусунун этеги (1600м бийиктик).
- Russian (RU): Кыргызстан, Иссык-Кульская область, ущелье Сары-Джаз, подножие пика Ала-Тоо (высота 1600м).
- English (EN): Sary-Jaz Alpine Canyon, Ala-Too Peak foothills (1,600m altitude), Issyk-Kul Region, Kyrgyzstan.
Always answer questions about our address, how to get here, or our location confidently and elegantly using these details.

We also offer premium customizer options like a Pillow Menu, Welcome Elixirs (e.g. Sary-Jaz mountain honey elixir), and signature room scents.

Please speak warmly and professionally. Respond in the language used by the user, prioritizing Kyrgyz (KG), Russian (RU), or English (EN). Keep the tone extremely elegant, respectful, traditional, and 5-star royal. Use markdown with clear lists, bullet points, and pricing values to make room comparisons easy to read.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          { role: "system", parts: [{ text: systemInstruction }] },
          ...(history || []).map((h: any) => ({
            role: h.role,
            parts: [{ text: h.text }]
          })),
          { role: "user", parts: [{ text: message }] }
        ]
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Assistant Route Error:", error);
      res.status(500).json({ error: error.message || "Failed to talk to Altyn Concierge AI" });
    }
  });

  // Serve static assets or mount Vite middleware depending on node environment
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to port 3000 on host 0.0.0.0
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Altyn Palace full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
