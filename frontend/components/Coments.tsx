"use client";
import { useEffect, useState } from "react";

interface Coment {
  id: number;
  user: string;
  text: string;
}

interface ComentsProps {
  postId: string;
}

export default function Coments({ postId }: ComentsProps) {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<string>("");
  const [coments, setComents] = useState<Coment[]>([]);
  const [comentInput, setComentInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {

    const loggedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (loggedUser) {
      setIsLogged(!!token);
      setUser(loggedUser);
    }
    const saved = localStorage.getItem(`coments-${postId}`);
    setComents(saved ? JSON.parse(saved) : []);
  }, [postId]);

  const handleAddComent = () => {
    if (!comentInput.trim() || !isLogged) return;
    const newComent: Coment = {
      id: Date.now(),
      user,
      text: comentInput,
    };
    const newComments = [...coments, newComent];
    setComents(newComments);
    localStorage.setItem(`coments-${postId}`, JSON.stringify(newComments));
    setComentInput("");
  };

  const handleDelete = (id: number) => {
    const filtered = coments.filter((c) => c.id !== id);
    setComents(filtered);
    localStorage.setItem(`coments-${postId}`, JSON.stringify(filtered));
  };

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    const updated = coments.map((c) =>
      c.id === id ? { ...c, text: editText } : c
    );
    setComents(updated);
    localStorage.setItem(`coments-${postId}`, JSON.stringify(updated));
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 bg-black rounded text-white uppercase px-5 py-3">
        Comentários
      </h2>
      {isLogged ? (
        <div className="flex flex-col gap-4">
          <textarea
            value={comentInput}
            onChange={(e) => setComentInput(e.target.value)}
            rows={4}
            className="border rounded-lg p-2 w-full bg-neutral-300"
            placeholder="Deixe seu comentário..."
          />
          <button
            onClick={handleAddComent}
            className="bg-black text-white rounded px-5 py-2 font-semibold w-fit hover:bg-neutral-700 uppercase"
          >
            Enviar comentário
          </button>
        </div>
      ) : (
        <div className="text-gray-500 mb-4">Faça login para comentar !</div>
      )}
      <div className="mt-6 flex flex-col gap-2">
        {coments.length === 0 ? (
          <span className="text-gray-500">Nenhum comentário ainda..</span>
        ) : (
          coments.map((c) => (
            <div
              key={c.id}
              className="bg-gray-100 rounded p-2 text-gray-800 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">{c.user}</span>
                {isLogged && c.user === user && (
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 text-xs hover:underline"
                      onClick={() => handleEdit(c.id, c.text)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 text-xs hover:underline"
                      onClick={() => handleDelete(c.id)}
                    >
                      Deletar
                    </button>
                  </div>
                )}
              </div>
              {editId === c.id ? (
                <div className="flex flex-col gap-2 mt-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    className="border rounded-lg p-2 w-full"
                  />
                  <button
                    className="bg-green-600 text-white rounded px-2 py-1 text-xs font-semibold w-fit hover:bg-green-700"
                    onClick={() => handleSaveEdit(c.id)}
                  >
                    Salvar
                  </button>
                  <button
                    className="bg-gray-400 text-white rounded px-2 py-1 text-xs font-semibold w-fit hover:bg-gray-500"
                    onClick={() => {
                      setEditId(null);
                      setEditText("");
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="mt-2 text-sm">{c.text}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
