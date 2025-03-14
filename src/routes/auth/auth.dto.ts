import { Exclude, Type } from 'class-transformer'
import { IsEmail, IsString, Length } from 'class-validator'
import { Match } from 'src/shared/decorators/custom-validator.decorator'
import { SuccessResDTO } from 'src/shared/shared.dto'

export class LoginBodyDTO {
  @IsEmail()
  email: string
  @IsString()
  @Length(6, 20, {
    message: 'Password must be between 6 to 20 characters',
  })
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  @Match('password', {
    message: 'Mật khẩu không khớp',
  })
  confirmPassword: string
  @IsString()
  name: string
}

export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string
}

export class LogoutBodyDTO extends RefreshTokenBodyDTO {}

export class LogoutResDTO {
  message: string
  constructor(partial: Partial<LogoutResDTO>) {
    Object.assign(this, partial)
  }
}

export class LoginResDTO {
  accessToken: string
  refreshToken: string
  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial)
  }
}

export class RefreshTokenResDTO extends LoginResDTO {}

// export class RegisterResDTO {
//   id: number
//   email: string
//   name: string
//   @Exclude() password: string
//   createdAt: Date
//   updatedAt: Date

//   constructor(partial: Partial<RegisterResDTO>) {
//     Object.assign(this, partial);
//   }
// }
class RegisterData {
  id: number
  email: string
  name: string
  @Exclude() password: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<RegisterData>) {
    Object.assign(this, partial)
  }
}

export class RegisterResDTO extends SuccessResDTO {
  @Type(() => RegisterData)
  data: RegisterData
  constructor(partial: Partial<RegisterResDTO>) {
    super(partial)
    Object.assign(this, partial)
  }
}
