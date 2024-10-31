import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from '@prisma/client';

// Import the AWS SDK and required classes using 'import' syntax
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Import the multer library for handling file uploads
import multer from 'multer';
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Import the auth helper functions
import { hashPassword, comparePassword, generateToken, authenticateToken } from './auth.js';

// Import dotenv to load environment variables
import dotenv from 'dotenv';

dotenv.config();

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

// Investor registration
app.post('/api/register/investor', async (req, res) => {
  const {
    username, password, first_name, last_name, email
  } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user record with role as investor
    const newInvestor = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        first_name,
        last_name,
        email,
        role: 'investor', // Set the role explicitly to 'investor'
      },
    });

    // Return success response
    res.status(201).json({ message: 'Investor registered successfully', user: newInvestor });
  } catch (error) {
    console.error('Error registering investor:', error);

    // Handle unique constraint error specifically
    if (error.code === 'P2002' && error.meta && error.meta.target === 'User_username_key') {
      return res.status(400).json({ error: 'Username already taken' });
    }

    res.status(500).json({ error: 'Error registering investor.' });
  }
});

app.post('/api/register/startup', upload.fields([
  { name: 'opportunity_image', maxCount: 1 },
  { name: 'product_image', maxCount: 1 },
  { name: 'business_model_image', maxCount: 1 },
  { name: 'company_logo', maxCount: 1 }
]), async (req, res) => {
  const {
    username, password, first_name, last_name, email,
    valuation_cap, funding_goal, min_investment, max_investment, deadline,
    opportunity, product, business_model,
    company_name, company_description, company_background,
    company_business_type, company_email, company_website, company_telephone, company_address
  } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Upload images to S3 if provided
    const uploadImageToS3 = async (file) => {
      const imageName = `${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: s3Bucket,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      return imageName;
    };

    const opportunityImage = req.files['opportunity_image'] ? await uploadImageToS3(req.files['opportunity_image'][0]) : null;
    const productImage = req.files['product_image'] ? await uploadImageToS3(req.files['product_image'][0]) : null;
    const businessModelImage = req.files['business_model_image'] ? await uploadImageToS3(req.files['business_model_image'][0]) : null;
    const companyLogo = req.files['company_logo'] ? await uploadImageToS3(req.files['company_logo'][0]) : null;

    // Create user record with role as startup
    const newStartupUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        first_name,
        last_name,
        email,
        role: 'start_up',
      },
    });

    // Convert string values to numbers and format the deadline
    const startupData = {
      valuation_cap: parseFloat(valuation_cap),
      funding_goal: parseFloat(funding_goal),
      min_investment: parseFloat(min_investment),
      max_investment: parseFloat(max_investment),
      deadline: new Date(deadline).toISOString(),
      opportunity,
      opportunity_image: opportunityImage,
      product,
      product_image: productImage,
      business_model,
      business_model_image: businessModelImage,
      company_name,
      company_description,
      company_logo: companyLogo,
      company_background,
      company_business_type,
      company_email,
      company_website,
      company_telephone,
      company_address,
      user: {
        connect: { id: newStartupUser.id },
      },
    };

    // Validate numeric values
    if (isNaN(startupData.valuation_cap) || isNaN(startupData.funding_goal) || 
        isNaN(startupData.min_investment) || isNaN(startupData.max_investment)) {
      throw new Error('Invalid numeric values provided');
    }

    // Create StartUp record linked to the user
    const newStartup = await prisma.startUp.create({
      data: startupData
    });

    // Return success response
    res.status(201).json({ message: 'Startup registered successfully', user: newStartupUser });
  } catch (error) {
    console.error('Error registering startup:', error);

    if (error.message === 'Invalid numeric values provided') {
      return res.status(400).json({ error: 'Invalid numeric values provided for financial fields' });
    }

    if (error.code === 'P2002' && error.meta && error.meta.target === 'User_username_key') {
      return res.status(400).json({ error: 'Username already taken' });
    }

    res.status(500).json({ error: 'Error registering startup.' });
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
    res.json({ message: 'Login successful', token, expiresIn, username: user.username, role: user.role});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in.' });
  }
});


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
app.get("/api/allstartups", async (req, res) => {
  try {

    const startups = await prisma.startUp.findMany();

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

// Get API to show all upcoming investment requests
app.get('/api/investment_requests/:id', async (req, res) => {
  const { id } = req.params; // Extract startup_id from the route parameters

  try {
    // Fetch pending investment deals for the specified startup_id
    const investmentRequests = await prisma.investmentDeal.findMany({
      where: {
        status: 'pending',
        startup_id: Number(id), // Ensure id is converted to a number if needed
      },
    });

    // If no investment requests are found, return an appropriate response
    if (investmentRequests.length === 0) {
      return res.status(404).json({ message: 'No investment requests found for this startup' });
    }

    // Get the IDs of users from the investment requests
    const userIds = investmentRequests.map(deal => deal.investor_user_id);

    // Fetch users corresponding to those IDs
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds }, // Fetch users whose IDs are in the userIds array
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    // Create a mapping of users by their IDs
    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user;
    });

    // Format the response by combining investment requests with user details
    const formattedRequests = investmentRequests.map(deal => ({
      first_name: userMap[deal.investor_user_id]?.first_name || null,
      last_name: userMap[deal.investor_user_id]?.last_name || null,
      email: userMap[deal.investor_user_id]?.email || null,
      investment_amount: deal.investment_amount,
      reason: deal.reason,
      status: deal.status,
    }));

    res.json({ investment_requests: formattedRequests });
  } catch (err) {
    console.error('Error fetching investment requests:', err.message);
    return res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});


// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});