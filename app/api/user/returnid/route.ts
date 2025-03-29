import { NextResponse } from "next/server";
import { query } from "@/model/mysql";
import { Users } from "@/types";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const result = await query("SELECT id FROM users WHERE email = ?", [email]) as { id: number }[];

    if (result.length > 0) {
        return NextResponse.json({ id: result[0].id }, { status: 200 });
    } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
}