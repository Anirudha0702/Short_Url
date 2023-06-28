import NextAuth from "next-auth/next";
import GoogleProvider from  "next-auth/providers/google"
export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOLGE_CLIENT_SECRET,
      }),
    ],
    secret:process.env.JWT_SECRET
  }
  export default NextAuth(authOptions)