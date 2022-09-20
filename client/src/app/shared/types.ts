export interface IResetPassword{
  password:string;
  confirmPassword:string;
  username:string;
  _id?:string;
}

export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password: string;
  employeeId: string;
  mobileNo: string;
  createdAt?: Date;
  type: UserType;
  updatedAt?: Date;
  contactPerson: {
    name: string;
    mobileNo: string;
    email: string;
  };
  name: string;
  address: string;
}

export interface ITransaction {
  _id?: string;
  invoice: string;
  description: string;
  date: Date;
  for: string;
  paid: number;
  recieved: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default interface IArticle {
  _id?: string;
  //articleTypes: string;
  article: string;
  pages: number;
  inputType:InputType;
  complexity:Complexity;
  processType: ProcessType;
  mathCount:string;
  imagesCount:string;
  status: Status;
  assignedTo: IUser;
  IsCreatedByMe:boolean;
  createdBy:IUser;
  client?: string;
  batch?: string;
  closedDate?:Date;
  completedDate?:Date;
  createdAt?: Date;
  updatedAt?: Date;
  
}

export interface IArticleSave {
  client?:string,
  batch:string,   
  //articleTypes: string,
  article: string,
  pages: number,
  inputType:InputType,
  complexity:Complexity,
  processType: ProcessType,
  mathCount:string,
  imagesCount:string,
  assignedTo?: string,
  status: Status,
  closedDate?:Date,
  completedDate?:Date,
  IsCreatedByMe?:boolean,
  createdBy?:string
}

export enum Status {
  ASSIGNED = "ASSIGNED",
  UNASSIGNED = "UNASSIGNED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED"
}

export enum UserType {
  ADMIN = "ADMIN",
  EMP = "EMP",
  CLIENT = "CLIENT",
  SUP = "SUP"
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  email: string;
  type: tokens;
}

export enum tokens {
  access = "access",
  refresh = "refresh",
}

export class ResponseDTO<T> {
  statusCode: number;
  success: boolean;
  data: T | null;
  error: string | [] | null;

  constructor(
    statusCode: number,
    success: boolean,
    data: T | null,
    error: string | [] | null
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
    this.error = error;
  }
}

export enum statusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHENTICATED = 401,
  REFRESH_TOKEN_EXPIRED = 403,
}

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
      user?: IUser;
    }
  }
}

export enum FilterStatus  {
  ASSIGNED = "ASSIGNED",
  UNASSIGNED = "UNASSIGNED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED",
  ALL = "ALL"
}
export enum InputType {
  "PRINTED PDF"= "PRINTED PDF",
  "SCANNED PDF"="SCANNED PDF"
}
export enum Complexity{
  SIMPLE="SIMPLE", 
  MEDIUM="MEDIUM", 
  COMPLEX="COMPLEX",
  "HEAVY-COMPLEX"="HEAVY-COMPLEX"
}
export enum ProcessType{
  OCR="OCR",
  "EPUB"="EPUB",
  CODING="CODING",
  IMAGES="IMAGES",
  "REFERENCE"="REFERENCE",
  "QUALITY ASURENCE"="QUALITY ASURENCE",
  "END TO END"="END TO END"
}