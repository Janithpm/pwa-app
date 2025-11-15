"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const noteSchema = z.object({
    userId: z.number().int().positive("Please select a user"),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface User {
    id: number;
    name: string;
    email: string;
}

export function NoteForm() {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NoteFormData>({
        resolver: zodResolver(noteSchema),
    });

    const { data: users = [] } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await fetch("/api/users");
            if (!response.ok) throw new Error("Failed to fetch users");
            return response.json();
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: NoteFormData) => {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to create note");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            reset();
        },
    });

    const onSubmit = (data: NoteFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-lg">
            <h2 className="text-2xl font-bold">Create Note</h2>

            <div>
                <label htmlFor="userId" className="block text-sm font-medium mb-1">
                    User
                </label>
                <select
                    id="userId"
                    {...register("userId", { valueAsNumber: true })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
                {errors.userId && (
                    <p className="text-sm text-red-500 mt-1">{errors.userId.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    {...register("content")}
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.content && (
                    <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                )}
            </div>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Create Note"}
            </Button>

            {mutation.isError && (
                <p className="text-sm text-red-500">Failed to create note. Please try again.</p>
            )}
            {mutation.isSuccess && (
                <p className="text-sm text-green-500">Note created successfully!</p>
            )}
        </form>
    );
}
