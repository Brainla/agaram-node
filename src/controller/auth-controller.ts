import { AuthService } from "../service/auth-service";
import { NextFunction, Request, Response } from "express";
import { IUser, ResponseDTO, statusCode } from "../types";
import TokenService from "../service/token-service";

export class AuthController {
  private _authService: AuthService;
  private _tokenService: TokenService;

  constructor() {
    this._authService = new AuthService();
    this._tokenService = new TokenService();

    this.login = this.login.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  async logout(
    req: Request,
    res: Response<ResponseDTO<string>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<string>> | void> {
    try {

      // unset cookies
      res.cookie("access_token", null, {
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now()),
      });

      res.cookie("refresh_token", null, {
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now()),
      });

      const response = new ResponseDTO(statusCode.OK, true, "Logged out", null);
      return res.status(statusCode.OK).json(response);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  async login(
    req: Request,
    res: Response<ResponseDTO<IUser>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser>> | void> {
    try {
      const { email, password } = req.body;

      // check email
      const user = await this._authService.findUserByEmail(email);

      // check password
      const isPasswordMatch = await this._authService.comparePassword(
        user.password,
        password
      );

      // generate tokens
      const accessToken = this._tokenService.generateAccessToken(user.email);
      const refreshToken = this._tokenService.generateRefreshToken(user.email);

      // set cookies
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
      });
      user.password = "HIDDEN";
      const response = new ResponseDTO(statusCode.OK, true, user, null);
      return res.status(statusCode.OK).json(response);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  async getAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ResponseDTO<string>> | void> {
    try {
      // refresh token
      const refreshToken = this._tokenService.generateRefreshToken(
        req.userEmail!
      );

      // access token
      const accessToken = this._tokenService.generateAccessToken(
        req.userEmail!
      );

      // set cookies
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
      });

      const response = new ResponseDTO<string>(
        statusCode.OK,
        true,
        "Token generated successfully!",
        null
      );
      return res.status(statusCode.OK).json(response);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
}