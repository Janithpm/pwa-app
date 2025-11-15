import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().int().positive("Age must be positive"),
    email: z.string().email("Invalid email address"),
});

export async function GET() {
    try {
        const users = await db().select().from(usersTable);
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = createUserSchema.parse(body);

        const [newUser] = await db()
            .insert(usersTable)
            .values(validatedData)
            .returning();

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation failed", details: error.issues },
                { status: 400 }
            );
        }
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}
