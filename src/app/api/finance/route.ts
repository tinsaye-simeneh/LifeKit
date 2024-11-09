import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Finance } from "@/types/models";

export async function GET() {
  const { data, error } = await supabase.from("finance").select("*");

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
