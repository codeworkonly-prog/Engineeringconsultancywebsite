import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { storage } from "../../../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

type ItemType = {
  id: string;
  name: string;
  image?: string;
};

export default function Dashboard() {
  const [tab, setTab] = useState("project");
  const [data, setData] = useState<ItemType[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // LOAD DATA
  const loadData = async (type: string) => {
    const snapshot = await getDocs(collection(db, type));
    const list = snapshot.docs.map((doc) => {
      const d = doc.data() as { name: string; image?: string };
      return {
        id: doc.id,
        name: d.name,
        image: d.image || "",
      };
    });
    setData(list);
  };

  // LOAD WHEN TAB CHANGES
  useEffect(() => {
    loadData(tab);
  }, [tab]);

  // ADD ITEM WITH IMAGE
  const addItem = async () => {
    let imageUrl = "";

    if (file) {
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, tab), {
      name: input,
      image: imageUrl,
    });

    setInput("");
    setFile(null);
    loadData(tab);
  };

  // DELETE ITEM
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, tab, id));
    loadData(tab);
  };

  // UPDATE ITEM
  const updateItem = async () => {
    if (!editingId) return;

    let imageUrl = "";

    if (file) {
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    await updateDoc(doc(db, tab, editingId), {
      name: input,
      ...(imageUrl && { image: imageUrl }),
    });

    setEditingId(null);
    setInput("");
    setFile(null);
    loadData(tab);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* TABS */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setTab("project")}>📁 Projects</button>
        <button onClick={() => setTab("team_member")}>👥 Team</button>
        <button onClick={() => setTab("event")}>📅 Events</button>
        <button onClick={() => setTab("gallery")}>🖼 Gallery</button>
      </div>

      <h2 style={{ marginBottom: "10px" }}>{tab.toUpperCase()}</h2>

      {/* INPUT AREA */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter name"
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={editingId ? updateItem : addItem}
          style={{ marginLeft: "10px" }}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* CARDS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "8px",
            }}
          >
            <p>{item.name}</p>

            {item.image && (
              <img
                src={item.image}
                alt=""
                style={{ width: "100%", marginBottom: "10px" }}
              />
            )}

            <button
              onClick={() => {
                setInput(item.name);
                setEditingId(item.id);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteItem(item.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}