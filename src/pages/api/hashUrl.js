import hash from './generateHash';
import {prisma} from "../../lib/prisma"
import axios from "axios"
export default async function handler(req, res) {
  const {email,url,name}=req.body
  
  try {
      const res_= await axios.head(url)
      const _finds = await prisma.Url.findMany({
        where: {
          fullUrl: url,
          user_email: email,
        },
      });
      if (_finds.length > 0) {
        await prisma.$disconnect();
        throw new Error('This URL ALREADY EXISTS');
      }
      const user = await prisma.Url.create({
        data: {
          user_name: name,
          user_email: email,
          fullUrl: url,
          hashedUrl: hash(url),
        },

      });
      await prisma.$disconnect();
      return res.status(201).json(user);
  }
  catch (error) {
    console.error(error.message,"k_");
    return res.status(500).json({ error: error.message+"k_" });
  }
}
