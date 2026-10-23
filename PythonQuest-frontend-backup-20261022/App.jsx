import './App.css'

const navItems = ['Courses', 'Programs', 'Challenges', 'Pricing']

const stats = [
  { value: '12k+', label: 'active learners' },
  { value: '92%', label: 'completion rate' },
  { value: '4.9/5', label: 'average rating' },
]

const featureCards = [
  {
    title: 'Personalized learning paths',
    text: 'Adaptive lessons and practice tracks that match your current skill level.',
    icon: '✦',
  },
  {
    title: 'Project-based coding',
    text: 'Build real apps and scripts while you learn Python from the ground up.',
    icon: '▣',
  },
  {
    title: 'Live feedback + community',
    text: 'Get expert hints, code review, and support from a motivating learning community.',
    icon: '◎',
  },
]

const learningPaths = [
  {
    badge: 'Beginner',
    title: 'Python Foundations',
    detail: 'Syntax, variables, loops, functions, and problem solving for first-time coders.',
    accent: 'sky',
  },
  {
    badge: 'Popular',
    title: 'Data & Automation',
    detail: 'Learn data handling, APIs, automation, and Python workflows for daily tasks.',
    accent: 'violet',
  },
  {
    badge: 'Advanced',
    title: 'AI + Problem Solving',
    detail: 'Go beyond basics with algorithms, data structures, and strategic coding practice.',
    accent: 'gold',
  },
]

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">P</div>
          <span className="brand-text">PythonQuest</span>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a href="#" key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="ghost-button" type="button">
            Log in
          </button>
          <button className="primary-button" type="button">
            Start learning
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Learn Python with confidence</span>
            <h1>Turn curiosity into code with guided Python mastery.</h1>
            <p>
              PythonQuest helps students, career switchers, and teams build practical
              programming skills through structured lessons, challenges, and portfolio-ready projects.
            </p>

            <div className="cta-row">
              <button className="primary-button large" type="button">
                Enroll now
              </button>
              <button className="secondary-button" type="button">
                View roadmap
              </button>
            </div>

            <div className="mini-proof">
              <div className="avatar-stack" aria-label="Student avatars">
                <span>J</span>
                <span>M</span>
                <span>A</span>
              </div>
              <p>
                Trusted by <strong>5,000+</strong> learners worldwide
              </p>
            </div>
          </div>

          <div className="hero-visual" aria-label="Learning dashboard preview">
            <div className="dashboard-card main-panel">
              <div className="panel-header">
                <span className="dot green" />
                <span className="dot yellow" />
                <span className="dot red" />
              </div>

              <div className="lesson-box">
                <div className="lesson-label">Current lesson</div>
                <h3>Mastering loops & functions</h3>
                <div className="progress">
                  <span style={{ width: '72%' }} />
                </div>
                <div className="progress-meta">
                  <span>72% complete</span>
                  <span>Next: practice set</span>
                </div>
              </div>

              <div className="mini-panels">
                <div className="metric-panel">
                  <small>Streak</small>
                  <strong>18 days</strong>
                </div>
                <div className="metric-panel accent">
                  <small>XP</small>
                  <strong>2,840</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section" aria-label="Key platform statistics">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="features-section">
          <div className="section-heading">
            <span className="eyebrow">Why students choose PythonQuest</span>
            <h2>Built for momentum, mastery, and real-world results.</h2>
          </div>

          <div className="feature-grid">
            {featureCards.map((card) => (
              <article className="feature-card" key={card.title}>
                <div className="feature-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="paths-section">
          <div className="section-heading">
            <span className="eyebrow">Learning tracks</span>
            <h2>Choose your next challenge.</h2>
          </div>

          <div className="paths-grid">
            {learningPaths.map((path) => (
              <article className={`path-card ${path.accent}`} key={path.title}>
                <span className="path-badge">{path.badge}</span>
                <h3>{path.title}</h3>
                <p>{path.detail}</p>
                <a href="#">Explore track →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-copy">
            <span className="eyebrow">Ready to begin?</span>
            <h2>Start your Python journey with a roadmap built for progress.</h2>
          </div>
          <button className="primary-button large" type="button">
            Join the academy
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
