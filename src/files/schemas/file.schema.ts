import * as mongoose from 'mongoose'

export const FileSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  key: String,
  expAt: Number,
})