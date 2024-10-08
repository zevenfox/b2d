import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url'; // Needed for __dirname with ES modules

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Setting up __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images
app.use('/images', express.static(path.join(__dirname, '../client/src/images')));

// Fetch specific startup by ID
app.get("/api/StartUps/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const startup = await prisma.startUp.findUnique({ where: { id: parseInt(id) } });
    if (startup) {
      res.json(startup);
    } else {
      res.status(404).json({ error: "Startup not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the startup." });
  }
});

// Fetch all startups
app.get("/api/startups", async (req, res) => {
  try {
    const startups = await prisma.startUp.findMany({
      select: {
        company_name: true,
        id: true,
      },
    });
    res.json(startups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching startups" });
  }
});

// Fetch featured deals with a default limit of 8
app.get("/api/featured-deals", async (req, res) => {
  const limit = parseInt(req.query.limit) || 8;

  try {
    const startups = await prisma.startUp.findMany({
      take: limit,
      include: {
        investments: {
          select: {
            investment_amount: true,
          },
        },
      },
    });

    const featuredDeals = startups.map(startup => {
      const raised = startup.investments.reduce((sum, investment) => sum + investment.investment_amount, 0);
      const percentRaised = startup.funding_goal ? (raised / startup.funding_goal) * 100 : 0;

      return {
        id: startup.id,
        company_name: startup.company_name,
        company_logo: startup.company_logo,
        company_background: startup.company_background,
        company_description: startup.company_description,
        category: startup.company_business_type,
        funding_goal: startup.funding_goal,
        raised: raised,
        percentRaised: Math.round(percentRaised),
        date: startup.deadline, // Format this in the frontend if needed
        description: startup.opportunity,
      };
    });

    res.json(featuredDeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching featured deals" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});