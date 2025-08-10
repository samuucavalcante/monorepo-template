import { isClient } from "@/shared/utils/runtime";
import { ResponseApi } from "arc/shared";

function handleError(
  data: ResponseApi<unknown>,
  defaultMessage: string = "Erro inesperado",
  hideErrorMessage = false,
  messageErrorDuration = 5,
  messageType: "success" | "info" | "warning" | "error" = "error"
) {
  const messageError = data?.messagePt || defaultMessage || data?.message;

  // if (!hideErrorMessage) {
  //   message.open({
  //     content: messageError,
  //     className: "max-w-[60%] m-auto",
  //     duration: messageErrorDuration,
  //     type: messageType,
  //   });
  // }

  console.error(data?.message);
  throw Promise.reject(messageError);
}

type HandleResponseParams<T> = {
  /** Request to be handled */
  fetch: Promise<ResponseApi<T>>;
  /** Default value to be returned if an message error is not sent `(Optional)` */
  defaultErrorMessage?: string;
  /** Duration of the error message in seconds `(Optional)` */
  messageErrorDuration?: number;
  /** Type of the message to be displayed `(Optional)` */
  messageType?: "success" | "info" | "warning" | "error";
  /** Default value to be returned if an error occurs `(Optional)` */
  dataFallback?: T;
  /** Hidden error message */
  hideErrorMessage?: boolean;
  /** Function to be called if an error occurs `(Optional)` */
  callbackError?: (err: ResponseApi<T>) => void;
};

export async function handleResponse<T>(
  data: HandleResponseParams<T>
): Promise<T> {
  const response = await data.fetch;

  const hasError = !response?.success;

  if (hasError) {
    data?.callbackError?.(response);

    if (isClient()) {
      handleError(
        response,
        data?.defaultErrorMessage,
        data.hideErrorMessage,
        data.messageErrorDuration,
        data.messageType
      );
    }

    if (data.dataFallback) {
      return data.dataFallback;
    }
  }
  return response.data as T;
}
