import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import type { DraftedProspect, SeenProspect, SeenProspectsFile } from "../prospects/types";

const SEEN_PATH = resolve(process.cwd(), "data/prospects/seen.json");

export async function loadSeen(): Promise<SeenProspect[]> {
  try {
    const raw = await readFile(SEEN_PATH, "utf8");
    const parsed = JSON.parse(raw) as SeenProspectsFile;
    return parsed.prospects ?? [];
  } catch {
    return [];
  }
}

export async function saveSeen(prospects: SeenProspect[]): Promise<void> {
  await mkdir(resolve(process.cwd(), "data/prospects"), { recursive: true });
  const file: SeenProspectsFile = { prospects };
  await writeFile(SEEN_PATH, JSON.stringify(file, null, 2));
}

export function prospectKey(name: string, url: string): string {
  return `${name.toLowerCase().trim()}::${url.toLowerCase().trim()}`;
}

export function isSeen(prospect: DraftedProspect, seen: SeenProspect[]): boolean {
  const url = prospect.mainPlatform.url ?? "";
  const key = prospectKey(prospect.name, url);
  return seen.some((s) => prospectKey(s.name, s.mainPlatformUrl) === key);
}

export function toSeenEntry(prospect: DraftedProspect): SeenProspect {
  return {
    name: prospect.name,
    mainPlatformUrl: prospect.mainPlatform.url ?? "",
    addedAt: new Date().toISOString(),
  };
}
