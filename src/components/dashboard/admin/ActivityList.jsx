export default function ActivityList() {
  const activities = [
    { name: "New Recipe Uploads", count: 120, progress: "80%" },
    { name: "Reported Items", count: 12, progress: "20%" },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="font-bold mb-4">Recent Platform Stats</h3>
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-xs mb-1">
              <span>{item.name}</span>
              <span className="font-bold">{item.count}</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: item.progress }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
