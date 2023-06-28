import {prisma} from "../../lib/prisma"

export default async function handler(req, res) {
  const {id}=req.body
  try {
    const user = await prisma.Url.delete({
        where: {
            id:id,
        },
      })
      console.log("UserDeleted")
      await prisma.$disconnect();
      return res.status(200).json({message:"User Deleted"});
  } catch (error) {
    console.error('Error creating user:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }

}