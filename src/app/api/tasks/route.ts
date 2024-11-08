import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Task } from "@/types/models";

export async function GET() {
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { user_id, name, priority, status }: Task = await req.json();

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        user_id,
        name,
        priority,
        status,
        created_at: new Date(),
      },
    ])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
