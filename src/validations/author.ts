import {z} from'zod'

export const authorSchema = z.object({
    name:z.string().min(3,'Name is required'),
    role:z.string().min(3,'Role is required'),
    avatar_url:z.string().min(3,'Image is required')
})