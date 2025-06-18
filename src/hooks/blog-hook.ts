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

const API_URL = import.meta.env.VITE_API_URL;

//GET ALL BLOG POSTS QUERY
export function useGetBlogPosts() {

    return useQuery<blogObject[]>({ queryKey: ['blogPosts'], queryFn: async () => {
        
        const { data } = await axios.get(`${API_URL}/api/blog/posts`);
        return data;
    }})
}



//GET REQUEST FOR INDIVIDUAL BLOG POST
export function getBlogPostById(id: string) {
    return useQuery<blogObject>({ queryKey: ['blogById', id], queryFn: async () => {
        const { data } = await axios.get(`${API_URL}/api/blog/posts/${id}`);
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
            const token = await user.getIdToken();
            return axios.post(`${API_URL}/api/blog/create`, formData, {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true
            });
        },
        onError: (error) => {
            console.error('here is the failed request error:', error)
        },
        onSuccess: () => {
            // need to invalidate the post to the get request for blogs 
            queryClient.invalidateQueries({ queryKey: ['blogPosts']});
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

            const response = await axios.patch(`${API_URL}/api/blog/patch/${data.id}`, formData,
                {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true,
                })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
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
            const token = await user.getIdToken();
            const response = await axios.delete(`${API_URL}/api/blog/delete/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true,
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogPosts']});
        },
        onError: (error) => {
            console.error("here is the reason why your query failed:", error);
        }
    })

}