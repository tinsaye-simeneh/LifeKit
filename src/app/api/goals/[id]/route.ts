import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Goal } from "@/types/models";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    title,
    description,
    start_date,
    end_date,
    category,
    status,
  }: Partial<Goal> = await req.json();

  const { data, error } = await supabase
    .from("goals")
    .update({
      title,
      description,
      start_date,
      end_date,
      category,
      status,
      updated_at: new Date(),
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

  const { error } = await supabase.from("goals").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Goal deleted successfully" });
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
