import { NextResponse } from "next/server";
import { query } from "@/model/mysql";

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const result = await query("UPDATE tasks SET complete = NOT complete WHERE id = ?", [id]) as { affectedRows: number }

    if (result.affectedRows > 0) {
        return NextResponse.json({ message: "Task toggled successfully" }, { status: 200 })
    } else {
        return NextResponse.json({ message: "Failed to toggle task" }, { status: 500 })
    }
}