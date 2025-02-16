// src/lib/appwriteClient.ts
import { Client, Account, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("35.146.31.136") // Replace with local network IP if on a physical device
  .setProject("67ae36860029c180ae52");

export const account = new Account(client);

export const databases = new Databases(client);
