import { z } from "zod";
import { api } from "../../lib/axios"
import { authorSchema } from "../../validations/author";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type AuthorFormData = z.infer<typeof authorSchema>;

export default function AuthorForm() {

    const {register,handleSubmit,formState:{errors}} = useForm<AuthorFormData>({
        resolver:zodResolver(authorSchema),
        defaultValues:{
            name:'',
            role:'',
            avatar:''
        }
    })
    
    

    async function createAuthor(data:AuthorFormData){
        const response=await api.post('/authors',data);
        return response.data
    }

    async function onSubmit(data:AuthorFormData){
        console.log(data)
        await createAuthor(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input {...register('name')} type="text" name="name"  id="name" />
                {errors.name && <p>{errors.name.message}</p> }
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input {...register('role')} type="text"  id="role" name="role" />
                {errors.role && <p>{errors.role.message}</p> }
            </div>
            <div>
                <label htmlFor="avatar_url">Avatar</label>
                <input type="text"
                {...register('avatar')} id="avatar" name="avatar" />
                {errors.avatar && <p>{errors.avatar.message}</p> }

            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
