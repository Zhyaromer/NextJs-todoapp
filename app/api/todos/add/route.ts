import { NextResponse } from "next/server";
import { query } from "@/model/mysql";

type Todo = {
    userid: number;
    task: string;
    complete: boolean;
};

export async function POST(request: Request) {
    const { task, complete, userid }: Todo = await request.json();

    if (!task || typeof complete !== "boolean" || !userid) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const result = await query("INSERT INTO tasks (userid, task, complete) VALUES (?, ?, ?)", [userid, task, complete]) as { affectedRows: number };

    if (result.affectedRows > 0) {
        return NextResponse.json({ message: "Task added successfully" }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Failed to add task" }, { status: 500 });
    }

}
