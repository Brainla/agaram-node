import { ProcessType,InputType,Complexity, UserStatus } from './../../shared/types';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import IArticle, { IArticleSave, IUser } from 'src/app/shared/types';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  batch:string = "";
  assignedPages:string="";
  userComments:string = "";
  client:string = "";
  articleType: string = "";
  article: string = "";
  pages: number = 0;
  processType: ProcessType = ProcessType.OCR;
  userstatus:UserStatus=UserStatus["NOT STARTED"];
  assignedTo?:string = undefined;
  closedDate?:Date = undefined;
  completedDate?:Date = undefined;
  targetDate?:Date=undefined;
  userstatusOptions = Object.keys(UserStatus);
  users : IUser[]|null = [];
  fromNonAdmin:boolean=false;
  inputType:InputType=InputType["SCANNED PDF"];
  complexity:Complexity=Complexity.SIMPLE;
  mathCount:string="";
  imagesCount:string="";
  inputTypeOptions = Object.keys(InputType);
  complexityOptions=Object.keys(Complexity);
  processTypeOptions= Object.keys(ProcessType);
  IsCreatedByMe:boolean=false;
  blnUpdateArticle:boolean =false;
  AdminCommand:string="";
  _id?:string="";
  constructor(private _authService: AuthService, private _articleService: ArticleService, private _userService:UserService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<ArticleFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { updateArticle: boolean, title: string, article: IArticle,fromNonAdmin:boolean}) {
    this.fromNonAdmin = this.data.fromNonAdmin;
    
    
    
    if(this.data.updateArticle) {
      this._id = this.data.article._id;
      if(this.data.article.IsCreatedByMe)
        this.IsCreatedByMe = this.data.article.IsCreatedByMe;
      this.blnUpdateArticle = true;
      if(this.data.article.batch)
        this.batch = this.data.article.batch;
      if(this.data.article.client)
        this.client = this.data.article.client;
      if(this.data.article.completedDate)
        this.completedDate = this.data.article.completedDate;      
      if(this.data.article.closedDate)
        this.closedDate = this.data.article.closedDate;
      if(this.data.article.targetDate)
        this.targetDate = this.data.article.targetDate;
      //this.articleType= this.data.article.articleTypes;
      this.article= this.data.article.article;
      this.pages = this.data.article.pages;
      this.inputType = InputType[this.data.article.inputType];
      this.complexity = Complexity[this.data.article.complexity];
      this.mathCount = this.data.article.mathCount;
      this.imagesCount = this.data.article.imagesCount;
      this.AdminCommand = this.data.article.AdminCommand;
      this.processType= ProcessType[this.data.article.processType];    
      if(this.data.article.userComments)
        this.userComments = this.data.article.userComments;      
      if(this.data.article.assignedPages)
        this.assignedPages = this.data.article.assignedPages;
      if(!this.fromNonAdmin){        
        if(this.data.article.assignedTo){
          this.assignedTo = this.data.article.assignedTo._id;
        }
        if(this.data.article.targetDate){
          this.targetDate = this.data.article.targetDate;
        }         
      }     
      this.userstatus = UserStatus[this.data.article.userstatus];
    }
  }
  ngOnInit(): void {
    this._userService.getNonAdmin().subscribe({
      next: (data) => {        
        if(data.success){
          this.users = data.data;
          if(this.data.article && this.data.article.assignedTo){
            this.assignedTo = this.data.article.assignedTo._id;
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSave(): void {
    const loggedUser: IUser | null = this._authService.getLoggedInUser();
    const data: IArticleSave = {
      batch:this.batch,
      //articleTypes: this.articleType,
      article: this.article,
      pages: this.pages,
      processType: this.processType,
      assignedTo: this.assignedTo,
      userstatus:this.userstatus,
      complexity:this.complexity,
      inputType:this.inputType,
      mathCount:this.mathCount,
      imagesCount:this.imagesCount,
      closedDate:this.closedDate,
      targetDate:this.targetDate,
      completedDate:this.completedDate,
      AdminCommand:this.AdminCommand,
      userComments: this.userComments,
      assignedPages: this.assignedPages,
    }
    data.createdBy = loggedUser?._id;
    if(this.fromNonAdmin){
      data.assignedTo = loggedUser?._id;
      data.IsCreatedByMe = true;
    }
    else{
      data.client = this.client;
      data.IsCreatedByMe = false;
    }
    this._articleService.saveArticle(data).subscribe({
      next: (data) => {
        if(data.success){
          this._snackBar.open('Article saved', "", {
            duration: 3000
          });
          this._dialog.close(true);
        }
        else{
          let error = data.error;
          if(typeof error == "string")
            this._snackBar.open(error, "", {
              duration: 3000
            });
          else if (Array.isArray(error)){
            this._snackBar.open(error.join(", "), "", {
              duration: 3000
            });
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateArticle(): void {

    const data: IArticleSave = {      
      client:this.client,
      batch:this.batch,
      //articleTypes: this.articleType,
      article: this.article,
      pages: this.pages,
      processType: this.processType,
      assignedTo: this.assignedTo,
      userstatus:this.userstatus,
      complexity:this.complexity,
      inputType:this.inputType,
      mathCount:this.mathCount,
      imagesCount:this.imagesCount,
      closedDate:this.closedDate,
      targetDate:this.targetDate,
      completedDate:this.completedDate,
      AdminCommand:this.AdminCommand,
      userComments:this.userComments,
      assignedPages:this.assignedPages,
      _id:this._id
    }
    
    this._articleService.updateArticle(data, this.data.article._id!).subscribe({
      next: (data) => {
        this._snackBar.open('Article updated', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  CloseArticle():void{
    
  }
  getUserOptions():string[]{
    return this.userstatusOptions.filter((a)=>['STARTED','NOT STARTED','COMPLETED'].indexOf(a)>-1)
  }
}
