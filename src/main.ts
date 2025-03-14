import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tự động loại bỏ các trường không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // nếu có trường không được định nghĩa trong DTO thì reject request
      transform: true, // tự động chuyển các kiểu dữ liệu sang kiểu mong muốn
      transformOptions: {
        enableImplicitConversion: true, // cho phép chuyển đổi kiểu dữ liệu ngầm định
      },
      exceptionFactory(errors) {
        return new UnprocessableEntityException(
          errors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints as any)[0],
          })),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
