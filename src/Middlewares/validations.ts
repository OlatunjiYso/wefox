import { body, check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';

export const validateSignup = [
  body('fullName', 'full name is required').not().isEmpty().trim().escape(),
  body('email', 'enter a valid email').isEmail().normalizeEmail(),
  body('password', 'Password should be a min of 5 characters').isLength({ min: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
