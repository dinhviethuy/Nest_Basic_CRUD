import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { AccessTokenGuard } from '../../shared/guards/access-token.guard'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AccessTokenGuard)
  @UseGuards(APIKeyGuard)
  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }
  @Post()
  createPost(@Body() body: any) {
    return this.postsService.createPost(body)
  }
  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id)
  }
  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postsService.updatePost(id, body)
  }
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id)
  }
}
