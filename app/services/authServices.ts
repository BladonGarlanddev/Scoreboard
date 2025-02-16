import { account, databases } from "../lib/appClient";
import { ID } from "react-native-appwrite";

const DATABASE_ID = "67b20d6e0035a149801c";

export async function registerUser(email: string, password: string, firstName: string, lastName: string, weight: number, height: number, age: number) {
    try {
        const user = await account.create(ID.unique(), email, password);
        await databases.createDocument(DATABASE_ID, "users", ID.unique(), { userId: user.$id, firstName: firstName, lastName: lastName, weight: weight, height: height, age: age });
        console.log("User registered:", user);
        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        return null
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const session = await account.createSession(email, password);
        console.log("User logged in:", session);
        return session;
    } catch (error) {
        console.error("Error logging in user:", error);
        return null;
    }
}

export async function getUser() {
  try {
    const user = await account.get();

    const userData = await databases.listDocuments(
      DATABASE_ID, // Replace with actual database ID
      "users", // Collection ID
      [`equal("userId", "${user.$id}")`] // Query where userId matches
    );

    return {
        ...user,
        ...userData.documents[0]
    }

    return user;
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