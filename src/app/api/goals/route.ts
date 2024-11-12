import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Goal } from "@/types/models";

export async function GET() {
  const { data, error } = await supabase.from("goals").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const {
    user_id,
    title,
    description,
    start_date,
    end_date,
    category,
    status,
  }: Goal = await req.json();

  const { data, error } = await supabase
    .from("goals")
    .insert([
      {
        user_id,
        title,
        description,
        start_date,
        end_date,
        category,
        status,
        created_at: new Date().toISOString(),
      },
    ])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
