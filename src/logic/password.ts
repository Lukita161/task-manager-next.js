import bcrypt from 'bcrypt'
export const hashPassword = async (password: string) => {
    const saltRounds = 10; // Adjust the number of rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  };