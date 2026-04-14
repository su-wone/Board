import BacklogTemplate from "@/components/templates/BacklogTemplate";
import { getCards, getSprints } from "@/lib/api";

export default async function Home() {
  const [sprints, cards] = await Promise.all([getSprints(), getCards()]);
  return <BacklogTemplate sprints={sprints} cards={cards} />;
}
