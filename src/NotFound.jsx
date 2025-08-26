import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div
    style={{
      textAlign: "center",
      marginTop: "60px",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
      borderRadius: "18px",
      boxShadow: "0 4px 24px #2222",
      maxWidth: "420px",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "48px 24px",
    }}
  >
    <h1
      style={{
        fontSize: "5rem",
        color: "#e74c3c",
        margin: 0,
        textShadow: "0 2px 16px #e74c3c44, 0 0 2px #fff",
        fontWeight: 900,
        letterSpacing: "0.1em",
      }}
    >
      404
    </h1>
    <p
      style={{
        color: "#2539b9",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginBottom: "24px",
        marginTop: "12px",
        textShadow: "0 1px 8px #2539b922",
      }}
    >
      Página no encontrada
    </p>
    <Link
      to="/"
      style={{
        display: "inline-block",
        background: "linear-gradient(90deg, #3498db 60%, #2ecc71 100%)",
        color: "#fff",
        padding: "12px 32px",
        borderRadius: "8px",
        fontWeight: 700,
        fontSize: "1.1rem",
        textDecoration: "none",
        boxShadow: "0 2px 8px #2222",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      Volver al inicio
    </Link>
  </div>
);

export default NotFound;