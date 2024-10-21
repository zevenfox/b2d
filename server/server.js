import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url'; // Needed for __dirname with ES modules
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { hashPassword, comparePassword, generateToken, authenticateToken } from './auth.js';

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());


const s3Bucket = process.env.S3_BUCKET;
const s3Region = process.env.S3_REGION;
const s3AccessKey = process.env.S3_ACCESS_KEY;
const s3SecretKey = process.env.S3_SECRET_KEY;

const s3Client = new S3Client({
    region: s3Region,
    credentials: {
        accessKeyId: s3AccessKey,
        secretAccessKey: s3SecretKey,
    },
});

app.post('/api/register', async (req, res) => {
  const {
      username, password, first_name, last_name, email, role,
      // StartUp specific fields
      valuation_cap, funding_goal, min_investment, max_investment, deadline,
      opportunity, opportunity_image, product, product_image, business_model, business_model_image,
      company_name, company_description, company_logo, company_background,
      company_business_type, company_email, company_website, company_telephone, company_address
  } = req.body;

  try {
      const hashedPassword = await hashPassword(password);
      // Create user record
      const newUser = await prisma.user.create({
          data: {
              username,
              password: hashedPassword,
              first_name,
              last_name,
              email,
              role,
          },
      });

      // Depending on the role, create additional records
      if (role === 'start_up') {
          // Create additional data for startups
          await prisma.startUp.create({
              data: {
                  user_id: newUser.id,
                  valuation_cap,
                  funding_goal,
                  min_investment,
                  max_investment,
                  deadline,
                  opportunity,
                  opportunity_image,
                  product,
                  product_image,
                  business_model,
                  business_model_image,
                  company_name,
                  company_description,
                  company_logo,
                  company_background,
                  company_business_type,
                  company_email,
                  company_website,
                  company_telephone,
                  company_address,
              },
          });
      }

      res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user.' });
  }
});


// Login User
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(400).json({ error: 'User not found.' });

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials.' });

    const token = generateToken(user);
    const expiresIn = 3600; // 1 hour
    res.json({ message: 'Login successful', token, expiresIn });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in.' });
  }
});


// // Setting up __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static images
// app.use('/images', express.static(path.join(__dirname, '../client/src/images')));

// Fetch specific startup by ID
app.get("/api/startups/:id", async (req, res) => {
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

    const featuredDeals = await Promise.all(startups.map(async (startup) => {
      const raised = startup.investments.reduce((sum, investment) => sum + investment.investment_amount, 0);
      const percentRaised = startup.funding_goal ? (raised / startup.funding_goal) * 100 : 0;

      // Fetch signed URLs for company_logo and company_background if they exist
      let companyLogoUrl = '';
      let companyBackgroundUrl = '';

      // Generate signed URL for company_logo
      if (startup.company_logo) {
        try {
          const logoParams = {
            Bucket: s3Bucket,
            Key: startup.company_logo, // S3 key for company_logo
          };
          const logoCommand = new GetObjectCommand(logoParams);
          companyLogoUrl = await getSignedUrl(s3Client, logoCommand, { expiresIn: 3600 });
        } catch (error) {
          console.error(`Error generating signed URL for logo of startup ID: ${startup.id}`, error);
        }
      }

      // Generate signed URL for company_background
      if (startup.company_background) {
        try {
          const backgroundParams = {
            Bucket: s3Bucket,
            Key: startup.company_background, // S3 key for company_background
          };
          const backgroundCommand = new GetObjectCommand(backgroundParams);
          companyBackgroundUrl = await getSignedUrl(s3Client, backgroundCommand, { expiresIn: 3600 });
        } catch (error) {
          console.error(`Error generating signed URL for background of startup ID: ${startup.id}`, error);
        }
      }

      return {
        id: startup.id,
        company_name: startup.company_name,
        company_logo: companyLogoUrl, // Signed URL for company_logo
        company_background: companyBackgroundUrl, // Signed URL for company_background
        company_description: startup.company_description,
        category: startup.company_business_type,
        funding_goal: startup.funding_goal,
        raised: raised,
        percentRaised: Math.round(percentRaised),
        date: startup.deadline,
        description: startup.opportunity,
      };
    }));

    res.json(featuredDeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching featured deals" });
  }
});

// Fetch startups by types
app.get("/api/business-type", async (req, res) => {
  try {
    const { type } = req.query;

    const startups = await prisma.startUp.findMany({
      where: type ? { company_business_type: type } : {},
    });

    const mappedStartups = startups.map(startup => {
      const raised = (startup.investments || []).reduce((sum, investment) => sum + investment.investment_amount, 0);
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
        date: startup.deadline,
        description: startup.opportunity,
      };
    });

    res.json(mappedStartups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching startups" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});