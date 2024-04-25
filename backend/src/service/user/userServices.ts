import bcrypt, { hashSync } from "bcrypt";
import User from "../../models/userModel";
import jwt from "jsonwebtoken";
import CommonFunction from "../../utils/commonFunction/commomFunction";
import * as IUserServices from "./IUserServices";
import ITokenDetails from "../../utils/commonFunction/ITokenDetails";
import { statusCode } from "../../utils/commonFunction/constant";
import { response } from "express";
import ErrorMessageEnum from "../../utils/enums/ErrorMessageEnum";


const commonFun = new CommonFunction(bcrypt, jwt);

//user  create
async function create(users: IUserServices.ICreateUserRequest) {
    try {
        const email: string = users.email;
        const user = await User.findOne({
            where: { email: email },
        });
        if (user) {
            return "userAlreadyExist";
        }
        const password: string = await commonFun.hashPassword(users.password);
        users.password = password;
        return await User.create(users);
    } catch (err: any) {
        throw new Error(err.message);
    }
}

//login user

async function login(users: IUserServices.ILoginUserRequest) {
    try {
        const { email, password } = users;
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            return "userDoesNotExist";
        } else {
            const pass = await commonFun.comparePassword(password, user.password);
            if (pass !== true) {
                return "incorrectPassword";
            }
            const tokenReq: ITokenDetails = {
                id: user.id,
                username: user.username,
                email: user.email,
                password: "",
            };
            const token: string = await commonFun.generateToken(tokenReq);
            return token;
        }
    } catch (err: any) {
        throw new Error(err.message);
    }
}

//update

async function update(data: IUserServices.ICreateUserRequest, id: string) {
    try {
        const user = await User.findById(id)
        console.log(user)
        if (!user) {
            return response.status(statusCode.badRequest).json(ErrorMessageEnum.INVALID_REQUEST)

        }
        return await user.updateOne(data)
    }
    catch (err: any) {
        throw new Error(err.message)
    }
}

// delete

async function deleteUser(data: any) {
    try {
        const user = await User.findById(data.id)

        if (!user) {
            return 'userDoesNotExist'
        } else {
            return await User.updateOne({
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy: data.id,
            })
        }
    } catch (err: any) {
        throw new Error(err.message)
    }
}
export default { create, login, update, deleteUser };
