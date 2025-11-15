"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().int().positive("Age must be positive"),
    email: z.string().email("Invalid email address"),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    const mutation = useMutation({
        mutationFn: async (data: UserFormData) => {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to create user");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            reset();
        },
    });

    const onSubmit = (data: UserFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-lg">
            <h2 className="text-2xl font-bold">Create User</h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                </label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                    Age
                </label>
                <Input id="age" type="number" {...register("age", { valueAsNumber: true })} />
                {errors.age && (
                    <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
            </div>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Create User"}
            </Button>

            {mutation.isError && (
                <p className="text-sm text-red-500">Failed to create user. Please try again.</p>
            )}
            {mutation.isSuccess && (
                <p className="text-sm text-green-500">User created successfully!</p>
            )}
        </form>
    );
}
