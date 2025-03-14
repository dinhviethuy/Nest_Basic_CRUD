import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionGuard } from '../../shared/constants/auth.constant'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { CreatePostBodyDTO, GetPostItemDTO, UpdatePostBodyDTO } from './post.dto'

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
  async createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(await this.postsService.createPost(body, userId))
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return new GetPostItemDTO(await this.postsService.getPost(Number(id)))
  }
  @Put(':id')
  @Auth([AuthType.Bearer])
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(
      await this.postsService.updatePost({
        postId: Number(id),
        userId,
        body,
      }),
    )
  }
  @Delete(':id')
  @Auth([AuthType.Bearer])
  deletePost(@Param('id') id: string, @ActiveUser('userId') userId: number): Promise<boolean> {
    return this.postsService.deletePost({
      postId: Number(id),
      userId,
    })
  }
}
