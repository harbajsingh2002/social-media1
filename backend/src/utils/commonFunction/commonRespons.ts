import { Response } from 'express';
const SendResponse = <T>(res: Response, data: T, status: number) => {
	return res.status(status).json({ data });
};
const failAction = (statusCode: number, errorMessage: string, message = 'Fail') => {
	return { statusCode, errorMessage, message }
}
export { SendResponse, failAction };
