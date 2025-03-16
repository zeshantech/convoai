import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import { User } from "@/models/User";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });

        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(credentials?.password ?? "", user.password);
        if (!isValid) return null;

        return {
          id: user._id!.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile) return false;

      if (account.provider === "google" || account.provider === "github") {
        await dbConnect();

        const userEmail = profile.email;

        if (!userEmail) {
          return false;
        }

        let existingUser = await User.findOne({ email: userEmail });

        if (!existingUser) {
          existingUser = await User.create({
            name: profile.name || user.name || "No Name",
            email: userEmail,
            image: profile.image,
          });

          await existingUser.save();
        }

        user.id = existingUser.id;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const getSession = () => getServerSession(authOptions);

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
