import type { Album, Comment, Photo, Post, Todo, User } from "./types";

const USER_COUNT = 10;
const POST_COUNT = 100;
const COMMENT_COUNT = 500;
const ALBUM_COUNT = 100;
const PHOTO_COUNT = 5000;
const TODO_COUNT = 200;

const STREETS = [
  "Kulas Light",
  "Victor Plains",
  "Douglas Extension",
  "Hoeger Mall",
  "Skiles Walks"
];
const CITIES = [
  "Gwenborough",
  "Wisokyburgh",
  "McKenziehaven",
  "South Elvis",
  "Roscoeview"
];
const WORDS = [
  "sunt",
  "aut",
  "facere",
  "repellat",
  "provident",
  "occaecati",
  "excepturi",
  "optio",
  "reprehenderit",
  "quia",
  "et",
  "suscipit",
  "recusandae",
  "consequuntur",
  "expedita",
  "cum",
  "nostrum",
  "rerum",
  "est",
  "autem"
];

function word(seed: number): string {
  return WORDS[seed % WORDS.length];
}

function sentence(seed: number, length: number): string {
  return Array.from({ length }, (_, i) => word(seed + i)).join(" ");
}

function paragraph(seed: number, lines: number): string {
  return Array.from({ length: lines }, (_, i) =>
    sentence(seed + i * 3, 6)
  ).join("\n");
}

export function generateUsers(): User[] {
  return Array.from({ length: USER_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      id: n,
      name: `User ${word(n)} ${word(n + 1)}`,
      username: `user${n}`,
      email: `user${n}@example.com`,
      address: {
        street: STREETS[i % STREETS.length],
        suite: `Apt. ${n * 111}`,
        city: CITIES[i % CITIES.length],
        zipcode: `${10000 + n * 37}`,
        geo: {
          lat: (-90 + n * 12.3).toFixed(4),
          lng: (-180 + n * 24.6).toFixed(4)
        }
      },
      phone: `1-${100 + n}-${200 + n}-${3000 + n}`,
      website: `user${n}.example.com`,
      company: {
        name: `${word(n)}-${word(n + 2)} Group`,
        catchPhrase: sentence(n, 3),
        bs: sentence(n + 5, 3)
      }
    };
  });
}

export function generatePosts(): Post[] {
  return Array.from({ length: POST_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      id: n,
      userId: (i % USER_COUNT) + 1,
      title: sentence(n, 6),
      body: paragraph(n, 3)
    };
  });
}

export function generateComments(): Comment[] {
  return Array.from({ length: COMMENT_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      id: n,
      postId: (i % POST_COUNT) + 1,
      name: sentence(n, 5),
      email: `commenter${n}@example.com`,
      body: paragraph(n, 2)
    };
  });
}

export function generateAlbums(): Album[] {
  return Array.from({ length: ALBUM_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      id: n,
      userId: (i % USER_COUNT) + 1,
      title: sentence(n, 4)
    };
  });
}

export function generatePhotos(): Photo[] {
  return Array.from({ length: PHOTO_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      id: n,
      albumId: (i % ALBUM_COUNT) + 1,
      title: sentence(n, 5),
      url: `https://placehold.co/600x600?text=${n}`,
      thumbnailUrl: `https://placehold.co/150x150?text=${n}`
    };
  });
}

export function generateTodos(): Todo[] {
  return Array.from({ length: TODO_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      id: n,
      userId: (i % USER_COUNT) + 1,
      title: sentence(n, 5),
      completed: i % 2 === 0
    };
  });
}
