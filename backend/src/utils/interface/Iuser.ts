import { Enum } from "../enums/roleEnums";
export interface IUser {
  id: string,
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: string[];
  followings?: string[];
  isAdmin?: boolean;
  city?: string | undefined | null;
  from?: string | undefined | null;
  relationship?: Enum | undefined | null;
}