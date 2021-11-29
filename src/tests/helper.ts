import faker from 'faker';
import bcrypt from 'bcrypt';
import User from '../Models/user';

type TestUser = {email:string, password:string, fullName:string, userId:string};

export function createUnRegisteredUser() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}` 
    }
}

export async function createRegisteredUser ():Promise<TestUser> {
   try {
    const user = createUnRegisteredUser();
    const unhashedPassword = user.password;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = new User(user);
    await newUser.save();
    return { ...user, password: unhashedPassword, userId: newUser.id };
   } 
   catch(err) {
    console.log('Error encountered: ====>>>', err);
    return { email:'', password:'', fullName:'', userId:''}
   }
    
}

export async function deleteUser(userId: string):Promise<void> {
await User.deleteOne({ _id: userId });
}


