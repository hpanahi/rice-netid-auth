'use client';

import { useEffect, useState } from 'react';

// ASCII Owl frames - inspired by ghostty.org's animation style
const owlFrames = [
  // Frame 1
  `
    ___
   (o,o)
   {"-"}
   -"-"-
  `,
  // Frame 2
  `
    ___
   (O,O)
   {"-"}
   -"-"-
  `,
  // Frame 3
  `
    ___
   (@,@)
   {"-"}
   -"-"-
  `,
  // Frame 4
  `
    ___
   (0,0)
   {"-"}
   -"-"-
  `,
  // Frame 5
  `
    ___
   (o,o)
   {♥-♥}
   -"-"-
  `,
  // Frame 6
  `
    ___
   (^,^)
   {"-"}
   -"-"-
  `,
  // Frame 7
  `
    ___
   (*,*)
   {"-"}
   -"-"-
  `,
  // Frame 8
  `
    ___
   (◉,◉)
   {"-"}
   -"-"-
  `,
  // Frame 9
  `
    ___
   (●,●)
   {"-"}
   -"-"-
  `,
  // Frame 10
  `
    ___
   (○,○)
   {"-"}
   -"-"-
  `,
  // Frame 11
  `
    ___
   (◕,◕)
   {"-"}
   -"-"-
  `,
  // Frame 12
  `
    ___
   (◐,◐)
   {"-"}
   -"-"-
  `,
  // Frame 13
  `
    ___
   (◑,◑)
   {"-"}
   -"-"-
  `,
  // Frame 14
  `
    ___
   (◒,◒)
   {"-"}
   -"-"-
  `,
  // Frame 15
  `
    ___
   (◓,◓)
   {"-"}
   -"-"-
  `,
  // Frame 16
  `
    ___
   (o,o)
   {∩_∩}
   -"-"-
  `,
];

export default function AnimatedOwl() {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % owlFrames.length);
    }, 150); // Change frame every 150ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative flex justify-center">
        <pre className="text-6xl font-bold text-blue-600 dark:text-blue-400 select-none animate-pulse-subtle text-center">
          {owlFrames[currentFrame]}
        </pre>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Welcome, Rice Owl!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          You are successfully authenticated with your Rice NetID
        </p>
      </div>
    </div>
  );
}
