export interface User {
  id: number
  username?: string
  password?: string
  firstName?: string
  lastName?: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateUserInput = Partial<CreateUserInput>
