import type { Metadata } from "next";
import { site } from "@/config/site";
import { RoomFlow } from "@/components/room-flow";

export const metadata: Metadata = {
  title: "How much room?",
  description: site.room.lede,
};

export default function RoomPage() {
  return <RoomFlow />;
}
