import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

type State = "idle" | "loading";

export function useSearchAuctions() {
  const [state, setState] = useState<State>("idle");
  const [searchValue, setSearchValue] = useState("");
  const foundAuctions = api.auctions.searchByTitle.useQuery(searchValue, {
    enabled: searchValue.length > 0,
    refetchOnMount: false,
  });

  const debouncedRefetch = debounce(() => foundAuctions.refetch, 1500);

  useEffect(() => {
    setState("loading");

    const handle = async () => {
      try {
        await debouncedRefetch();
      } catch (error) {
        // console.error(error)
      }

      setState("idle");
    };

    if (searchValue.length > 0) {
      handle();
    }
  }, [debouncedRefetch, searchValue]);

  const isLoading =
    searchValue.length === 0 || !foundAuctions.data || state === "loading";

  return {
    isLoading,
    setValue: setSearchValue,
    results: foundAuctions.data || [],
  };
}
