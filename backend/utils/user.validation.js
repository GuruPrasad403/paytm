import z from 'zod'

const userValidation = z.object({
  name: z.string()
    .trim()
    .min(3, 'Name must be at least 3 characters long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .max(25, 'Name must be at most 25 characters'),

  username: z.string()
    .trim()
    .min(5, 'Username must be at least 5 characters long')
    .max(25, 'Username must be at most 25 characters'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      'Password must include uppercase, lowercase, number, and special character'
    )
})
const userValidationUpdate = z.object({
    name: z.string()
      .trim()
      .min(3, 'Name must be at least 3 characters long')
      .max(25, 'Name must be at most 25 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .optional(),
  
    username: z.string()
      .trim()
      .min(5, 'Username must be at least 5 characters long')
      .max(25, 'Username must be at most 25 characters')
      .optional(),
  
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        'Password must include uppercase, lowercase, number, and special character'
      )
      .optional()
  })
export {userValidation,userValidationUpdate}