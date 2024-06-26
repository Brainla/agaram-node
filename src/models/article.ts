import mongoose from "mongoose";
import { getCurrentDate, getCurrentDateWithTime } from "../utils";

const articleSchema = new mongoose.Schema(
  {
    // articleTypes: {
    //   type: String,
    //   required: true,
    // },
    article: {
      type: String,
      required: true,
    },
    // datefield: {
    //   type: Date,
    //   required: true,
    // },
    pages: {
      type: Number,
      required: true,
    },
    inputType: {
      type: String,
      required: true,
      enum: ["PRINTED PDF", "SCANNED PDF"],
      default: "PRINTED PDF"
    },
    complexity: {
      type: String,
      required: true,
      enum: ["SIMPLE", "MEDIUM", "COMPLEX", "HEAVY-COMPLEX"],
      default: "SIMPLE"
    },
    processType: {
      type: String,
      required: true,
      enum: ["OCR",
        "EPUB", 
        "CODING", 
        "IMAGES", 
        "REFERENCE", 
        "QUALITY ASURENCE",
        "END TO END",
        "SUPPORT", 
        "REWORK",
        "InDesign to XML",
        "Word to XML",
        "ePub to XML",
        "XML to PDF"
      ],
      default: "OCR"
    },
    mathCount: {
      type: String,
      required: false,
    },
    imagesCount: {
      type: String,
      required: false,
    },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: ["ASSIGNED", "UNASSIGNED", "CLOSED", "REJECTED", "COMPLETED"],
    //   default: "UNASSIGNED"
    // },
    userstatus: {
      type: String,
      enum: ["ASSIGNED", "UNASSIGNED","STARTED", "NOT STARTED", "COMPLETED","CLOSED", "REJECTED",],
      default: "NOT STARTED"
    },
    assignedTo: {
      type: String,
      ref: "User"
    },
    client: {
      type: String,
    },
    batch: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
      default: function(){
        return new Date(getCurrentDateWithTime())
      },
    },
    closedDate: {
      type: Date,      
    },
    completedDate: {
      type: Date,
    },
    createdBy:{
      type: String,
      ref: "User"
    },
    IsCreatedByMe:{
      type:Boolean
    },
    AdminCommand:{
      type: String,
    },
    IsClosed:{
      type:Boolean,
    },
    userCompletedDate: {
      type: Date,      
    },    
    targetDate: {
      type: Date,      
    },
    userComments: {
      type: String,
    },
    assignedPages: {
      type: String,
    },
  },
  { timestamps: { updatedAt: true, createdAt: false } }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
