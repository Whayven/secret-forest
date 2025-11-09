import { type Chapter } from "@/types/Story/story.schema";

type ChapterProps = {
  chapter: Chapter;
};

const ChapterComponent = ({ chapter }: ChapterProps) => {
  return (
    <div className="prose prose-lg">
      <h1>{chapter.title}</h1>
      <p>{chapter.description}</p>
    </div>
  );
};

export default ChapterComponent;
