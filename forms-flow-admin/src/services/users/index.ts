import { RequestService } from "@formsflow/service";

import API from "../../endpoints/index";

export const fetchUsers = (
  group: string | null,
  pageNo: number | null,
  search: string | null,
  sizePerPage : number | null ,
  callback: any,
  errorHandler: any,
  role = true,
  count = true
) => {
  let url = `${API.GET_USERS}?role=${role}&count=${count}`;
  if (group) url += `&memberOfGroup=${group}`;
  if (pageNo) url += `&pageNo=${pageNo}`;
  if(sizePerPage) url += `&limit=${sizePerPage}`;
  if (search) url += `&search=${search}`;

  RequestService.httpGETRequest(url)
    .then((res) => {
      if (res.data) {
        callback(res.data);
      } else {
        errorHandler("No Users found!");
      }
    })
    .catch((error) => {
      if (error?.response?.data) {
        errorHandler(error.response.data?.message);
      } else {
        errorHandler("Failed to fetch users!");
      }
    });
};

export const AddUserRole = (
  user_id: string,
  group_id: string,
  payload: object
) => {
  const url = API.USER_ROLE_GROUP_PERMISSION.replace(
    "<user_id>",
    user_id
  ).replace("<group_id>", group_id);
  return RequestService.httpPUTRequest(url, payload);
};
export const RemoveUserRole = (
  user_id: string,
  group_id: string,
  payload: object,
  callback: any,
  errorHandler: any
) => {
  const url = API.USER_ROLE_GROUP_PERMISSION.replace(
    "<user_id>",
    user_id
  ).replace("<group_id>", group_id);
  RequestService.httpDELETERequest(url, payload)
    .then(() => {
      callback();
    })
    .catch((error) => {
      if (error?.response?.data) {
        errorHandler(error.response.data?.message);
      } else {
        errorHandler("Failed to update permission!");
      }
    });
};

export const CreateUser = (payload, callback, errorHandler) => {
  RequestService.httpPOSTRequest(API.ADD_USER, payload)
    .then((res) => {
      if (res.data) {
        callback(res.data)
      } else {
        errorHandler("Failed to post data!");
      }
    })
    .catch((error) => {
      if (error?.response?.data) {
        errorHandler(error.response.data?.message);
      } else {
        errorHandler("Faied to post data!");
      }
    });
};