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
            avatar_url:''
        }
    })
    

    async function createAuthor(data:AuthorFormData){
        const response=await api.post('/author',data);
        return response.data
    }

    return (
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text"  id="name" />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input type="text"  id="role" />
            </div>
            <div>
                <label htmlFor="avatar_url">Avatar</label>
                <input type="text"  id="avatar_url" />
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}
