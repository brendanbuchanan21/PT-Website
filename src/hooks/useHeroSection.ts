import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import type { AxiosResponse } from "axios";


type HeroSectionData = {
    heading: string
    subText1: string
    subText2: string
}


export function useHeroSection() {

    return useQuery<HeroSectionData>({ queryKey: ['heroSection'], queryFn: async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('user not authenticated');
        const token = await user?.getIdToken();
        const { data } = await axios.get("http://localhost:8080/api/hero-section", {
            headers: { Authorization: `Bearer ${token}`},
            withCredentials: true,
        })
        return data;
    }})
}

export function usePatchHeroSection() {
    const queryClient = useQueryClient()

    return useMutation<AxiosResponse, Error, HeroSectionData>({
        mutationFn: async (newData: HeroSectionData) => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error("user does not exist");
            const token = await user.getIdToken();
            
            return axios.patch("http://localhost:8080", newData, {
                headers: { Authorization: `Bearer ${token}`},
                withCredentials: true,
            });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['heroSection']})
            },
            onError: () => {
                console.log("error patching the heading texts in the request");
            } ,
    })
    
}





