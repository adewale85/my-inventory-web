
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useLogin = () => {
    const router = useRouter()
    const setAuth = useAuthStore((state)=>state.setAuth)
;
const {mutate: loginUser, isPending} = useMutation ({
    mutationFn: authApi.login,

    onSuccess: async (authData) => {
        setAuth(authData)

        router.push("/dashboard");
    },

     onError: (error) => {
      console.error(error);
    },
 });
 return {loginUser, isPending}
 } 

