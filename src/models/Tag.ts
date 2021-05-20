import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const tagSchema = new Schema({
  title: {type: String, unique: true},
  color: String
})

export const Tag = mongoose.model("Tag", tagSchema);

export const saveTag = async (tag) => {
  const newTag = new Tag(tag)
  const data =  await newTag.save();
  console.log(data);
}