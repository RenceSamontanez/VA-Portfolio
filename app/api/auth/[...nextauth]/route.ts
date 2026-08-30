import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        // Clean Google image URL to ensure compatibility
        const userImage = profile.picture
          ? profile.picture.replace(/=s\d+-c$/, "") + "=s96-c"
          : null;

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: userImage,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.image = token.picture || session.user.image;
      }
      return session;
    },
    async jwt({ token, account, profile }: any) {
      if (account && profile) {
        token.picture = profile.picture
          ? profile.picture.replace(/=s\d+-c$/, "") + "=s96-c"
          : null;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };