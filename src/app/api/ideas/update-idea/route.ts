import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { Idea } from "@/types/models";

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
    const { title, description }: Partial<Idea> = await req.json();

    const { data, error } = await supabase
      .from("ideas")
      .update({
        title,
        description,
      })
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Idea updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error updating idea:", error);
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
    const { error } = await supabase.from("ideas").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Idea deleted successfully" });
  } catch (error) {
    console.error("Error deleting idea:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
