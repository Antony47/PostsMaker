export interface CreateUserDto {
    email: string,
    password: string,
    age?: number
}

export type UpdateUserDto = Partial<CreateUserDto>