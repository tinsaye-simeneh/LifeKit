import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing or invalid 'id' query parameter" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("temporary")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching the record:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "No record found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
