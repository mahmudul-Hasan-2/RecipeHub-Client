const TopChefsSection = () => {
  const chefs = [
    {
      id: 1,
      name: "Mahmudul Hasan",
      recipes: 24,
      followers: "1.2k",
      avatar: "https://avatars.githubusercontent.com/u/252607863?v=4",
    },
    {
      id: 2,
      name: "Anika Rahman",
      recipes: 18,
      followers: "950",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOinjocFm3XkhD3rIQd5VpqkXPqf-n3keNyTodHqo3Qh4gzux9L5TsPIs&s=10",
    },
    {
      id: 3,
      name: "Zayan Ahmed",
      recipes: 15,
      followers: "820",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXIA1GDcZYgDvOoJ8Q8iTx3H_s6XBcK_UYrCcgkonZPXsiGcBTDOM4Ow&s=10",
    },
  ];

  return (
    <section className="py-16 bg-transparent my-6 px-6">
      <div className="container mx-auto">
        <div className="mb-12 text-left pl-1">
          <h2 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
            Top Creators
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500 font-normal text-base">
            The masterminds behind the most loved recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 p-6 rounded-[2rem] flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-100 dark:border-zinc-700/50 group-hover:scale-105 transition-all duration-300">
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-lg tracking-tight truncate group-hover:text-orange-500 transition-colors">
                  {chef.name}
                </h3>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">
                  {chef.recipes} Recipes
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span className="text-xs text-zinc-400 font-semibold">
                    {chef.followers} Followers
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopChefsSection;
