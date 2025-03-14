/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/services/prisma.service';

@Injectable()
export class PostsService {

  constructor(private readonly prismaService: PrismaService) { }

  getPosts() {
    return this.prismaService.post.findMany()
  }
  createPost(body: any): any {
    const userId = 1
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })
  }
  getPost(id: string): string {
    return `Post ${id}`
  }
  updatePost(id: string, body: any): any {
    return { id, ...body }
  }
  deletePost(id: string): string {
    return `Delete post ${id}`
  }
}
