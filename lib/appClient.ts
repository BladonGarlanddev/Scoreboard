// src/lib/appwriteClient.ts
import { Client, Account, Databases } from "react-native-appwrite";
import { PROJECT_ID, ENDPOINT } from "@/config/appConfig";

export const client = new Client()
  .setEndpoint(ENDPOINT + "/v1") // Replace with local network IP if on a physical device
  .setProject(PROJECT_ID)
  .setPlatform('exp://192.168.1.162:8081');

export const account = new Account(client);

export const databases = new Databases(client);

