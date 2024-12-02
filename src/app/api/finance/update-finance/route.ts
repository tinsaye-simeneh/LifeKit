import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Finance } from "@/types/models";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' query parameter" },
      { status: 400 }
    );
  }

  const {
    amount,
    type,
    reason,
    payment_method,
    bank_name,
    date,
  }: Partial<Finance> = await req.json();

  const { data, error } = await supabase
    .from("finance")
    .update({
      amount,
      type,
      reason,
      payment_method,
      date,
      bank_name,
    })
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' query parameter" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("finance").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Finance record deleted successfully" });
}
