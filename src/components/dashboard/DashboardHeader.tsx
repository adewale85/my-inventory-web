export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-1">
          Monitor your inventory overview and recent activity.
        </p>
      </div>
    </div>
  );
}