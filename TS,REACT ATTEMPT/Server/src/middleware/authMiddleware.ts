import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';

interface SessionUser {
    user: {
      id: string;
      username: string;
    };
  }

  export const authMiddleware: RequestHandler<ParamsDictionary, any, any, ParsedQs, SessionUser> = async (req, res, next) => {
    try {
      const sessionUser = req.session.user;
  
      if (!sessionUser) {
        throw new Error('User not authenticated');
      }
  
      const user = await User.findById(sessionUser.id);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };