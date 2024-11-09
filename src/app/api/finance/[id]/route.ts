import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Finance } from "@/types/models";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    amount,
    type,
    reason,
    payment_method,
    remaining_balance,
  }: Partial<Finance> = await req.json();

  const { data, error } = await supabase
    .from("finance")
    .update({
      amount,
      type,
      reason,
      payment_method,
      remaining_balance,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { error } = await supabase.from("finance").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Finance record deleted successfully" });
}
