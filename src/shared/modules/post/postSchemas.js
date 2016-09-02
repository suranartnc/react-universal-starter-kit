import { Schema } from 'normalizr';

const postSchema = new Schema('posts', {
  idAttribute: 'id'
});

export { postSchema };