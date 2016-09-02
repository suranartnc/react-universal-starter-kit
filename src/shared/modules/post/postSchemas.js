import { Schema, arrayOf } from 'normalizr';

const postSchema = new Schema('posts', {
  idAttribute: 'id'
});

const postArraySchema = arrayOf(postSchema)

export { 
  postSchema,
  postArraySchema
};