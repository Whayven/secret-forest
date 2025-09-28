import { getStories } from "@/api/Story";

const data = await getStories();
console.log("Fetched stories data:", data);

const ListStories = async () => {
  return (
    <div>
      <h3 className="font-bold text-2xl text-black">Stories</h3>
      {data.map((story) => (
        <div key={story.id} className="mb-4 p-4 border border-gray-300 rounded">
          <h4 className="font-semibold text-xl mb-2">{story.title}</h4>
          <div className="text-gray-700 flex flex-col gap-2">
            {story.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListStories;
