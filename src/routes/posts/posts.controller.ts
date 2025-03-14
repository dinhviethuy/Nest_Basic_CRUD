import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionGuard } from '../../shared/constants/auth.constant'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { GetPostItemDTO } from './post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.APIKey], { condition: ConditionGuard.Or })
  @Get()
  getPosts(@ActiveUser('userId') userId: number) {
    return this.postsService.getPosts(userId).then((posts) => {
      return posts.map((post) => new GetPostItemDTO(post))
    })
  }
  @Post()
  @Auth([AuthType.Bearer])
  createPost(@Body() body: any, @ActiveUser('userId') userId: number) {
    return this.postsService.createPost(body, userId)
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
