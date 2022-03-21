import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { LotoDataResutsT } from "../components/Results";

enum ReqStatusEnum {
  success = "Данные успешно отправлены!",
  error = "Ошибка! Данные не были отправлены в результате 3 запросов.",
  willRetry = "Запрос повторится через 2 секунды...",
  retrying = "Ошибка. Повторяем запрос.",
  loading = "Загрузка...",
}
type AllSendDataTypes = LotoDataResutsT; // | ...

export enum reqEnum {
  get = "get",
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
}

interface reqObjT {
  url: string;
  method: reqEnum;
  data?: AllSendDataTypes;
}

const useApiCall = () => {
  const [reqStatus, setReqStatus] = useState<ReqStatusEnum>(
    ReqStatusEnum.loading
  );
  const [data, setData] = useState<AxiosResponse | AxiosError>();

  const _request = async (reqObj: reqObjT, retries = 3) => {
    if (retries > 0) {
      try {
        const data = await axios(reqObj);
        setReqStatus(ReqStatusEnum.success);
        setData(data);
      } catch (error: unknown) {
        // if res is smh other than 2xx code, it will refetch
        if (retries !== 1) {
          // handle retry logic
          setReqStatus(ReqStatusEnum.willRetry);
          await new Promise((res) => setTimeout(res, 2000));
          setReqStatus(ReqStatusEnum.retrying);
          await _request(reqObj, retries - 1);
        } else {
          // handle quit out of requests loop
          setReqStatus(ReqStatusEnum.error);
        }
      }
    }
  };

  const makeRequest = async (
    url: string,
    method: reqEnum,
    data: AllSendDataTypes | false = false
  ) => {
    const reqObj: reqObjT = {
      url,
      method,
    };
    if (data) {
      reqObj.data = data;
    }
    await _request(reqObj);
  };
  return { makeRequest, reqStatus, data };
};

export default useApiCall;
