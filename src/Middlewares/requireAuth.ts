import { Request, Response, NextFunction } from "express";

export const requiresAuth = async ( req:Request,res:Response, next:NextFunction) => {
  //@ts-ignore
  const user = req.user;
  if (!user) {
    return res.status(403).json({message: 'Kindly login to continue'});
  }
  return next();
};