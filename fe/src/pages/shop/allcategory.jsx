import { allcategory } from "@/config";

const AllCategory = () => {
    return ( 
    <div className="px-20">
        <h1>Tất cả danh mục</h1>
        {Object.entries(allcategory).map(([categoryKey, subcategories]) => (
          <div key={categoryKey} className="mb-4">
            <h2 className="text-lg font-semibold">{categoryKey.toUpperCase()}</h2>
            {Object.entries(subcategories).map(([subcatKey, items]) => (
              <div key={subcatKey} className="my-2">
                <h3 className="text-base font-semibold">{subcatKey.replace(/_/g, ' ')}</h3>
                <ul className="list-disc pl-4">
                  {items.map(item => (
                    <li key={item.id} className="my-1">
                      <a href={item.url} className="text-blue-500 hover:underline">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
    );
}
 
export default AllCategory;