"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      setMessage(
        error
          ? error.message
          : "Регистрация выполнена. Проверьте электронную почту."
      );
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setMessage(error ? error.message : "Вход выполнен.");
    }

    setLoading(false);
  }

  return (
    <main className="wrap section">
      <div
        className="card"
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: 35,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <span className="badge">
            {mode === "login" ? "ЛИЧНЫЙ КАБИНЕТ" : "НОВЫЙ СТУДЕНТ"}
          </span>

          <h1 style={{ fontSize: 34, marginBottom: 10 }}>
            {mode === "login" ? "Вход" : "Регистрация"}
          </h1>

          <p className="muted">
            {mode === "login"
              ? "Войдите в свой аккаунт академии."
              : "Создайте аккаунт и начните обучение."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label>Имя</label>
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />

          <label>Пароль</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Минимум 6 символов"
            minLength={6}
            required
          />

          <button
            className="btn"
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: 10 }}
          >
            {loading
              ? "Загрузка..."
              : mode === "login"
              ? "Войти"
              : "Создать аккаунт"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 20,
              padding: 12,
              background: "#f1f4f1",
              borderRadius: 10,
            }}
          >
            {message}
          </p>
        )}

        <div style={{ textAlign: "center", marginTop: 25 }}>
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setMessage("");
            }}
            style={{
              border: 0,
              background: "none",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {mode === "login"
              ? "Создать новый аккаунт"
              : "У меня уже есть аккаунт"}
          </button>
        </div>
      </div>
    </main>
  );
}
