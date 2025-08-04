interface IAppError {
  message: string;
  messagePt: string;
  code?: number;
}

export class AppError {
  constructor(public readonly params: IAppError) {
    this.params.code = params.code || 400;
  }
}
