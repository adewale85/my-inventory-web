
import { authApi } from "@/lib/api/auth";
import { login } from "@/lib/api/auth/login";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useLogin = () => {
    const router = useRouter
    const setAuth = useAuthStore((state)=>state.setAuth)
;
const {mutate: loginUser, isPending} = useMutation ({
    mutationFn: authApi.login

    onSuccess: async (authData) => {

    },

     onError: (error) => {
      console.error(error);
    },
 });
 return {loginUser, isPending}
  }