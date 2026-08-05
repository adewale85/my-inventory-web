import { signup, SignUpPayload } from "@/lib/api/auth/signUp"
import { useMutation } from "@tanstack/react-query"

export const useSignup = () => {
return useMutation ({
    mutationFn: (data: SignUpPayload) => signup(data),
})
}