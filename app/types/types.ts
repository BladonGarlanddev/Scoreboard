export interface UserMetadata {
  $id: string;
  email: string;
  accountType: string;
  assumedRole: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  weight?: number | undefined;
  height?: number | undefined;
  DOB?: string | undefined;
  creationDate: string;
}

export interface UserData {
  isVerified: boolean;
  userMetadata: UserMetadata;
}

