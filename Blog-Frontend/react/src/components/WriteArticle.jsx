import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function WriteArticle() {
	const currentUser = JSON.parse(localStorage.getItem("user") || "null");
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const submitArticle = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");

		console.log("Current user:", currentUser);

		if (!currentUser?._id) {
			const errorMessage = "User ID not found. Please refresh and login again.";
			setError(errorMessage);
			toast.error(errorMessage);
			return;
		}

		if (currentUser?.role !== "AUTHOR") {
			const errorMessage = "Only authors can publish articles. Please login as an author.";
			setError(errorMessage);
			toast.error(errorMessage);
			return;
		}

		if (!title || !category || !content) {
			const errorMessage = "Please fill in all fields.";
			setError(errorMessage);
			toast.error(errorMessage);
			return;
		}

		try {
			setLoading(true);
			const articleData = {
				author: currentUser._id,
				title,
				category,
				content,
			};
			console.log("Submitting article:", articleData);

			const res = await axios.post(
				"http://localhost:4000/author-api/article",
				articleData,
				{ withCredentials: true }
			);

			console.log("Article response:", res.data);
			setMessage("Article published successfully!");
			toast.success("Article published successfully");
			setTitle("");
			setCategory("");
			setContent("");
		} catch (err) {
			console.error("Article error:", err);
			const errorMessage = err.response?.data?.message || err.message || "Failed to publish article.";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-wrap">
			<div className="auth-card wide-card">
				<h2>Write Article</h2>

				<form onSubmit={submitArticle}>
					<div className="field">
						<label>Title</label>
						<input
							type="text"
							placeholder="Enter article title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>

					<div className="field">
						<label>Category</label>
						<input
							type="text"
							placeholder="Enter category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
						/>
					</div>

					<div className="field">
						<label>Content</label>
						<textarea
							rows="8"
							placeholder="Write your article content here..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
						/>
					</div>

					{error ? <p className="error">{error}</p> : null}
					{message ? <p className="success">{message}</p> : null}

					<button className="btn-primary" type="submit" disabled={loading}>
						{loading ? "Publishing..." : "Publish Article"}
					</button>
				</form>
			</div>
		</div>
	);
}
