import {prisma} from "../../lib/prisma"
export default async function handler(req, res) {
  const {query:{redirects}}=req;
  const[email,hashedUrl]=redirects;
  console.log(email,hashedUrl)
  try {
    const _URL= await prisma.Url.findFirst(
      {
        where : {
          hashedUrl : parseInt(hashedUrl,10),
          user_email : email
        }
      })
      await prisma.$disconnect()
      return res.redirect(301,_URL.fullUrl);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
}
