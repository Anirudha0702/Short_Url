import {prisma} from "../../lib/prisma"
export default async function handler(req, res) {
  const {email}=req.query
  try {
    const user = await prisma.Url.findMany({
        where: {
            user_email:email,
        },
      })
      await prisma.$disconnect()
      return res.status(200).json(user);
  } catch (error) {
    console.error('Error finding user:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
