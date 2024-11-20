import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
import nodemailer from 'nodemailer';

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
    res.json({ message: 'Login successful', token, expiresIn, username: user.username, role: user.role, id: user.id});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in.' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    // Check if the user exists in the database
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // Generate a password reset token
    const resetToken = generateToken(user);

    // Store the reset token and its expiry in the database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour from now
      },
    });

    // Create a transport for sending email
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || 'baron.marquardt@ethereal.email',
        pass: process.env.EMAIL_PASS || 'YVS8HWYAfmetKBm69x'
      },
      debug: true // Enable debugging
    });

    // Construct the reset link
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // Configure the email details
    const mailOptions = {
      from: process.env.EMAIL_USER || 'baron.marquardt@ethereal.email',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.status(200).json({ 
      message: 'Password reset email sent successfully.',
      previewUrl: nodemailer.getTestMessageUrl(info) // For testing purposes
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Error sending password reset email. Please try again.' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required.' });
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // Find the user with this token and make sure it hasn't expired
      const user = await prisma.user.findFirst({
          where: {
              id: decoded.userId,
              resetToken: token,
              resetTokenExpiry: {
                  gt: new Date()
              }
          }
      });

      if (!user) {
          return res.status(400).json({ error: 'Invalid or expired reset token.' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and clear the reset token
      await prisma.user.update({
          where: { id: user.id },
          data: {
              password: hashedPassword,
              resetToken: null,
              resetTokenExpiry: null
          }
      });

      res.json({ message: 'Password reset successful.' });
  } catch (error) {
      console.error('Error resetting password:', error);
      
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
          return res.status(400).json({ error: 'Invalid or expired reset token.' });
      }
      
      res.status(500).json({ error: 'Error resetting password.' });
  }
});


// Fetch specific startup by ID
app.get("/api/startups/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const startup = await prisma.startUp.findUnique({ where: { id: parseInt(id) } });

    if (startup) {
      // Initialize variables for all image fields
      let companyLogoUrl = '';
      let opportunityImageUrl = '';
      let productImageUrl = '';
      let businessModelImageUrl = '';

      // Function to generate signed URLs for S3
      const generateSignedUrl = async (imageKey) => {
        if (imageKey) {
          try {
            const params = {
              Bucket: s3Bucket,
              Key: imageKey, // S3 key for the image
            };
            const command = new GetObjectCommand(params);
            return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
          } catch (error) {
            console.error(`Error generating signed URL for image: ${imageKey}`, error);
            return ''; // Return an empty string if there was an error
          }
        }
        return ''; // Return an empty string if no image key is provided
      };

      // Generate signed URLs for all image fields
      companyLogoUrl = await generateSignedUrl(startup.company_logo);
      opportunityImageUrl = await generateSignedUrl(startup.opportunity_image);
      productImageUrl = await generateSignedUrl(startup.product_image);
      businessModelImageUrl = await generateSignedUrl(startup.business_model_image);

      // Return the startup with all the signed URLs
      res.json({
        ...startup,
        company_logo: companyLogoUrl, // Signed URL for company_logo
        opportunity_image: opportunityImageUrl, // Signed URL for opportunity_image
        product_image: productImageUrl, // Signed URL for product_image
        business_model_image: businessModelImageUrl, // Signed URL for business_model_image
      });
    } else {
      res.status(404).json({ error: "Startup not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the startup." });
  }
});

app.get("/api/startupsid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const startup = await prisma.startUp.findUnique({ where: { user_id: parseInt(id) } });

    if (startup) {
      // Initialize variables for all image fields
      let companyLogoUrl = '';
      let opportunityImageUrl = '';
      let productImageUrl = '';
      let businessModelImageUrl = '';

      // Function to generate signed URLs for S3
      const generateSignedUrl = async (imageKey) => {
        if (imageKey) {
          try {
            const params = {
              Bucket: s3Bucket,
              Key: imageKey, // S3 key for the image
            };
            const command = new GetObjectCommand(params);
            return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
          } catch (error) {
            console.error(`Error generating signed URL for image: ${imageKey}`, error);
            return ''; // Return an empty string if there was an error
          }
        }
        return ''; // Return an empty string if no image key is provided
      };

      // Generate signed URLs for all image fields
      companyLogoUrl = await generateSignedUrl(startup.company_logo);
      opportunityImageUrl = await generateSignedUrl(startup.opportunity_image);
      productImageUrl = await generateSignedUrl(startup.product_image);
      businessModelImageUrl = await generateSignedUrl(startup.business_model_image);

      // Return the startup with all the signed URLs
      res.json({
        ...startup,
        company_logo: companyLogoUrl, // Signed URL for company_logo
        opportunity_image: opportunityImageUrl, // Signed URL for opportunity_image
        product_image: productImageUrl, // Signed URL for product_image
        business_model_image: businessModelImageUrl, // Signed URL for business_model_image
      });
    } else {
      res.status(404).json({ error: "Startup not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the startup." });
  }
});


// Fetch all startups
app.get("/api/allstartups", async (req, res) => {
  try {
    const startups = await prisma.startUp.findMany();

    const mappedStartups = await Promise.all(startups.map(async (startup) => {
      const raised = (startup.investments || []).reduce((sum, investment) => sum + investment.investment_amount, 0);
      const percentRaised = startup.funding_goal ? (raised / startup.funding_goal) * 100 : 0;

      // Generate signed URLs for company_logo and company_background if they exist
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
      if (startup.opportunity_image) {
        try {
          const backgroundParams = {
            Bucket: s3Bucket,
            Key: startup.opportunity_image, // S3 key for company_background
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
        valuation_cap: startup.valuation_cap,
        funding_goal: startup.funding_goal,
        raised: raised,
        percentRaised: Math.round(percentRaised),
        date: startup.deadline,
        description: startup.opportunity,
      };
    }));

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
      if (startup.opportunity_image) {
        try {
          const backgroundParams = {
            Bucket: s3Bucket,
            Key: startup.opportunity_image, // S3 key for company_background
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
        valuation_cap: startup.valuation_cap,
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

    const mappedStartups = await Promise.all(startups.map(async (startup) => {
      const raised = (startup.investments || []).reduce((sum, investment) => sum + investment.investment_amount, 0);
      const percentRaised = startup.funding_goal ? (raised / startup.funding_goal) * 100 : 0;

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
          companyLogoUrl = await getSignedUrl(s3Client, logoCommand, { expiresIn: 3600 }); // URL expires in 1 hour
        } catch (error) {
          console.error(`Error generating signed URL for logo of startup ID: ${startup.id}`, error);
        }
      }

      // Generate signed URL for company_background
      if (startup.opportunity_image) {
        try {
          const backgroundParams = {
            Bucket: s3Bucket,
            Key: startup.opportunity_image, // S3 key for company_background
          };
          const backgroundCommand = new GetObjectCommand(backgroundParams);
          companyBackgroundUrl = await getSignedUrl(s3Client, backgroundCommand, { expiresIn: 3600 }); // URL expires in 1 hour
        } catch (error) {
          console.error(`Error generating signed URL for background of startup ID: ${startup.id}`, error);
        }
      }

      return {
        id: startup.id,
        company_name: startup.company_name,
        company_logo: companyLogoUrl, // Return the signed URL
        company_background: companyBackgroundUrl, // Return the signed URL
        company_description: startup.company_description,
        category: startup.company_business_type,
        valuation_cap: startup.valuation_cap,
        funding_goal: startup.funding_goal,
        raised: raised,
        percentRaised: Math.round(percentRaised),
        date: startup.deadline,
        description: startup.opportunity,
      };
    }));

    res.json(mappedStartups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching startups" });
  }
});


app.post('/api/invest', authenticateToken, async (req, res) => {
  try {
    const { investment_amount, startup_id, reason } = req.body;
    console.log('User Data:', req.user);

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { userId: investor_user_id, role } = req.user;

    // Role verification
    if (role !== 'investor') {
      return res.status(403).json({ message: "Only investors can make an investment" });
    }

    // Input validation
    if (!investment_amount || !startup_id || !reason) {
      return res.status(400).json({
        message: "Investment amount, startup ID, and reason are required"
      });
    }

    // Fetch the startup
    const startup = await prisma.startUp.findUnique({
      where: { user_id: startup_id }
    });

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    // Validate investment amount
    if (investment_amount < startup.min_investment) {
      return res.status(400).json({
        message: `Minimum investment amount is $${startup.min_investment}`
      });
    }

    if (investment_amount > startup.max_investment) {
      return res.status(400).json({
        message: `Maximum investment amount is $${startup.max_investment}`
      });
    }

    // Check if deadline has passed
    if (new Date() > new Date(startup.deadline)) {
      return res.status(400).json({ message: "Investment deadline has passed" });
    }

    // Create the investment
    const investmentDeal = await prisma.investmentDeal.create({
      data: {
        investor_user_id,
        startup_id,
        investment_amount: parseFloat(investment_amount),
        reason,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    res.status(201).json({
      message: "Investment submitted successfully",
      data: investmentDeal
    });

  } catch (error) {
    console.error('Investment creation error:', error);
    if (error instanceof prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        message: error.message,
        code: error.code,
      });
    }
    return res.status(500).json({
      message: "An error occurred while processing your investment",
      error: error.message
    });
  }
});



// Get API to show all upcoming investment requests
app.get('/api/investment_requests/:id', async (req, res) => {
  const { id } = req.params; // Extract startup_id from the route parameters

  try {
    // Fetch pending investment deals for the specified startup_id
    const investmentRequests = await prisma.investmentDeal.findMany({
      where: {
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
      id: deal.id,
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

app.put('/api/investment_requests/:id', async (req, res) => {
  const { id } = req.params; // Get the investment request ID from the URL
  const { status } = req.body; // Get the new status from the request body

  try {
    // Retrieve the investment request by ID
    const investmentRequest = await prisma.investmentDeal.findUnique({
      where: { id: Number(id) },
    });

    if (!investmentRequest) {
      return res.status(404).json({ error: 'Investment request not found' });
    }

    // Only update the funding_goal if the status is approved
    if (status === 'accepted') {
      await prisma.startUp.update({
        where: { user_id: investmentRequest.startup_id }, // Use startup_id from InvestmentDeal
        data: {
          funding_goal: {
            increment: investmentRequest.investment_amount, // Add the investment amount to funding_goal
          },
        },
      });
    }

    // Update the investment request status
    const updatedRequest = await prisma.investmentDeal.update({
      where: { id: Number(id) },
      data: { status }, // Set the new status
    });

    res.json(updatedRequest);
  } catch (err) {
    console.error('Error updating investment request:', err.message);
    return res.status(500).json({ error: 'Database update failed', details: err.message });
  }
});


app.get('/api/investor_requests/:id', async (req, res) => {
  const { id } = req.params; // Extract the investment deal ID from the route parameters

  try {
    const investmentDeal = await prisma.investmentDeal.findMany({
      where: {
        investor_user_id: Number(id), // Ensure id is converted to a number
      },
    });

    // If no investment deal is found, return a 404 status
    if (!investmentDeal) {
      return res.status(404).json({ message: 'Investment request not found' });
    }

    // Return the investment deal as the response
    res.json(investmentDeal);
  } catch (err) {
    console.error('Error fetching investment request:', err.message);
    return res.status(500).json({ error: 'Failed to fetch investment request', details: err.message });
  }
});


// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

app.get('/api/investorpanel_requests/:id', async (req, res) => {
  const { id } = req.params; // Extract startup_id from the route parameters

  try {
    // Fetch pending investment deals for the specified startup_id
    const investmentRequests = await prisma.investmentDeal.findMany({
      where: {
        investor_user_id: Number(id), // Ensure id is converted to a number if needed
      },
    });

    // If no investment requests are found, return an appropriate response
    if (investmentRequests.length === 0) {
      return res.status(404).json({ message: 'No investment requests found for this startup' });
    }

    // Get the IDs of users from the investment requests
    const userIds = investmentRequests.map(deal => deal.startup_id);

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

    const companies = await prisma.startUp.findMany({
      where: {
        user_id: { in: userIds }, // Fetch users whose IDs are in the userIds array
      },
      select: {
        id: true,
        user_id: true,
        company_name: true,
      },
    });

    const startupMap = {};
    companies.forEach(startup => {
      startupMap[startup.user_id] = {
        id: startup.id,
        user_id: startup.user_id,
        company_name: startup.company_name,
      };
    });

    // Format the response by combining investment requests with user details
    const formattedRequests = investmentRequests.map(deal => ({
      deal_id: deal.id,
      id: startupMap[deal.startup_id]?.id || null,
      startup_id: startupMap[deal.startup_id]?.user_id || null,
      company_name: startupMap[deal.startup_id]?.company_name || null,
      first_name: userMap[deal.startup_id]?.first_name || null,
      last_name: userMap[deal.startup_id]?.last_name || null,
      email: userMap[deal.startup_id]?.email || null,
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