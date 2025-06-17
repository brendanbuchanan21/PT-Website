import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import type { AxiosResponse } from "axios";

type blogData = {
    id?: number
    title: string
    author: string
    date: string
    file?: File
    description: string
    isPublished: boolean
}

export type blogObject = {
    id: number
    title: string
    author: string
    date: string
    imageUrl: string
    description: string
    isPublished: boolean
}


//GET ALL BLOG POSTS QUERY
export function useGetBlogPosts() {

    return useQuery<blogObject[]>({ queryKey: ['blogPosts'], queryFn: async () => {
        
        const { data } = await axios.get("http://localhost:8080/api/blog/posts");
        return data;
    }})
}



//GET REQUEST FOR INDIVIDUAL BLOG POST
export function getBlogPostById(id: string) {
    return useQuery<blogObject>({ queryKey: ['blogById', id], queryFn: async () => {
        const { data } = await axios.get(`http://localhost:8080/api/blog/posts/${id}`);
        return data;
    }})
}
    


// POSTING A BLOG POST TO THE DB
export function usePostBlog() {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, Error, blogData>({
        mutationFn: async (data: blogData) => {

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('author', data.author);
            formData.append('date', data.date);
            formData.append('description', data.description);
            if (data.file) {
                formData.append('file', data.file);
            }
            formData.append('isPublished', data.isPublished.toString());

            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error("couldn't validate the request");
            const token = user?.getIdToken();
            return axios.post("http://localhost:8080/api/blog/create", formData, {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true
            });
        },
        onError: (error) => {
            console.log("couldn't go through with post. an error occurred");
            console.error('here is the failed request error:', error)
        },
        onSuccess: () => {
            // need to invalidate the post to the get request for blogs 
            queryClient.invalidateQueries({ queryKey: ['blogPosts']});
            console.log("good job posting successfully, bud.");
        }
    })
}

// PATCH A BLOG POST 
export function changeBlogPost() {
    const queryClient = useQueryClient();

    return useMutation<blogObject, Error, blogData>({
        mutationFn: async (data: blogData) => {

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('author', data.author);
            formData.append('date', data.date);
            formData.append('description', data.description);
            if (data.file) {
                formData.append('file', data.file);
            }
            formData.append('isPublished', data.isPublished.toString());

            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error("couldn't validate the request");
            const token = user?.getIdToken();

            const response = await axios.patch(`http://127.0.0.1:8080/api/blog/patch/${data.id}`, formData,
                {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true,
                })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
            console.log('success! the backend patched the blog post');
        },
        onError: (error) => {
            console.error("here is why the query failed:", error);
        }
    })
}

// DELETE BLOG POST
export function deleteBlogPost() {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationFn: async (id) => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error("couldn't validate the delete request");
            const token = user?.getIdToken();
            const response = await axios.delete(`http://localhost:8080/api/blog/delete/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`,
                    withCredentials: true,
                }
                });
                return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogPosts']});
            console.log('success deleting the blog post');
        },
        onError: (error) => {
            console.error("here is the reason why your query failed:", error);
        }
    })

}