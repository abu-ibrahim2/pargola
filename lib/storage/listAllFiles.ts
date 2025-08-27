// lib/storage/listAllFiles.ts
import { SupabaseClient } from "@supabase/supabase-js";

export async function listAllFilesRecursive(
  supabase: SupabaseClient,
  bucket: string,
  prefix: string // e.g. "pergolas/fixed"
) {
  const results: { name: string; id?: string }[] = [];
  const stack = [prefix.replace(/^\/+|\/+$/g, "")]; // normalize

  while (stack.length) {
    const path = stack.pop()!;
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path, { limit: 1000, sortBy: { column: "name", order: "asc" } });

    if (error) continue;

    for (const entry of data || []) {
      if ((entry as any).metadata) {
        // file
        results.push({ name: `${path}/${entry.name}` });
      } else {
        // folder -> go deeper
        stack.push(`${path}/${entry.name}`);
      }
    }
  }
  return results;
}
