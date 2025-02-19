import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { BankDetails } from "@/types/models";

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
    bank_name,
    account_number,
    account_name,
    atm_number,
    username,
    password,
  }: Partial<BankDetails> = await req.json();

  const { data, error } = await supabase
    .from("bank_details")
    .update({
      bank_name,
      account_number,
      account_name,
      atm_number,
      username,
      password,
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

  const { error } = await supabase.from("bank_details").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Bank details record deleted successfully",
  });
}
