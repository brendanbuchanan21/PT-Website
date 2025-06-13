import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import type { AxiosResponse } from "axios";

type blogData = {
    title: string
    author: string
    date: string
    image: File
    description: string
}


export function useGetBlogPosts() {

    return useQuery<blogData>({ queryKey: ['blogPosts'], queryFn: async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("cannot query bloggs if not an active user");
        const token = user?.getIdToken();
        const { data } = await axios.get("http://localhost/api/blog/posts", {
            headers: {Authorization: `Bearer ${token}`},
            withCredentials: true,
        })
        return data;
    }})
}



export function usePostBlog() {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, Error, blogData>({
        mutationFn: async (data: blogData) => {

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('author', data.author);
            formData.append('date', data.date);
            formData.append('description', data.description);
            formData.append('file', data.image); 

            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error("couldn't validate the request");
            const token = user?.getIdToken();
            return axios.post("http://localhost/api/blog/create", formData, {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true
            });
        },
        onError: () => {
            console.log("couldn't go through with post. an error occurred");
        },
        onSuccess: () => {
            // need to invalidate the post to the get request for blogs 
            queryClient.invalidateQueries({ queryKey: ['blogPosts']});
            console.log("good job posting successfully, bud.");
        }
    })
}