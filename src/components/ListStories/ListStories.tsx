import { getStories } from "@/api/Story";
import { StoryItem } from "./StoryItem/StoryItem";

const data = await getStories();
console.log("Fetched stories data:", data);

const ListStories = async () => {
  return (
    <div>
      <h3 className="font-bold text-2xl text-black">Stories</h3>
      {data.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </div>
  );
};

export default ListStories;
