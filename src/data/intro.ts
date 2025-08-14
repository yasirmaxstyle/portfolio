const intro = `
// intro.ts
export interface Developer {
  name: string;
  role: string;
  location: string;
  passion: string[];
}

export const profile: Developer = {
  name: "Muhamad Yasir",
  role: "Fullstack Developer",
  location: "Jakarta, Indonesia",
  passion: [
    "Building scalable applications",
    "Clean code architecture",
    "Problem solving",
    "Continuous learning"
  ]
};

export default profile;
`

export default intro