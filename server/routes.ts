import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertContactSubmissionSchema, insertPhotoSchema } from "@shared/schema";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  },
});

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Serve uploaded files
  app.use('/uploads', express.static(uploadsDir));

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form endpoint disabled - using mailto: links instead
  // app.post('/api/contact', async (req, res) => {
  //   // This endpoint is no longer used since contact form now uses mailto: links
  //   res.status(410).json({ message: 'Contact form now uses mailto links' });
  // });

  // Photo gallery routes
  app.get('/api/photos', async (req, res) => {
    try {
      const photos = await storage.getPhotos();
      res.json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({ message: 'Failed to fetch photos' });
    }
  });

  // Admin-only photo upload
  app.post('/api/photos', isAuthenticated, upload.single('photo'), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const fileName = `${Date.now()}-${req.file.originalname}`;
      const filePath = path.join(uploadsDir, fileName);
      const thumbnailName = `thumb-${fileName}`;
      const thumbnailPath = path.join(uploadsDir, thumbnailName);

      // Process and save original image
      await sharp(req.file.buffer)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 90 })
        .toFile(filePath);

      // Create thumbnail
      await sharp(req.file.buffer)
        .resize(300, 200, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);

      // Save to database
      const photoData = {
        filename: fileName,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size.toString(),
        url: `/uploads/${fileName}`,
        thumbnailUrl: `/uploads/${thumbnailName}`,
        uploadedBy: userId,
      };

      const photo = await storage.createPhoto(photoData);
      res.json(photo);
    } catch (error) {
      console.error('Photo upload error:', error);
      res.status(500).json({ message: 'Failed to upload photo' });
    }
  });

  // Admin-only photo deletion
  app.delete('/api/photos/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const photoId = parseInt(req.params.id);
      if (isNaN(photoId)) {
        return res.status(400).json({ message: 'Invalid photo ID' });
      }

      await storage.deletePhoto(photoId);
      res.json({ success: true });
    } catch (error) {
      console.error('Photo deletion error:', error);
      res.status(500).json({ message: 'Failed to delete photo' });
    }
  });

  // Admin-only contact submissions
  app.get('/api/admin/contact-submissions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ message: 'Failed to fetch submissions' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
