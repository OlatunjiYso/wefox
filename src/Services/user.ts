import bcrypt from 'bcrypt';
import { ILoginRequest, ISignupRequest, IAuthServiceResponse } from '../Interfaces/users';
import User from '../Models/user';
import { Session, SessionDocument } from '../Models/session';
import { decodeToken, generateAccessToken, generateRefreshToken } from '../helper';

/**
 * @description A Service for registering a new user
 * @param {Object} user - user details
 * @returns Object
 */
export const addUser = async (user: ISignupRequest) => {
    const { email, password } = user;
    try {
        const emailTaken = await findExistingUser(email);
        if (emailTaken) return sendAuthResponse(false, 409, 'Email taken', '', '');
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        const newUser = new User(user);
        const createdUser = await newUser.save();
        const userId = createdUser.id;
        const session = await createSession(userId);
        const sessionId = session.id;
        const accessToken = generateAccessToken({ userId });
        const refreshToken = generateRefreshToken({ userId, sessionId })
        return sendAuthResponse(true, 201, 'signup successful', accessToken, refreshToken);
    }
    catch (err) {
        let errorMessage = (err as Error).message;
        return sendAuthResponse(false, 503, errorMessage, '', '');
    }
}

/**
 * @description A Service for authenticating users.
 * @param {*} credentials - user claims.
 * @returns Object.
 */
export const authenticate = async (credentials: ILoginRequest) => {
    const { password, email } = credentials;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return sendAuthResponse(false, 401, 'Invalid Password or Email', '', '');
        const hash: string = existingUser.password;
        const passwordIsValid: boolean = await bcrypt.compare(password, hash);
        if (!passwordIsValid) return sendAuthResponse(false, 401, 'Invalid Password or Email', '', '');
        const userId = existingUser.id;
        const session = await createSession(userId);
        const sessionId = session.id;
        const accessToken = generateAccessToken({ userId });
        const refreshToken = generateRefreshToken({ userId, sessionId });
        return sendAuthResponse(true, 200, 'Login Successful', accessToken, refreshToken);
    }
    catch (err) {
        const errorMessage = (err as Error).message;
        return sendAuthResponse(false, 503, errorMessage, '', '');
    }
}

/**
 * @desc Helper Method to check if a user with specified Email exists
 * @returns User
 */
const findExistingUser = async (email: string) => {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return null;
        return existingUser;
    } catch (err) {
        const errorMessage = (err as Error).message;
        console.log(errorMessage)
    }
}

/**
 * @desc Helper Method to that returns a response to the calling controller
 * @returns {IAuthServiceResponse}
 */
const sendAuthResponse = (
    success: boolean,
    statusCode: number,
    message: string,
    accessToken: string,
    refreshToken: string): IAuthServiceResponse => {
    return {
        success,
        statusCode,
        message,
        accessToken,
        refreshToken
    }
}

/**
 * @desc creates a session
 * @returns 
 */
const createSession = async(userId: string):Promise<SessionDocument>=> {
    await Session.deleteOne({ userId });
    const newSession = new Session({ userId });
    const session = await newSession.save();
    return session;
}

export const deleteSession = async(userId: string):Promise<boolean>=> {
    try {
        await Session.deleteOne({ userId });
        return true;
    } 
    catch(err)
    { return false; }
}

export const reIssueAccessToken = async(refreshToken:string):Promise<string|null> =>  {
    // Decode the refresh token
    const  decoded  = decodeToken(refreshToken).decoded;
    if(typeof decoded === 'string') return null;
    if (!decoded || !(decoded.sessionId)) return null;
    const session = await Session.findById(decoded.sessionId);
    const user = await User.findById(session?.userId);
    if (!user) return null;
    const userId = user.id;
    const accessToken = generateAccessToken({ userId });
    return accessToken;
  }