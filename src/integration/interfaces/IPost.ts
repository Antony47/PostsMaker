export interface CreatePostDto {
    email: string,
    title: string,
    content: string
}
export type UpdatePostDto = Partial<CreatePostDto>