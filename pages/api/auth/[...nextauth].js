import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      // normal sign in, check if they're in the DB
      const { parrotColor } = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          parrotColor: true,
        },
      });
      // new user, give them a random color and add to the DB
      if (!parrotColor) {
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            parrotColor: color,
          },
        });
        session.user.parrotColor = color;
      } else {
        session.user.parrotColor = parrotColor;
      }
      // return the session
      return session;
    },
  },
});
