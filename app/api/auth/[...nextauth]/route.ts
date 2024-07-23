import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session, User as NextAuthUser } from "next-auth";
import User from "@models/users";
import { connectToDB } from "@utils/database";

// Define TypeScript interfaces for NextAuth callbacks
// Extend the default NextAuthUser to include an optional 'id' field
interface SessionUser extends NextAuthUser {
  id?: string;
}

// Extend the default Session to include our custom SessionUser type
interface SessionWithId extends Session {
  user: SessionUser;
}

// NextAuth configuration object
const authOptions: NextAuthOptions = {
  // Define the authentication providers
  providers: [
    GoogleProvider({
      // Use environment variables for Google OAuth credentials
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Callback for handling session updates
    async session({ session }: { session: SessionWithId }) {
      if (session.user.email) {
        try {
          // Retrieve the user from MongoDB based on their email
          const sessionUser = await User.findOne({ email: session.user.email });
          if (sessionUser) {
            // If user found, add their MongoDB ID to the session
            session.user.id = sessionUser._id.toString();
          }
        } catch (error) {
          // Log any errors encountered during user retrieval
          console.error("Error retrieving user from database: ", error);
        }
      }
      return session;
    },
    // Callback for handling user sign-in events
    async signIn({
      account,
      profile,
    }: {
      account?: any;
      profile?: any;
      user?: any;
      credentials?: any;
    }) {
      try {
        // Connect to the MongoDB database
        await connectToDB();

        // Check if the user already exists in MongoDB
        const userExists = await User.findOne({ email: profile?.email });

        // If the user does not exist, create a new user document
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(), // Normalize username by removing spaces and converting to lowercase
            image: profile?.picture, // Store user's profile picture
          });
        }

        return true; // Allow sign-in to proceed
      } catch (error) {
        // Log any errors encountered during the sign-in process
        console.error("Error checking if user exists: ", (error.message as string));
        return false; // Prevent sign-in if an error occurs
      }
    },
  },
};

// Initialize NextAuth with the configuration object and export handlers for API routes
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
