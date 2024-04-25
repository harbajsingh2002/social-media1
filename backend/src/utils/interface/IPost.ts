import { IUser } from "./Iuser";

export interface IPost {
    id: string;
    userId: IUser;
    desc?: string; // Optional field
    img?: string;  // Optional field
    likes?: string[]; // Optional field
    createdAt: Date;
    updatedAt: Date;
}