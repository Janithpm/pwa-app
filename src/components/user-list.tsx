"use client";

import { useQuery } from "@tanstack/react-query";

interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    createdAt: string;
}

export function UserList() {
    const { data: users = [], isLoading, isError } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await fetch("/api/users");
            if (!response.ok) throw new Error("Failed to fetch users");
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <div className="p-6 border rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Users</h2>
                <p className="text-muted-foreground">Loading users...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 border rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Users</h2>
                <p className="text-red-500">Failed to load users</p>
            </div>
        );
    }

    return (
        <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Users ({users.length})</h2>
            {users.length === 0 ? (
                <p className="text-muted-foreground">No users found. Create one above!</p>
            ) : (
                <div className="space-y-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 border rounded-md bg-card hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <span className="text-sm font-medium px-2 py-1 bg-primary/10 rounded">
                                    Age: {user.age}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Created: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
