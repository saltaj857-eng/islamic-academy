import Link from "next/link";

const courses = [
  {
    arabic: "العقيدة",
    title: "Акыда",
    description: "Изучение основ исламского вероубеждения.",
    level: "Начальный уровень",
    lessons: 24,
  },
  {
    arabic: "الفقه",
    title: "Фикх",
    description: "Систематическое изучение исламского права.",
    level: "Начальный уровень",
    lessons: 32,
  },
  {
    arabic: "الحديث",
    title: "Хадис",
    description: "Изучение хадисов, их смысла и пользы.",
    level: "Начальный уровень",
    lessons: 28,
  },
  {
    arabic: "النحو",
    title: "Арабский язык",
    description: "Грамматика и правильное понимание арабского текста.",
    level: "Средний уровень",
    lessons: 36,
  },
  {
    arabic: "التفسير",
    title: "Тафсир",
    description: "Основы понимания и изучения Корана.",
    level: "Средний уровень",
    lessons: 30,
  },
  {
    arabic: "علوم القرآن",
    title: "Коранические науки",
    description: "Основные дисциплины, связанные с изучением Корана.",
    level: "Продвинутый",
    lessons: 22,
  },
];

export default function Courses() {
  return (
    <main className="wrap section">
      <div style={{ textAlign: "center", marginBottom: 45 }}>
        <span className="badge">ОБРАЗОВАНИЕ</span>
        <h1 style={{ fontSize: 42, margin: "15px 0 10px" }}>
          Программы обучения
        </h1>
        <p className="muted" style={{ fontSize: 18 }}>
          Выберите направление и начните систематическое обучение.
        </p>
      </div>

      <div className="grid">
        {courses.map((course) => (
          <article className="card" key={course.title}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#123b2b",
                marginBottom: 12,
              }}
            >
              {course.arabic}
            </div>

            <h2 style={{ marginBottom: 10 }}>{course.title}</h2>

            <p className="muted">{course.description}</p>

            <div style={{ margin: "20px 0", fontSize: 14 }}>
              <div>{course.level}</div>
              <div className="muted">{course.lessons} уроков</div>
            </div>

            <Link className="btn" href="/auth">
              Начать обучение
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
