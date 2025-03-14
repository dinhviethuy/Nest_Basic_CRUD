import { Exclude } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'

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

export class RegisterResDTO {
  id: number
  email: string
  name: string
  @Exclude() password: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial);
  }
}