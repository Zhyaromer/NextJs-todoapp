import { query } from "@/model/mysql";
import { NextResponse } from "next/server";
import { Todo } from "@/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userid: string | null = searchParams.get("userid");

    if (!userid) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const result: Todo[] = await query("SELECT * FROM tasks WHERE userid = ?", [userid]) as Todo[];

    return NextResponse.json({ todos: result }, { status: 200 });
}