import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Finance } from "@/types/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const id = searchParams.get("id");

  if (!user_id && !id) {
    return NextResponse.json(
      { error: "Either User ID or Finance ID is required" },
      { status: 400 }
    );
  }

  const query = supabase.from("finance").select("*");

  if (user_id) {
    query.eq("user_id", user_id);
  }

  if (id) {
    query.eq("id", id);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const {
    user_id,
    amount,
    type,
    reason,
    payment_method,
    bank_name,
    date,
  }: Finance = await req.json();

  const { data, error } = await supabase
    .from("finance")
    .insert([
      {
        user_id,
        amount,
        type,
        reason,
        payment_method,
        date,
        bank_name,
      },
    ])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
