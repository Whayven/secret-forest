import { getStories } from "@/api/Story";
import { StoryItem } from "./StoryItem/StoryItem";

const data = await getStories();

const ListStories = async () => {
  return (
    <div>
      {data.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </div>
  );
};

export default ListStories;
