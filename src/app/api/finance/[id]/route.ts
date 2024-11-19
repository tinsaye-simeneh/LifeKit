import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Finance } from "@/types/models";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query; // Retrieve the `id` from the query parameters

  if (typeof id !== "string") {
    return res
      .status(400)
      .json({ error: "Finance ID is required and must be a string" });
  }

  const { data, error } = await supabase
    .from("finance")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: "No finance record found" });
  }

  return res.status(200).json({ data });
}
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
      updated_at: new Date().toISOString(),
      bank_name,
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
