import type { Chapter } from "@/types/Story/story.types";

type ListChapterProps = {
  chapters: Chapter[];
};

const ChapterItem = ({ chapter }: { chapter: Chapter }) => {
  return (
    <div
      key={chapter.id}
      className="mb-4 p-6 border border-gray-300 rounded-md bg-white cursor-pointer hover:shadow-lg transition-shadow"
    >
      <span className="font-semibold text-xl mb-2">{chapter.title}</span>
      <div className="border-b border-gray-300 my-2 w-1/3" />
      <div className="text-gray-700 flex flex-col gap-2">
        {chapter.description}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Published:{" "}
        {chapter.publishedAt &&
          new Date(chapter.publishedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

const ListChapters = ({ chapters }: ListChapterProps) => {
  return (
    <div>
      {chapters.map((chapter) => (
        <ChapterItem key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
};

export default ListChapters;
