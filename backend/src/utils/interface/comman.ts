export interface IError {
    message: string;
    error?: any;
    statusCode: number;
}
export interface ISuccess {
	message: string;
	statusCode: number;
}