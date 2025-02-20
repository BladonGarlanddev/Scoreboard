// src/lib/appwriteClient.ts
import { Client, Account, Databases } from "react-native-appwrite";
import { PROJECT_ID } from "@/config/appConfig";

export const client = new Client()
  .setEndpoint("http://10.0.2.2/v1") // Replace with local network IP if on a physical device
  .setProject(PROJECT_ID);

export const account = new Account(client);

export const databases = new Databases(client);
