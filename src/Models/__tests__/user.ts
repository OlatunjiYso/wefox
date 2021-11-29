import faker from 'faker'
import User from '../user';
import db from '../../db';

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect();
  User.deleteMany({});
})

describe('Tests for User model', () => {
  it('should create user', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const fullName = faker.name.firstName()
    const before = Date.now()

    const user = new User({ email, password, fullName })
    await user.save()
    const after = Date.now()
    const fetchedUser = await User.findById(user._id)

    expect(fetchedUser).not.toBeNull()
    expect(fetchedUser!.email).toBe(email)
    expect(fetchedUser!.fullName).not.toBeNull()
    expect(fetchedUser!.password).not.toBeNull()
    expect(before).toBeLessThanOrEqual(fetchedUser!.createdAt.getTime())
  })

  it('should update user', async () => {
    const fullName1 = faker.name.firstName()
     const user = new User({email: faker.internet.email(), password: faker.internet.password(), fullName: fullName1})
    const dbUser1 = await user.save()

    const fullName2 = faker.name.firstName()
    dbUser1.fullName = fullName2
    const dbUser2 = await dbUser1.save()
    expect(dbUser2.fullName).toEqual(fullName2)
  })
})