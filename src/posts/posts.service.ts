import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getPosts() {
    return 'All posts';
  }
  createPost(body: any): any {
    return body;
  }
  getPost(id: string): string {
    return `Post ${id}`;
  }
  updatePost(id: string, body: any): any {
    return { id, ...body };
  }
  deletePost(id: string): string {
    return `Delete post ${id}`;
  }
}
