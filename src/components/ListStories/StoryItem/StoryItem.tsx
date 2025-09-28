import type { Story } from "@/components/Story/schema";

export const StoryItem = ({ story }: { story: Story }) => {
  return (
    <a
      href={`/stories/${story.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        key={story.id}
        className="mb-4 p-6 border border-gray-300 rounded-md bg-white cursor-pointer hover:shadow-lg transition-shadow"
      >
        <span className="font-semibold text-xl mb-2">{story.title}</span>
        <div className="border-b border-gray-300 my-2 w-1/3" />
        <div className="text-gray-700 flex flex-col gap-2">
          {story.description}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Published:{" "}
          {story.publishedAt &&
            new Date(story.publishedAt).toLocaleDateString()}
        </div>
      </div>
    </a>
  );
};
