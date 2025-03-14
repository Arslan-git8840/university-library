import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db/drizzle";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { updateLastActivity } from "./lib/updateLastActivityStatusOfUser";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email)).limit(1);
        if (user.length === 0) {
          return null;
        }
        // const isPasswordValid = await bcrypt.compare(
        //   credentials.password,
        //   user[0].password
        // );
        const isPasswordValid = user[0].password === credentials.password;
        if (!isPasswordValid) {
          return null;
        }

        await updateLastActivity(user[0].email);

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].fullName,
          universityId: user[0].universityId,
          status: user[0].status,
          role: user[0].role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log({token,user})
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.universityId = user.universityId;
        token.status = user.status;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.universityId = token.universityId;
        session.user.status = token.status;
        session.user.role = token.role;
      }
      console.log({token,session})

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,

});
