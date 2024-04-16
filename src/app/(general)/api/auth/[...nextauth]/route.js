import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
const { PrismaClient } = require("@prisma/client");
import logger from '@/logger/logger'

const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          //Null returns an invalid dataset, not an error, but the credentials weren't correct
          return null;
        }
        const user = await prisma.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }
        if (!user.access) {
          return null;
        }
        logger(user.email + ' logged in succesfully', true)
        return {
          id: user.id + "",
          email: user.email,
          fn: user.fn,
          mn: user.mn,
          ln: user.ln
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
