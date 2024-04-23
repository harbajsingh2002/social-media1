import { Request, Response } from "express";
import UserServices from "./userServices";
import {
    failResponse,
    successResponse,
} from "../../utils/commonFunction/response";
import { statusCode, message } from "../../utils/commonFunction/constant";
import ErrorMessageEnum from "../../utils/enums/ErrorMessageEnum";
// create  user
async function create(req: Request, res: Response) {
    try {
        const data = await UserServices.create(req.body);
        if (data == "userAlreadyExist") {
            res
                .status(statusCode.badRequest)
                .json(
                    failResponse(
                        statusCode.badRequest,
                        data,
                        message.alreadyExist("User")
                    )
                );
        } else {
            res
                .status(statusCode.success)
                .json(successResponse(statusCode.success, data, message.add("User")));
        }
    } catch (err: any) {
        res
            .status(statusCode.badRequest)
            .json(
                failResponse(statusCode.badRequest, err.message, message.somethingWrong)
            );
    }
}

//login
async function login(req: Request, res: Response) {
    try {
        const data = await UserServices.login(req.body)
        if (data == 'userDoesNotExist') {
            res
                .status(statusCode.notFound)
                .json(
                    failResponse(
                        statusCode.badRequest,
                        data,
                        message.notExist('User'),
                    ),
                )
        }
        else if (data == 'incorrectPassword') {
            res
                .status(statusCode.wrongPassword)
                .json(
                    failResponse(
                        statusCode.badRequest,
                        data,
                        message.invalidlogin,
                    ),
                )
        }
        else {
            res
                .status(statusCode.success)
                .json(successResponse(statusCode.success, data, message.login))
        }
    } catch (err: any) {
        res
            .status(statusCode.badRequest)
            .json(
                failResponse(
                    statusCode.badRequest,
                    err.message,
                    message.somethingWrong,
                ),
            )
    }
}

// update

async function update(req: Request, res: Response) {
    try {
        const data = req.body
        const userId: string = req.params.id
        const user = await UserServices.update(
            data,
            userId,
        )
        if (!user) {
            res.status(statusCode.badRequest).json(ErrorMessageEnum.INVALID_REQUEST)
        }
        else {
            res
                .status(statusCode.success)
                .json(successResponse(statusCode.success, data, message.update('User')))
        }
    } catch (err: any) {
        res
            .status(statusCode.emailOrUserExist)
            .json(
                failResponse(
                    statusCode.badRequest,
                    err.message,
                    message.somethingWrong,
                ),
            )
    }
}

// delete

async function deleteUsers(req: Request, res: Response) {
    try {
        const data = await UserServices.deleteUser(req.params)
        if (data == 'userDoesNotExist') {
            res
                .status(statusCode.badRequest)
                .json(
                    successResponse(
                        statusCode.badRequest,
                        data,
                        message.alreadyExist('User'),
                    ),
                )
        } else {
            res
                .status(statusCode.success)
                .json(successResponse(statusCode.success, data, message.add('User')))
        }
    } catch (err: any) {
        res
            .status(statusCode.badRequest)
            .json(
                failResponse(
                    statusCode.badRequest,
                    err.message,
                    message.somethingWrong,
                ),
            )
    }
}


export default { create, login, update, deleteUsers };

