"use client";

import { useEffect, useState } from "react";

export type AppRecord = {
  id: string;
  fields: {
    slack_id?: string;
    first_name?: string;
    last_name?: string;
    preferred_name?: string;
    pronouns?: string;
    host_city?: string;
    state_province?: string;
    country?: string;
    comfortable_with_poc?: boolean;
    attended_or_organized_hackathon?: boolean;
    status?: string;
    [key: string]: unknown;
  };
};

export default function AdminDashboard() {
  const [allApps, setAllApps] = useState<AppRecord[]>([]);
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState<"name" | "city">("name");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/get-all-apps")
      .then((r) => r.json())
      .then(({ records }) => setAllApps(records ?? []));
  }, []);

  const filtered = allApps.filter((app) => {
    const f = app.fields;
    const name = `${f.preferred_name ?? f.first_name ?? ""} ${f.last_name ?? ""}`.toLowerCase();
    const city = `${f.host_city ?? ""} ${f.state_province ?? ""} ${f.country ?? ""}`.toLowerCase();
    const haystack = searchMode === "city" ? city : name;
    const matchesSearch = !search || haystack.includes(search.toLowerCase());
    const status = f.status ?? "Pending";
    const matchesFilter = filter === "All" || status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#fdf6e3] outfit p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button className="text-blue-dark font-bold galindo text-sm flex items-center gap-1">
          ← Back
        </button>
        <div className="flex gap-2">
          <button className="border border-blue-dark text-blue-dark text-xs font-semibold px-3 py-1 rounded-full">
            Org Review
          </button>
          <button className="border border-blue-dark text-blue-dark text-xs font-semibold px-3 py-1 rounded-full">
            Map
          </button>
        </div>
      </div>

      <h1 className="galindo text-blue-dark text-lg mb-4">admin portal</h1>

      {/* Search */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder={searchMode === "city" ? "Search by city..." : "Search by name..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-blue-dark rounded-full px-4 py-2 text-sm bg-white outline-none"
        />
        <button
          onClick={() => { setSearchMode(searchMode === "name" ? "city" : "name"); setSearch(""); }}
          className="text-xs font-semibold px-4 py-1 rounded-full border border-blue-dark text-blue-dark bg-white whitespace-nowrap"
        >
          {searchMode === "name" ? "by city" : "by name"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["All", "Pending", "Approved", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-4 py-1 rounded-full border transition-colors ${
              filter === f
                ? "bg-blue-dark text-white border-blue-dark"
                : "border-blue-dark text-blue-dark bg-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((app) => {
          const f = app.fields;
          const status = f.status ?? "Pending";
          const displayName = f.preferred_name ?? f.first_name ?? "—";
          const location = [f.host_city, f.state_province, f.country]
            .filter(Boolean)
            .join(", ");

          const borderColor =
            status === "Approved"
              ? "border-green-400 bg-green-50"
              : status === "Rejected"
              ? "border-red-400 bg-red-50"
              : "border-blue-dark bg-white";

          return (
            <div
              key={app.id}
              className={`rounded-2xl border-2 p-4 shadow-sm flex flex-col gap-1 ${borderColor}`}
            >
              <p className="galindo text-blue-dark text-base font-bold leading-tight">
                {displayName} {f.last_name ?? ""}
              </p>
              <p className="text-xs text-pink-dark font-semibold">
                {f.slack_id ? `@${f.slack_id}` : "no slack"}
              </p>
              <p className="text-xs text-blue-bright">{f.pronouns ?? "—"}</p>
              <p className="text-xs text-blue-dark">{location || "—"}</p>
              <p className="text-xs text-blue-dark">
                organizing:{" "}
                {f.attended_or_organized_hackathon ? "yes" : "no"}
              </p>
              <p className="text-xs text-blue-dark">
                poc: {f.comfortable_with_poc ? "yes" : "no"}
              </p>
              <span
                className={`mt-2 self-start text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  status === "Approved"
                    ? "bg-green-200 text-green-800"
                    : status === "Rejected"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-light text-orange-dark"
                }`}
              >
                {status}
              </span>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-3 text-center text-blue-dark text-sm mt-10">
            No applications found.
          </p>
        )}
      </div>
    </div>
  );
}
