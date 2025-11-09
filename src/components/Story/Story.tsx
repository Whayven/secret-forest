import { astToReact } from "@/utils";
import React from "react";
import type { Story as StoryType } from "@/types/Story/story.types";

interface StoryProps {
  story: StoryType;
}

const Story: React.FC<StoryProps> = async ({ story }) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      {story.description && (
        <p className="text-lg text-gray-700 mb-6">{story.description}</p>
      )}
      <div className="prose prose-lg flex flex-col gap-8">
        {story.chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`/stories/${story.slug}/${chapter.slug}`}
            className="block p-4 border rounded-lg hover:bg-gray-100 transition"
          >
            <h2 className="text-2xl font-semibold mb-4">{chapter.title}</h2>
            <div>{chapter.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Story;
