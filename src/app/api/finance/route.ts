import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Finance } from "@/types/models";

export async function GET() {
  const { data, error } = await supabase.from("finances").select("*");

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
    remaining_balance,
  }: Finance = await req.json();

  const { data, error } = await supabase
    .from("finances")
    .insert([
      {
        user_id,
        amount,
        type,
        reason,
        payment_method,
        remaining_balance,
        date: new Date().toISOString(),
      },
    ])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
