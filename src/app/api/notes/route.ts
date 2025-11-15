import { db } from "@/db";
import { notesTable } from "@/db/schema/test-schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const createNoteSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
});

export async function GET() {
    try {
        const notes = await db()
            .select({
                id: notesTable.id,
                title: notesTable.title,
                content: notesTable.content,
                createdAt: notesTable.createdAt,
                updatedAt: notesTable.updatedAt
            })
            .from(notesTable)

        return NextResponse.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json(
            { error: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = createNoteSchema.parse(body);

        const [newNote] = await db()
            .insert(notesTable)
            .values(validatedData)
            .returning();

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation failed", details: error.issues },
                { status: 400 }
            );
        }
        console.error("Error creating note:", error);
        return NextResponse.json(
            { error: "Failed to create note" },
            { status: 500 }
        );
    }
}
