import { IUser } from "../../utils/interface/Iuser";
import { ISuccess } from "../../utils/interface/comman";

export interface ICreateUserRequest extends Request {
    id: string
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    coverPicture?: string;
    followers?: string[];
    followings?: string[];
    isAdmin: boolean;
    city?: string;
    from?: string;
    relationship?: 1 | 2;
}
export interface ILoginUserRequest extends Request {
    email: string;
    password: string
}

export interface IGetUserRequest extends Request {
    param: any;
    id?: string;
    user?: IUser;

}
export interface IFind extends Request {
    email: string;
}
export interface IGetClientsRequest extends Request {
    user?: IUser;
}
