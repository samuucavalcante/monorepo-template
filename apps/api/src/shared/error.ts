export class AppError {
  constructor(
    public readonly message: string,
    public readonly code: number = 500
  ) {}
}
