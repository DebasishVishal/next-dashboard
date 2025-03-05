import Link from "next/link";
import MetricCard from "./MetricCards";
import FollowingList from "./FollowingList";

export default async function FollowingDashboard() {
  return (
    <div className="container mx-auto max-w-[1210px] mt-2">
      <h1 className="text-2xl font-semibold mb-4">My Following List</h1>

      {/* Div for Apps, Categories and Keywords content */}
      <FollowingList />

      {/* Div for Total Apps, Total Categories, Total Keywords */}
      <MetricCard />
    </div>
  );
}
