"use server";

import { ID, Query, AppwriteException } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "@/lib/appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined, // password is not required
      user.name
    );
    return parseStringify(newUser);
  } catch (error: unknown) {
    if ((error as AppwriteException).code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      return documents?.users[0];
    }
    console.log("An error occurred while a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log("An error occurred while fetching user:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log("An error occurred while fetching user:", error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const blob = identificationDocument?.get("blobFile") as Blob;
      const fileName = identificationDocument?.get("fileName") as string;

      const fileObject = new File([blob], fileName, { 
        type: blob.type || 'application/octet-stream' 
      });

      file = await storage.createFile(BUCKET_ID!, ID.unique(), fileObject);
    }

    console.log({gender: patient.gender});

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log("An error occurred while registering patient:", error);
  }
};
