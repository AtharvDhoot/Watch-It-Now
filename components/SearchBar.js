import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar({
  placeholder = "Search for movies or TV series",
  searchPath,
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length === 0) {
      return;
    } else {
      router.push(`${searchPath}${query.trim()}?page=1`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex grow place-items-center">
      <SearchIcon />
      <input
        className={`input w-full`}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </form>
  );
}
