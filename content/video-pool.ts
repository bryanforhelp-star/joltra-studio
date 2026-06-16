/** Verified hotlink-friendly MP4 sources for example clips. */
export type PoolClip = {
  src: string;
  poster?: string;
  title: string;
};

export const VIDEO_POOL: PoolClip[] = [
  { title: "street moment", src: "/0.mp4" },
  {
    title: "cafe clip",
    src: "https://download.samplelib.com/mp4/sample-5s.mp4",
  },
  {
    title: "city walk",
    src: "https://download.samplelib.com/mp4/sample-10s.mp4",
  },
  {
    title: "night out",
    src: "https://download.samplelib.com/mp4/sample-15s.mp4",
  },
  {
    title: "studio take",
    src: "https://download.samplelib.com/mp4/sample-20s.mp4",
  },
  {
    title: "weekend vlog",
    src: "https://download.samplelib.com/mp4/sample-30s.mp4",
  },
  {
    title: "morning routine",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
  },
  {
    title: "b-roll cut",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    title: "highlight reel",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export const FEED_HOOKS = [
  { text: "wait for it", style: "outline" as const },
  { text: "well enough", style: "outline" as const },
  { text: "EIGHT...", style: "yellow" as const },
  { text: "no way", style: "yellow" as const },
  { text: "this part", style: "outline" as const },
  { text: "hear me out", style: "outline" as const },
  { text: "POV:", style: "yellow" as const },
  { text: "actually insane", style: "outline" as const },
];

export const PLATFORMS = ["Reels", "TikTok", "Shorts", "X"] as const;
