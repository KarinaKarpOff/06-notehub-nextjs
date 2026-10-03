import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesPage from "@/components/NotesPage/NotesPage";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage />
    </HydrationBoundary>
  );
}
