import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export default async function RoomAdminPage() {
  const db = await getDb();
  const rooms = await db.collection("rooms").find({}).limit(50).toArray();

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Rooms</h1>
      <ul style={{ marginTop: 16, listStyle: "none", padding: 0 }}>
        {rooms.map((r) => (
          <li
            key={r._id.toString()}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <div style={{ fontWeight: 600 }}>{r.number ?? "(no number)"}</div>
            <div style={{ opacity: 0.7, fontSize: 14 }}>
              {r.type ?? ""} {r.price ? `• ${r.price}` : ""}{" "}
              {r.status ? `• ${r.status}` : ""}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
