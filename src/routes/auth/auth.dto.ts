import { Exclude, Type } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { SuccessResDTO } from 'src/shared/shared.dto'

export class LoginBodyDTO {
  @IsEmail()
  email: string
  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  confirmPassword: string
  @IsString()
  name: string
}

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
