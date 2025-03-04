import { account, databases } from "../lib/appClient";
import { ID } from "react-native-appwrite";
import { DATABASE_ID, USERS_COLLECTION_ID, ENDPOINT, VERIFICATION_LINK } from "@/config/appConfig"; // Centralized config
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { RootState } from "@/store/store"; // Adjust path as needed
import type { Models } from "appwrite";
import type { UserData } from "@/types/types"
import type { UserMetadata } from "@/types/types";

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user?: Models.User<Models.Preferences>; error?: string }> {
  try {
    // Create the user in Appwrite
    const user = await account.create(ID.unique(), email, password);

    // Log in the user to create a session
    const session = await loginUser(email, password);
    if (!session) {
      throw new Error("Session could not be created or validated.");
    }

    console.log("Session: ", JSON.stringify(session));

    // Create a verification email
    const result = await account.createVerification(VERIFICATION_LINK);

    // ✅ Return the user inside an object
    return { user };
  } catch (error: any) {
    console.error("Error during user registration:", error);
    // ✅ Return error inside object
    return { error: error?.message || "An unknown error occurred." };
  }
}

    /*

    const userData: Record<string, any> = {
      id: user.$id,
      email: user.email,
      accountType: accountType,
      assumedRole: assumedRole,
      firstName,
      lastName,
      weight,
      height,
      DOB: DOB?.toISOString(),
      creationDate: new Date().toISOString(),
    };

    if (firstName) userData.first_name = firstName;
    if (lastName) userData.last_name = lastName;
    if (weight !== undefined) userData.weight = weight;
    if (height !== undefined) userData.height = height;
    if (DOB) userData.DOB = DOB.toISOString();

    await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      user.$id,
      userData,
      [
        `read("user:${user.$id}")`, // Allow user to read their own document
        `update("user:${user.$id}")`, // Allow user to update their own document
        `delete("user:${user.$id}")`, // Allow user to delete their own document
        `write("user:${user.$id}")`, // Allow user to write to their own document
      ]
    );
    */
  



export async function loginUser(email: string, password: string) {
  try {
    // Get the current active session, if any
    const activeSession = await account.getSession("current").catch(() => null);

    if (activeSession) {
      // ✅ Validate that the active session belongs to the correct user
      const currentUser = await account.get();
      if (currentUser.email === email) {
        console.log("Using existing session:", activeSession);
        return activeSession; // Return the existing session
      } else {
        console.log("Session belongs to another user. Logging out.");
        await account.deleteSession("current"); // 🚨 Remove incorrect session
      }
    }

    // ✅ If no session exists or the session was invalid, create a new one
    const session = await account.createEmailPasswordSession(email, password);
    console.log("New session created:", session);
    return session;
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
}


export async function getUser(): Promise<UserData | null> {
  try {
    const user = await account.get(); // 🔹 Fetch the authentication user object (does NOT include accountType)

    const data = await databases.listDocuments(
      DATABASE_ID,
      "users", // Collection ID where user metadata is stored
      [`equal("userId", "${user.$id}")`]
    );

    if (data.documents.length === 0) {
      throw new Error("User document not found in database");
    }

    const userMetadata = data.documents[0];

    // ✅ Merge authentication data with custom database fields
    return {
      isVerified: Boolean(user.emailVerification || user.phoneVerification), // ✅ Ensure boolean
      userMetadata: {
        $id: user.$id,
        email: user.email,
        accountType: userMetadata.account_type, // ✅ Extract accountType correctly
        assumedRole: userMetadata.assumed_role,
        firstName: userMetadata.first_name,
        lastName: userMetadata.last_name,
        weight: userMetadata.weight,
        height: userMetadata.height,
        DOB: userMetadata.DOB,
        creationDate: userMetadata.creation_date,
      },
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function logoutUser() {
  try {
    await account.deleteSession("current");
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out user:", error);
  }
}
