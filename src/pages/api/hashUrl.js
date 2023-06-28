import hash from './generateHash';
import {prisma} from "../../lib/prisma"

export default async function handler(req, res) {
  const {email,url,name}=req.body
  
  try {
    const user = await prisma.Url.create({
      data: {
        user_name:name,
        user_email:email,
        fullUrl:url,
        hashedUrl:hash(url)
      },
    });
    await prisma.$disconnect()
    return res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
