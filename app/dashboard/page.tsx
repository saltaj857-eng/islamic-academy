"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
      setLoading(false);
    }

    loadUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="wrap section">
        <h1>Загрузка...</h1>
      </main>
    );
  }

  return (
    <main className="wrap section">
      <div style={{ marginBottom: 35 }}>
        <span className="badge">ЛИЧНЫЙ КАБИНЕТ</span>

        <h1 style={{ fontSize: 40, marginBottom: 10 }}>
          Кабинет студента
        </h1>

        <p className="muted">
          {email ? `Вы вошли как ${email}` : "Вы не авторизованы"}
        </p>
      </div>

      {!email ? (
        <div className="card">
          <h2>Войдите в аккаунт</h2>
          <p className="muted">
            Чтобы видеть свои курсы и прогресс обучения.
          </p>

          <Link className="btn" href="/auth">
            Войти
          </Link>
        </div>
      ) : (
        <>
          <div className="grid">
            <div className="card">
              <h2>Мои курсы</h2>
              <p className="muted">
                Курсы, на которые вы записались.
              </p>

              <Link className="btn" href="/courses">
                Выбрать курс
              </Link>
            </div>

            <div className="card">
              <h2>Мой прогресс</h2>
              <p className="muted">
                Здесь будет отображаться прогресс прохождения уроков.
              </p>

              <strong>0% завершено</strong>
            </div>

            <div className="card">
              <h2>Сертификаты</h2>
              <p className="muted">
                Сертификаты завершённых программ.
              </p>

              <strong>Пока нет</strong>
            </div>
          </div>

          <div className="card" style={{ marginTop: 25 }}>
            <h2>Аккаунт</h2>

            <p className="muted">
              Email: {email}
            </p>

            <button className="btn" onClick={logout}>
              Выйти
            </button>
          </div>
        </>
      )}
    </main>
  );
}
