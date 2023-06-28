import NextAuth from "next-auth/next";
import GoogleProvider from  "next-auth/providers/google"
console.log(process.env.GOOGLE_CLIENT_SECRET);
export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: "460214640878-303nkpsg2snldseccgcanai7poc8ogs5.apps.googleusercontent.com",
        clientSecret: "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",
      }),
    ],
    secret:"j2SwgPoucen7N6FpShIA+rGPE8gOCyfqacVEhYmQN/E="
  }
  export default NextAuth(authOptions)