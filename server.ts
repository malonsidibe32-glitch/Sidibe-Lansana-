import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Running in fallback mode.");
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

// Fallback story generator in case Gemini is not available or fails
function getFallbackAnalysis(
  jobTitle: string,
  tasks: string,
  impact: string,
  bossName: string,
  companyName: string
) {
  const boss = bossName || "Moussa";
  const company = companyName || "SolarisTech";
  const title = jobTitle || "Comptable";
  
  return {
    story: `J'ai toujours cru que les employés discrets comme les ${title} étaient remplaçables.

${boss}, DG de ${company}, pensait pareil de son employé discret.

Toujours dans son coin, jamais à se vanter de son travail, jamais à monopoliser la parole en réunion. Il décide de s'en séparer un mardi matin.

Mercredi, c'est le début du chaos. Trois alertes majeures tombent. Les dossiers essentiels sur "${tasks || "les opérations quotidiennes"}" sont introuvables. Personne ne sait où chercher.

Jeudi, le système commence à s'effondrer. Les processus liés à "${impact || "la gestion critique"}" s'arrêtent net. Les partenaires et clients s'impatientent, menaçant de couper les ponts.

En 48 heures, ${company} réalise l'irréparable. Ce que cet employé gérait en silence, cinq personnes réunies n'arrivent même pas à le comprendre.

${boss} tente d'appeler le vendredi. Le téléphone sonne dans le vide.

Ce silence n'était pas de la faiblesse. C'était le pilier invisible de la boîte.`,
    irreplaceabilityScore: 88,
    impactAnalysis: `Votre rôle de ${title} est un "Pilier Silencieux". Vous gérez des flux d'informations et des processus ("${tasks}") dont l'absence paralyse l'activité en moins de 48 heures. Votre direction ne s'en rend pas compte car tout fonctionne parfaitement grâce à votre discrétion.`,
    timeline: [
      { day: "Mardi (Départ)", event: `Départ de l'employé. ${boss} pense avoir fait une économie d'échelle.`, status: "warning" },
      { day: "Mercredi (24h)", event: `Premiers blocages sur "${tasks || "les dossiers de fond"}". Les collaborateurs cherchent vos accès.`, status: "critical" },
      { day: "Jeudi (48h)", event: `Arrêt total des processus liés à "${impact || "la facturation ou livraison"}". Panique générale chez ${company}.`, status: "danger" },
      { day: "Vendredi (72h)", event: `Tentative désespérée de vous recontacter. Proposition de doublement de salaire ignorée.`, status: "danger" }
    ],
    advice: [
      "Documentez vos processus mais gardez les clés d'architecture complexes pour vous.",
      "Commencez à envoyer un récapitulatif hebdomadaire chiffré et ultra-court de vos accomplissements.",
      "Préparez une demande de revalorisation salariale en listant les 3 catastrophes évitées ce mois-ci.",
      "Rappelez-vous : votre silence a une valeur marchande. Ne la bradez pas."
    ]
  };
}

// API endpoint for custom story and analysis
app.post("/api/analyze-job", async (req, res) => {
  const { jobTitle, tasks, impact, bossName, companyName } = req.body;

  try {
    const gemini = getGeminiClient();
    
    const prompt = `Tu es un expert en ressources humaines et un romancier d'entreprise talentueux, spécialisé dans les récits percutants sur la valeur invisible des salariés discrets (style LinkedIn dramatique, phrases courtes, percutantes).
    
    Crée une histoire de "mise en scène" personnalisée et réaliste inspirée de l'histoire d'Awa (la comptable invisible de SolarisTech virée par le DG Moussa) à partir des informations de l'utilisateur :
    - Poste occupé : ${jobTitle || "Employé discret"}
    - Tâches gérées dans l'ombre : ${tasks || "les opérations clés"}
    - Impact en cas de départ / Ce qui casserait : ${impact || "les systèmes principaux"}
    - Nom du Boss / DG : ${bossName || "le directeur"}
    - Nom de l'entreprise : ${companyName || "l'entreprise"}
    
    Tu dois renvoyer STRICTEMENT un objet JSON valide, sans balises markdown de code, sans texte avant ni après. L'objet doit avoir exactement la structure suivante :
    {
      "story": "Une histoire dramatique en français avec des phrases très courtes, percutantes, structurée de Mardi à Vendredi, montrant l'effondrement rapide de la boîte suite au départ.",
      "irreplaceabilityScore": un nombre entier entre 1 et 100 représentant le score d'irremplaçabilité,
      "impactAnalysis": "Une analyse psychologique et professionnelle rapide en français (2-3 phrases) de la valeur de ce poste et pourquoi le boss ne s'en rend pas compte.",
      "timeline": [
        { "day": "Mardi (Départ)", "event": "Description courte de ce qui se passe le mardi", "status": "warning" },
        { "day": "Mercredi (24h)", "event": "Description courte de la première panne / crise du mercredi", "status": "critical" },
        { "day": "Jeudi (48h)", "event": "Description de la paralysie totale le jeudi", "status": "danger" },
        { "day": "Vendredi (72h)", "event": "L'appel manqué et le constat d'échec du boss", "status": "danger" }
      ],
      "advice": [
        "Conseil 1 pour rendre son travail visible sans paraître vantard",
        "Conseil 2 sur la gestion de ses accès et compétences clés",
        "Conseil 3 sur la négociation salariale",
        "Conseil 4 sur la posture professionnelle face au management"
      ]
    }
    
    Règles de style :
    - Ton dramatique, captivant, sérieux.
    - Style LinkedIn (sauts de ligne fréquents, une phrase par paragraphe pour l'histoire).
    - Utilise bien les noms fournis.
    - Renvoyer uniquement le JSON brut.`;

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text || "";
    const cleanJsonText = responseText.trim().replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    const result = JSON.parse(cleanJsonText);
    res.json(result);
  } catch (error: any) {
    console.error("Error analyzing job:", error);
    // Return high-quality fallback data in case of error or missing API key
    const fallback = getFallbackAnalysis(
      jobTitle,
      tasks,
      impact,
      bossName,
      companyName
    );
    res.json(fallback);
  }
});

// Setup Vite or static serving
async function startServer() {
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
