import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Idea } from "@/types/models";

export async function GET() {
  const { data, error } = await supabase.from("ideas").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { user_id, title, description }: Idea = await req.json();

  const { data, error } = await supabase
    .from("ideas")
    .insert([
      {
        user_id,
        title,
        description,
        created_at: new Date().toISOString(),
      },
    ])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
