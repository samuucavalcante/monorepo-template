export interface ResponseApi<T> {
  success: boolean;
  message: string;
  messagePt: string;
  data: T;
}
