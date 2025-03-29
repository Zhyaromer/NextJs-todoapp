import { NextResponse } from "next/server";
import { query } from "@/model/mysql";

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const result = await query("DELETE FROM tasks WHERE id = ?", [id]) as { affectedRows: number }

    if (result.affectedRows > 0) {
        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 })
    } else {
        return NextResponse.json({ message: "Failed to delete task" }, { status: 500 })
    }
}