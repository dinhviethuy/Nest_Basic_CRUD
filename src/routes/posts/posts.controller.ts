import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionGuard } from '../../shared/constants/auth.constant'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.APIKey], { condition: ConditionGuard.Or })
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
