import Savetransaction from "../service/transaction-service"
import ITransaction, {ResponseDTO, statusCode } from "../types"
import { NextFunction, Request, Response } from "express";

export default class TransactionController {
    private _transaction: Savetransaction;
  
    constructor() {
      this._transaction = new Savetransaction();
      this.addtransaction= this.addtransaction.bind(this);
      this.getalltransactions= this.getalltransactions.bind(this);
      this.searchtransaction= this.searchtransaction.bind(this);
      this.deletetransaction = this.deletetransaction.bind(this);
      this.updatetransaction = this.updatetransaction.bind(this);
    }

    async addtransaction(
        request: Request<ITransaction>,
        response: Response<ResponseDTO<ITransaction>>,
        next: NextFunction
    ): Promise<Response<ResponseDTO<ITransaction>> | void> {
        try {
        const transaction: ITransaction = request.body;

        // Saving the article
        const savedtransaction = await this._transaction.addtransaction(transaction);

        const responseDTO = new ResponseDTO<ITransaction>(
            statusCode.CREATED,
            true,
            savedtransaction,
            null
        );

        return response.status(statusCode.CREATED).json(responseDTO);
        } catch (error) {
        return next(error);
        }
    }

    async getalltransactions(
        request: Request,
        response: Response<ResponseDTO<ITransaction[]>>,
        next: NextFunction
      ): Promise<Response<ResponseDTO<ITransaction[]>> | void> {
        try {
          const { sort, page, pageSize } = request.query;
          const pageNumber: number | undefined = page ? +page : undefined;
          const pageSizeNumber: number | undefined = pageSize
            ? +pageSize
            : undefined;
          const alltransaction = await this._transaction.gettransactions(
            sort as string,
            pageNumber,
            pageSizeNumber
          );
          const responseDTO = new ResponseDTO<ITransaction[]>(
            statusCode.OK,
            true,
            alltransaction,
            null
          );
          return response.status(statusCode.OK).json(responseDTO);
        } catch (error) {
          return next(error);
        }
      }
    // Search a article
      async searchtransaction(
        request: Request,
        response: Response<ResponseDTO<ITransaction[]>>,
        next: NextFunction
      ): Promise<Response<ResponseDTO<ITransaction[]>> | void> {
        try {
          const { sort, page, pageSize, sd, ed } = request.query;
          const pageNumber: number | undefined = page ? +page : undefined;
          const pageSizeNumber: number | undefined = pageSize
            ? +pageSize
            : undefined;
          const searched = await this._transaction.searchtransaction(
            new Date(sd as string), 
            new Date(ed as string),
            sort as string,
            pageNumber,
            pageSizeNumber
          );
          const responseDTO = new ResponseDTO<ITransaction[]>(
            statusCode.OK,
            true,
            searched,
            null
          );
          return response.status(statusCode.OK).json(responseDTO);
        } catch (error) {
          return next(error);
        }
      }

      //Delete transaction

      async deletetransaction(
        request: Request<ITransaction>,
        response: Response<ResponseDTO<ITransaction>>,
        next: NextFunction
      ): Promise<Response<ResponseDTO<ITransaction>> | void> {
        try {
          const { _id } = request.params;
          const deletetransaction = await this._transaction.deletetransaction(_id);
          const responseDTO = new ResponseDTO<ITransaction>(
            statusCode.OK,
            true,
            deletetransaction,
            null
          );
          return response.status(statusCode.OK).json(responseDTO);
        } catch (error) {
          return next(error);
        }
      }

    // Update transaction

    async updatetransaction(
        request: Request<ITransaction>,
        response: Response<ResponseDTO<ITransaction>>,
        next: NextFunction
      ): Promise<Response<ResponseDTO<ITransaction>> | void> {
        try {
          const { _id } = request.params;
          const Transaction = request.body;
    
          const updatetransaction = await this._transaction.updatetransaction(
            {
              ...Transaction,
            },
            _id
          );
    
          const responseDTO = new ResponseDTO<ITransaction>(
           statusCode.OK,
           true,
           updatetransaction,
           null
          );
          return response.status(statusCode.OK).json(responseDTO);
        } catch (error) {
          console.log(error);
          return next(error);
        }
      }

}