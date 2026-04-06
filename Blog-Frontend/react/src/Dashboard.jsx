import React from "react";

function Dashboard({ article }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-3xl text-blue-400 mt-2 mb-2 ml-2 mr-2">
        <h5 className="card-title text-3xl text-blue-400">{article.title}</h5>
        <p className="card-text text-blue-400">{article.description}</p>
        <p className="text-muted">Author: {article.author}</p>
      </div>
    </div>
  );
}

export default Dashboard;