import { NextResponse } from "next/server";
import { query } from "@/model/mysql";
import { Users } from "@/types";

export async function POST(request: Request) {
    const { name, email, img, providerid, provider }: Users = await request.json();

    if (!name || !email || !img || !providerid || !provider) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const result = await query("INSERT INTO users (name, email,img,providerid,provider) VALUES (?, ?, ?, ?, ?)", [name, email, img, providerid, provider]) as { affectedRows: number };

    if (result.affectedRows > 0) {
        return NextResponse.json({ message: "User added successfully" }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Failed to add user" }, { status: 500 });
    }
}