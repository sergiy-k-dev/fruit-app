import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosError,
} from "axios";

import CustomRequestError from "./custom-request-error";

import type { CustomErrorInterface, Fruit } from "../types";

class FruitApi {
  #fruitApi: AxiosInstance;

  constructor() {
    this.#fruitApi = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    this.#fruitApi.interceptors.response.use(
      (response) => response,
      (error) => this.#handleError(error)
    );
  }

  #handleError = (error: any): never => {
    const isAxiosError = axios.isAxiosError(error);

    if (isAxiosError && error.response) {
      const { message, code }: AxiosError = error;

      const resultError: CustomErrorInterface = new CustomRequestError(
        "status code outside 2xx",
        message,
        code
      );

      throw resultError;
    } else if (isAxiosError && error.request) {
      const { message, code }: AxiosError = error;

      const resultError: CustomErrorInterface = new CustomRequestError(
        "Request made, no response",
        message,
        code
      );

      throw resultError;
    }

    if (!isAxiosError && error instanceof Error) {
      const { name, message } = error;

      const resultError: CustomErrorInterface = new CustomRequestError(
        name,
        message
      );

      throw resultError;
    }

    throw error;
  };

  public getAllFruits = async (): Promise<
    AxiosResponse<Fruit[], any> | undefined
  > => {
    try {
      const response: AxiosResponse<Array<Fruit>> = await this.#fruitApi.get(
        "/api/fruit/all"
      );

      return response;
    } catch (error) {
      this.#handleError(error);
    }
  };

  public getFruitsByFamily = async (
    family: string
  ): Promise<AxiosResponse<Fruit[], any> | undefined> => {
    try {
      const config: AxiosRequestConfig = {
        params: {
          family,
        } as RawAxiosRequestHeaders,
      };

      const response: AxiosResponse<Array<Fruit>> = await this.#fruitApi.get(
        "/api/fruit/family",
        config
      );

      return response;
    } catch (error) {
      this.#handleError(error);
    }
  };
}

export default FruitApi;
