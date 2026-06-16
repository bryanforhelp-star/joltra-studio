export type VideoExample = {
  id: string;
  title: string;
  platform: string;
  src?: string;
  poster?: string;
  caption?: string;
  captionStyle?: "yellow" | "outline";
  placeholderVariant?: "action" | "podcast" | "interview";
};
