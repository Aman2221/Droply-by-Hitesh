import * as z from "zod";

export const signUpSchema = z.object({
    email: z.string().min(1, { message: "email is required" })
        .email({ message: "Please enter a valid email" }),

    password: z.string()
        .min(1, { message: "Password is required" })
        .min(8, { message: 'Password should be at least 8 characters' }),

    passwordConfirmation: z.string()
        .min(1, { message: "Please confirm your password" })
})
    // custom method to check if password and confirm password are same, way to add custom check with ZOD
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Password and confirm password should be the same",
        path: ["passwordConfirmation"]
    })