"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number }),
    });

    const data = await response.json();
    setMessage(data.success ? "Submitted successfully!" : `Error: ${data.error}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Submit
        </button>
        <p className="mt-2">{message}</p>
      </form>
    </div>
  );
}
