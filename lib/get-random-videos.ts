import {
  FEED_HOOKS,
  PLATFORMS,
  VIDEO_POOL,
  type PoolClip,
} from "@/content/video-pool";
import type { VideoExample } from "@/content/video-examples";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickHook() {
  return FEED_HOOKS[Math.floor(Math.random() * FEED_HOOKS.length)];
}

function clipToExample(clip: PoolClip, index: number): VideoExample {
  const hook = pickHook();
  return {
    id: `clip-${index}-${clip.src.slice(-12)}`,
    title: clip.title,
    platform: PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)],
    src: clip.src,
    poster: clip.poster,
    caption: hook.text,
    captionStyle: hook.style,
  };
}

export function pickRandomFromPool(count: number): VideoExample[] {
  return shuffle(VIDEO_POOL).slice(0, count).map(clipToExample);
}

type PexelsVideoFile = {
  link: string;
  width: number;
  height: number;
  quality?: string;
};

type PexelsVideo = {
  id: number;
  image: string;
  video_files: PexelsVideoFile[];
};

async function fetchPexelsPortraitVideos(count: number): Promise<VideoExample[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return [];

  const topics = [
    "portrait",
    "vlog",
    "street",
    "fitness",
    "fashion",
    "coffee",
    "city",
  ];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const page = Math.floor(Math.random() * 8) + 1;

  try {
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${topic}&orientation=portrait&per_page=40&page=${page}`,
      {
        headers: { Authorization: apiKey },
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    const data = (await res.json()) as { videos?: PexelsVideo[] };
    const portraitClips: VideoExample[] = [];

    for (const video of data.videos ?? []) {
      const file =
        video.video_files
          .filter((f) => f.height >= f.width)
          .sort((a, b) => b.height - a.height)[0] ??
        video.video_files.sort((a, b) => b.height - a.height)[0];

      if (!file) continue;

      const hook = pickHook();
      portraitClips.push({
        id: String(video.id),
        title: topic,
        platform: PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)],
        src: file.link,
        poster: video.image,
        caption: hook.text,
        captionStyle: hook.style,
      });
    }

    return shuffle(portraitClips).slice(0, count);
  } catch {
    return [];
  }
}

/** Random portrait clips for the examples fan. Refreshes each request. */
export async function getRandomVideoExamples(
  count = 4,
): Promise<VideoExample[]> {
  const fromPexels = await fetchPexelsPortraitVideos(count);

  if (fromPexels.length >= count) {
    return fromPexels.map((example, index) => {
      const hook = pickHook();
      return {
        ...example,
        id: `pexels-${example.id}-${index}`,
        caption: example.caption ?? hook.text,
        captionStyle: example.captionStyle ?? hook.style,
      };
    });
  }

  return pickRandomFromPool(count);
}
