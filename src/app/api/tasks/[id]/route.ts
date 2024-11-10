import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Task } from "@/types/models";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, priority, status }: Partial<Task> = await req.json();

  const { data, error } = await supabase
    .from("tasks")
    .update({ name, priority, status, updated_at: new Date() })
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

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
