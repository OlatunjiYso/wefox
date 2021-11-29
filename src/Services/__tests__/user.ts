import User from '../../Models/user';
import db, { dbUrl } from '../../db';
import { createRegisteredUser, createUnRegisteredUser } from '../../tests/helper';
import { addUser, authenticate } from '../user';
import { Session } from '../../Models/session';


beforeAll(async () => {
    try {
        await db.connect();
    }
    catch (err) {
        console.log('Error connecting to DB', (err as Error).message)
    }

});

afterAll(async () => {
    await User.deleteMany();
    await Session.deleteMany();
    await db.disconnect();
});

describe('All tests for User service', () => {
    it('should successfully signup a user', async () => {
        const user = await createUnRegisteredUser();
        const { email, password, fullName } = user;
        await expect(addUser({ email, password, fullName })).resolves
            .toEqual({
                success: true,
                statusCode: 201,
                message: 'signup successful',
                accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
                refreshToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
            })
    });
    it('should report a Conflict error if an existing email is supplied for signup', async () => {
        const user = await createRegisteredUser();
        const { email, password, fullName } = user;
        await expect(addUser({ email, password, fullName })).resolves
            .toEqual({
                success: false,
                statusCode: 409,
                message: 'Email taken',
                accessToken: expect.stringMatching(/^$/),
                refreshToken: expect.stringMatching(/^$/)
            })
    });
    it('should flag an authentication attempt with an incorrect email', async () => {
        const user = await createRegisteredUser();
        const { email, password } = user;
        await expect(authenticate({ email: 'wrong email', password })).resolves
            .toEqual({
                success: false,
                statusCode: 401,
                message: 'Invalid Password or Email',
                accessToken: expect.stringMatching(/^$/),
                refreshToken: expect.stringMatching(/^$/)
            })
    });
    it('should flag an authentication attempt with an incorrect password', async () => {
        const user = await createRegisteredUser();
        const { email, password } = user;
        await expect(authenticate({ email, password: 'wrong password' })).resolves
            .toEqual({
                success: false,
                statusCode: 401,
                message: 'Invalid Password or Email',
                accessToken: expect.stringMatching(/^$/),
                refreshToken: expect.stringMatching(/^$/)
            })
    });
    it('should allow an authentication attempt with correct credentials', async () => {
        const user = await createRegisteredUser();
        const { email, password } = user;
        await expect(authenticate({ email, password })).resolves
            .toEqual({
                success: true,
                statusCode: 200,
                message: 'Login Successful',
                accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
                refreshToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
            })
    });

    // it('should return a statusCode key, with a 200 value', async () => {
    //     const user = await createRegisteredUser();
    //     const { email, password } = user;
    //     await expect(authenticate({ email, password }))
    //         .resolves.toHaveProperty(['response', 'statusCode'], 200);

    // })
})
