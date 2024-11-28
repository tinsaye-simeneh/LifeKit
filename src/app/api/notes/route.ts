import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { PersonalNote } from "@/types/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("personal_notes")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { user_id, content, title }: PersonalNote = await req.json();

  const { data, error } = await supabase
    .from("personal_notes")
    .insert([
      {
        user_id,
        content,
        title,
      },
    ])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}