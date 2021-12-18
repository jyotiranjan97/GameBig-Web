import { getPosts, addPost, deletePost, updatePost } from '../../libs/posts';

export default async function handler(req: any, res: any) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getPosts(req, res);
    }

    case 'POST': {
      return addPost(req, res);
    }

    case 'PUT': {
      return updatePost(req, res);
    }

    case 'DELETE': {
      return deletePost(req, res);
    }
  }
}
