"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function UserForm() {
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");

    const mutation = useMutation({
        mutationFn: async (data: { name: string; age: number; email: string }) => {
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
            setName("");
            setAge("");
            setEmail("");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            name,
            age: parseInt(age),
            email,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg">
            <h2 className="text-2xl font-bold">Create User</h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                </label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                    Age
                </label>
                <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
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
