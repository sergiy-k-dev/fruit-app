import type { CustomErrorInterface } from "../types";

class CustomRequestError implements CustomErrorInterface {
  name: string;
  message: string;
  code: string;

  constructor(
    errorName: string = "",
    errorMessage: string = "",
    errorCode: string = ""
  ) {
    this.name = errorName;
    this.message = errorMessage;
    this.code = errorCode;
  }
}

export default CustomRequestError;
