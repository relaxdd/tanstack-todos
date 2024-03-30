import { z } from 'zod'

const todoItemSchema = z.object({
  id: z.coerce.number().int().positive(),
  userId: z.number().int().positive(),
  title: z.string(),
  completed: z.boolean(),
  created: z.string().datetime({ precision: 3 })
})

const todoListSchema = z.array(todoItemSchema)

type ITodo = z.infer<typeof todoItemSchema>

export type {
  ITodo
}

export {
  todoItemSchema,
  todoListSchema
}
