import Link from "next/link";

const materials = [
  {
    type: "PDF",
    title: "Учебные книги",
    description: "Книги и учебные материалы академии.",
  },
  {
    type: "VIDEO",
    title: "Видео-уроки",
    description: "Лекции преподавателей академии.",
  },
  {
    type: "BOOK",
    title: "Электронная библиотека",
    description: "Классические и современные исламские труды.",
  },
];

export default function Library() {
  return (
    <main className="wrap section">
      <div style={{ textAlign: "center", marginBottom: 45 }}>
        <span className="badge">БИБЛИОТЕКА</span>

        <h1 style={{ fontSize: 42, margin: "15px 0 10px" }}>
          Учебная библиотека
        </h1>

        <p className="muted" style={{ fontSize: 18 }}>
          Все необходимые материалы для обучения в одном месте.
        </p>
      </div>

      <div className="grid">
        {materials.map((material) => (
          <div className="card" key={material.title}>
            <div
              style={{
                width: 55,
                height: 55,
                borderRadius: 14,
                background: "#e8efe9",
                color: "#123b2b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                marginBottom: 18,
              }}
            >
              {material.type}
            </div>

            <h2>{material.title}</h2>

            <p className="muted">{material.description}</p>

            <Link className="btn" href="/auth">
              Открыть библиотеку
            </Link>
          </div>
        ))}
      </div>

      <div
        className="card"
        style={{
          marginTop: 30,
          textAlign: "center",
          padding: 40,
        }}
      >
        <h2>Материалы для студентов</h2>

        <p className="muted">
          После подключения хранилища Supabase здесь появятся
          реальные PDF-файлы, книги и видео с разграничением доступа
          для студентов.
        </p>
      </div>
    </main>
  );
}
