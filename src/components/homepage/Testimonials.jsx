const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Zayan Ahmed",
      role: "Food Blogger",
      review:
        "This platform changed how I share my kitchen experiments. The clean UI makes browsing recipes an absolute joy!",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXIA1GDcZYgDvOoJ8Q8iTx3H_s6XBcK_UYrCcgkonZPXsiGcBTDOM4Ow&s=10",
    },
    {
      name: "Sadia Islam",
      role: "Home Chef",
      review:
        "Finding traditional Bangladeshi recipes with proper prep-times used to be hard. Not anymore! Kudos to RecipeHub.",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQRjXpNReeRR2DkWFwxs7IVB9YwWQfUYb3icwq7a8bA&s",
    },
  ];

  return (
    <section className="py-16 bg-zinc-50/60 dark:bg-zinc-900/40 rounded-[3rem] my-10 px-8 container mx-auto">
      <div className="text-center max-w-lg mx-auto mb-12">
        <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">
          Loved by Foodies
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Here is what our passionate cooking community has to say about us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 rounded-3xl shadow-sm relative"
          >
            <span className="absolute top-4 right-6 text-4xl text-orange-200/50 dark:text-zinc-800 font-serif">
              “
            </span>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed italic z-10 relative">
              "{rev.review}"
            </p>
            <div className="flex items-center gap-3 mt-6 border-t border-zinc-50 dark:border-zinc-800/50 pt-4">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full bg-zinc-100"
              />
              <div>
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                  {rev.name}
                </h4>
                <p className="text-[11px] text-zinc-400 font-medium">
                  {rev.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
