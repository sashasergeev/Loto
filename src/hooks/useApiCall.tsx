import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { useState } from "react";
import { LotoDataResutsT } from "../components/Results";

enum ReqStatusEnum {
  success = "Данные успешно отправлены!",
  error = "Ошибка! Данные не были отправлены в результате 3 запросов.",
  retrying = "Ошибка. Повторяем запрос.",
  loading = "Загрузка...",
}
type AllSendDataTypes = LotoDataResutsT; // | ...

// axios configuration
const client = axios.create();
axiosRetry(client, { retries: 2 });

const useApiCall = () => {
  const [reqStatus, setReqStatus] = useState<ReqStatusEnum>(
    ReqStatusEnum.loading
  );

  const sendResultToServer = async (url: string, data: AllSendDataTypes) => {
    const retryFn = (error: AxiosError) => {
      setReqStatus(ReqStatusEnum.retrying);
      return error.response?.status !== 200;
    };

    // making request
    try {
      await client({
        url,
        data,
        "axios-retry": {
          retryDelay: () => 2000,
          retryCondition: retryFn,
        },
      });
      setReqStatus(ReqStatusEnum.success);
    } catch (error) {
      setReqStatus(ReqStatusEnum.error);
    }
  };
  return { sendResultToServer, reqStatus };
};

export default useApiCall;
