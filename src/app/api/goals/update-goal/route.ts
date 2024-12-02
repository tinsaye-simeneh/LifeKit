import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Goal } from "@/types/models";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' query parameter" },
      { status: 400 }
    );
  }

  try {
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
      })
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Goal updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
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

  try {
    const { error } = await supabase.from("goals").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
