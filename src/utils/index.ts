import { ResponseDTO, statusCode } from "../types";

export const createStartAndEndIndex = (
  page?: number,
  pageSize?: number
): { startIndex: number; endIndex: number } => {
  if (!page || !pageSize) {
    return { startIndex: 0, endIndex: 10 };
  }
  const startIndex = page * pageSize - pageSize;
  return { startIndex: startIndex, endIndex: pageSize };
};

export const getCustomValidationResponse = (): ResponseDTO<null> => {
  return new ResponseDTO(statusCode.BAD_REQUEST, false, null, null);
};

export const getCurrentDate = (d?: Date) => {
  let t = new Date();
  if (d) {
    t = new Date(d);
  }
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  
  return `${year}-${month}-${date}`;
};
export const convertFilterDate=(d?:Date)=>{
  let t = new Date();
  if (d) {
    t = new Date(d);
  }
  return new Date(t.getFullYear(),t.getMonth(), t.getDate())
}

export const getCurrentDateWithTime = (d?: Date) => {
  let t = new Date();
  if (d) {
    t = new Date(d);
  }
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const hours = ("0" + t.getHours()).slice(-2)
  const mins = ("0" + t.getMinutes()).slice(-2)
  console.log(`${year}-${month}-${date} ${hours}:${mins}:00`)
  return `${year}-${month}-${date} ${hours}:${mins}:00`;
};
export const getStartDateWithTime = (d?: Date) => {
  let t = new Date();
  if (d) {
    t = new Date(d);
  }
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const hours = ("0" + t.getHours()).slice(-2)
  const mins = ("0" + t.getMinutes()).slice(-2)
  console.log(`${year}-${month}-${date} 00:00:00`)
  return `${year}-${month}-${date} 00:00:00`;
};
export const getEndDateWithTime = (d?: Date) => {
  let t = new Date();
  if (d) {
    t = new Date(d);
  }
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const hours = ("0" + t.getHours()).slice(-2)
  const mins = ("0" + t.getMinutes()).slice(-2)
  console.log(`${year}-${month}-${date} 23:59:59`)
  return `${year}-${month}-${date} 23:59:59`;
};