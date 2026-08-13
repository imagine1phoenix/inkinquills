export interface Story {
  id: string;
  title: string;
  author: string;
  body: string;
  type: "story" | "poem";
  date: string; // YYYY-MM format
  featured?: boolean;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  description: string;
  status: "upcoming" | "past";
  photos: string[]; // paths to images in /public/events/
  longDescription?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string; // CSS color for the spine/cover
  spineColor: string; // CSS color for spine accent
  textColor: string; // CSS color for spine text
  review: string;
  synopsis: string;
  recommendedBy: string;
  genre: string;
  year?: number;
}
