// This is a TypeScript interface.

import { Timestamp } from "firebase/firestore";

// Learn More: https://www.typescriptlang.org/docs/handbook/interfaces.html
export interface SocialData {
  id: string;
  time: Timestamp;
  title: string;
  content: string;
  location: string;
  image: string;
  author: string;
}
