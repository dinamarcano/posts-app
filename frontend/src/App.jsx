import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "https://posts-app-pi-ivory.vercel.app";

  // traer posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("error al traer posts", error);
    }
  };

  // crear post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          title,
          description,
        }),
      });

      // limpiar form
      setImageUrl("");
      setTitle("");
      setDescription("");

      // refrescar lista
      fetchPosts();
    } catch (error) {
      console.log("error al crear post", error);
    }
  };

  // eliminar post
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
      });

      fetchPosts();
    } catch (error) {
      console.log("error al eliminar", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts App</h1>

      <h2>Crear Post</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit">Create Post</button>
      </form>

      <h2>Lista de Posts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <img src={post.imageUrl} alt={post.title} width="200" />
          <h3>{post.title}</h3>
          <p>{post.description}</p>

          <button onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;