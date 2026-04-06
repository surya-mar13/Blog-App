import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RootLayout from "./components/RootLayout";
import UserProfile from "./UserProfile";
import AuthorProfile from "./components/AuthorProfile";
import AdminProfile from "./components/AdminProfile";
import Articles from "./components/Articles";
import WriteArticle from "./components/WriteArticle";
import AuthorArticles from "./components/AuthorArticles";
import UsersList from "./components/UsersList";
import AuthorsList from "./components/AuthorsList";
import ArticleById from "./components/ArticleById";
import EditArticle from "./components/EditArticle";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/user-profile" element={<UserProfile />}>
            <Route index element={<Articles />} />
            <Route path="articles" element={<Articles />} />
          </Route>

          <Route path="/author-profile" element={<AuthorProfile />}>
            <Route index element={<AuthorArticles />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="author-articles" element={<AuthorArticles />} />
          </Route>

          <Route path="/admin-profile" element={<AdminProfile />}>
            <Route index element={<UsersList />} />
            <Route path="users-list" element={<UsersList />} />
            <Route path="authors-list" element={<AuthorsList />} />
          </Route>

          <Route path="/article/:articleId" element={<ArticleById />} />
          <Route path="/author-profile/edit-article/:articleId" element={<EditArticle />} />

          <Route path="/author-dashboard" element={<Navigate to="/author-profile" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;