import { useEffect, useState } from "react";
import { api } from "./api";

type Item = {
  id: string;
  title: string;
  content?: string;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    const res = await api.get("/items");
    setItems(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    if (!title.trim()) return;

    await api.post("/items", { title, content });

    setTitle("");
    setContent("");
    load();
  }

  async function remove(id: string) {
    await api.delete(`/items/${id}`);
    load();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* FORM */}
        <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
          <input
            className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-black/10"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-black/10"
            placeholder="Описание"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={create}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition"
          >
            Добавить
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-left">
              <tr>
                <th className="p-3">Название</th>
                <th className="p-3">Описание</th>
                <th className="p-3 text-right">Действие</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-400">
                    Пусто
                  </td>
                </tr>
              ) : (
                items.map((i) => (
                  <tr
                    key={i.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-900">
                      {i.title}
                    </td>

                    <td className="p-3 text-gray-600">
                      {i.content || "—"}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => remove(i.id)}
                        className="text-red-500 hover:text-red-700 hover:underline"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}