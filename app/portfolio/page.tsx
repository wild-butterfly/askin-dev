"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Scroll reveal ─────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Types ─────────────────────────────────────────────── */
type Project = {
  id: string;
  name: string;
  category: string;
  filterTags: string[];
  stack: string[];
  desc: string;
  highlights: string[];
  href: string;
  live: boolean;
  gradient: string;
  accentColor: string;
  images: string[]; // real screenshot paths
  placeholderSlides?: number; // how many placeholder screens to show
};

/* ─── Data ──────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: "clevermode",
    name: "Clevermode",
    category: "SaaS Platform · Live",
    filterTags: ["React", "JavaScript"],
    stack: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "Firebase",
      "Stripe",
      "AWS",
    ],
    desc: "Production SaaS platform powering printer registration, customer accounts, and subscription billing for A1 Testing & Tagging — supporting 200+ active staff and customers.",
    highlights: [
      "Firebase Authentication with role-based access control for staff and customers",
      "Stripe payments and subscription management integrated end-to-end",
      "Deployed on AWS — EC2, S3, CloudFront, Route 53",
      "Mobile-first interfaces built for field technicians",
      "REST APIs built with Node.js and Express",
    ],
    href: "https://askin-workspace.vercel.app",
    live: true,
    gradient: "linear-gradient(135deg, #1e1040 0%, #3b1d8a 50%, #6d28d9 100%)",
    accentColor: "#a78bfa",
    images: [],
    placeholderSlides: 3,
  },
  {
    id: "flowody",
    name: "Flowody",
    category: "Workforce SaaS · In Development",
    filterTags: ["React", "TypeScript", "Next.js"],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Express",
    ],
    desc: "Full-stack SaaS platform for workforce scheduling and workflow management — designed to eliminate manual processes and give managers real-time visibility across their teams.",
    highlights: [
      "Complex scheduling engine handling shift conflicts and availability rules",
      "PostgreSQL with optimised queries for high-frequency reads",
      "Role-based dashboard views for managers, staff, and admins",
      "Real-time updates via WebSockets",
    ],
    href: "#",
    live: false,
    gradient: "linear-gradient(135deg, #1a1020 0%, #831843 50%, #db2777 100%)",
    accentColor: "#f472b6",
    images: [],
    placeholderSlides: 4,
  },
  {
    id: "portfolio",
    name: "This Portfolio",
    category: "Personal Site",
    filterTags: ["React", "TypeScript", "Next.js"],
    stack: ["Next.js 16", "TypeScript", "CSS", "Geist Font"],
    desc: "Hand-crafted portfolio with a sunset-purple theme, scroll-reveal animations powered by IntersectionObserver, and zero runtime dependencies beyond React.",
    highlights: [
      "Custom scroll-reveal system — no Framer Motion or GSAP",
      "Animated floating orbs + CSS grid overlay for the background",
      "Filterable project grid with modal detail view",
      "Deployed on Vercel with automatic CI/CD from GitHub",
    ],
    href: "https://askin-workspace.vercel.app",
    live: true,
    gradient: "linear-gradient(135deg, #1a1200 0%, #92400e 50%, #f97316 100%)",
    accentColor: "#fb923c",
    images: [],
    placeholderSlides: 2,
  },
];

/* Unique filter tags across all projects */
const ALL_FILTERS = [
  "All",
  ...Array.from(new Set(PROJECTS.flatMap((p) => p.filterTags))),
];

/* ─── Placeholder preview ───────────────────────────────── */
// Each slideIndex renders a different fake UI layout so the carousel feels real
function ProjectPlaceholder({
  gradient,
  accent,
  slideIndex = 0,
}: {
  gradient: string;
  accent: string;
  slideIndex?: number;
}) {
  const a = { background: accent, opacity: 0.75 };

  const layouts = [
    // 0 — Dashboard: sidebar + main content
    <div
      key="0"
      className="placeholder-ui"
      style={{ flexDirection: "row", gap: "0.75rem", padding: "1rem" }}
    >
      <div
        style={{
          width: "22%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div className="placeholder-bar short" style={a} />
        <div className="placeholder-bar full" />
        <div className="placeholder-bar full" />
        <div className="placeholder-bar full" />
        <div className="placeholder-bar medium" />
        <div className="placeholder-bar full" />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <div className="placeholder-nav">
          <div
            className="placeholder-bar medium"
            style={{ height: "6px", opacity: 0.4 }}
          />
          <div
            className="placeholder-bar short"
            style={{ marginLeft: "auto", height: "6px", ...a }}
          />
        </div>
        <div className="placeholder-row" style={{ height: "60px" }}>
          <div className="placeholder-block" />
          <div className="placeholder-block" />
          <div className="placeholder-block" />
        </div>
        <div className="placeholder-bar long" />
        <div className="placeholder-bar medium" />
        <div className="placeholder-row" style={{ flex: 1 }}>
          <div className="placeholder-block" />
          <div className="placeholder-block" style={{ maxWidth: "35%" }} />
        </div>
      </div>
    </div>,

    // 1 — Table / list view
    <div
      key="1"
      className="placeholder-ui"
      style={{ gap: "0.5rem", padding: "1.25rem" }}
    >
      <div className="placeholder-nav">
        <div
          className="placeholder-bar short"
          style={{ height: "6px", ...a }}
        />
        <div
          className="placeholder-bar short"
          style={{ marginLeft: "auto", height: "6px", opacity: 0.3 }}
        />
      </div>
      {[1, 0.9, 0.8, 0.7, 0.65, 0.6].map((op, i) => (
        <div
          key={i}
          className="placeholder-row"
          style={{ height: "28px", opacity: op }}
        >
          <div className="placeholder-block" style={{ maxWidth: "8%" }} />
          <div className="placeholder-block" style={{ maxWidth: "28%" }} />
          <div className="placeholder-block" />
          <div className="placeholder-block" style={{ maxWidth: "15%" }} />
          <div
            className="placeholder-block"
            style={{ maxWidth: "12%", background: accent, opacity: 0.4 }}
          />
        </div>
      ))}
    </div>,

    // 2 — Chart / analytics
    <div
      key="2"
      className="placeholder-ui"
      style={{ gap: "0.65rem", padding: "1.25rem" }}
    >
      <div className="placeholder-nav">
        <div
          className="placeholder-bar medium"
          style={{ height: "6px", opacity: 0.35 }}
        />
      </div>
      <div className="placeholder-row" style={{ height: "36px" }}>
        {["18%", "24%", "14%", "30%"].map((w, i) => (
          <div key={i} className="placeholder-block" style={{ maxWidth: w }} />
        ))}
      </div>
      {/* Bar chart */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: "6px",
          padding: "0.5rem 0",
        }}
      >
        {[55, 80, 45, 95, 60, 75, 40, 88, 65, 72].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: "4px 4px 0 0",
              background: i === 7 ? accent : "rgba(255,255,255,0.1)",
              opacity: i === 7 ? 0.85 : 0.6,
              transition: "height 0.3s",
            }}
          />
        ))}
      </div>
      <div className="placeholder-bar medium" />
    </div>,

    // 3 — Calendar / schedule grid
    <div
      key="3"
      className="placeholder-ui"
      style={{ gap: "0.5rem", padding: "1.1rem" }}
    >
      <div className="placeholder-nav">
        <div
          className="placeholder-bar short"
          style={{ height: "6px", ...a }}
        />
        <div
          className="placeholder-row"
          style={{ marginLeft: "auto", width: "30%", gap: "4px" }}
        >
          <div className="placeholder-block" style={{ height: "6px" }} />
          <div className="placeholder-block" style={{ height: "6px" }} />
        </div>
      </div>
      {/* Day headers */}
      <div className="placeholder-row" style={{ height: "18px", gap: "4px" }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="placeholder-block" style={{ opacity: 0.3 }} />
        ))}
      </div>
      {/* Grid rows */}
      {Array.from({ length: 4 }).map((_, row) => (
        <div
          key={row}
          className="placeholder-row"
          style={{ height: "32px", gap: "4px" }}
        >
          {Array.from({ length: 7 }).map((_, col) => (
            <div
              key={col}
              className="placeholder-block"
              style={{
                background:
                  (row === 1 && col === 2) || (row === 2 && col === 4)
                    ? accent
                    : undefined,
                opacity:
                  (row === 1 && col === 2) || (row === 2 && col === 4)
                    ? 0.55
                    : 0.15,
              }}
            />
          ))}
        </div>
      ))}
    </div>,
  ];

  return (
    <div className="project-card-placeholder" style={{ background: gradient }}>
      {layouts[slideIndex % layouts.length]}
    </div>
  );
}

/* ─── Modal ─────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const hasImages = project.images.length > 0;
  const slideCount = hasImages
    ? project.images.length
    : (project.placeholderSlides ?? 1);

  const prev = () => setSlide((s) => (s === 0 ? slideCount - 1 : s - 1));
  const next = () => setSlide((s) => (s === slideCount - 1 ? 0 : s + 1));

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-modal aria-label={project.name}>
        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Carousel */}
        <div className="modal-carousel">
          {hasImages ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.images[slide]}
              alt={`${project.name} screenshot ${slide + 1}`}
            />
          ) : (
            <div className="modal-carousel-slide">
              <ProjectPlaceholder
                gradient={project.gradient}
                accent={project.accentColor}
                slideIndex={slide}
              />
            </div>
          )}

          {slideCount > 1 && (
            <>
              <button
                className="carousel-btn prev"
                onClick={prev}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className="carousel-btn next"
                onClick={next}
                aria-label="Next"
              >
                ›
              </button>
              <div className="carousel-dots">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot${i === slide ? " active" : ""}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Body */}
        <div className="modal-body">
          <p className="modal-category">{project.category}</p>
          <h2 className="modal-title">{project.name}</h2>
          <p className="modal-desc">{project.desc}</p>

          {project.highlights.length > 0 && (
            <ul className="modal-highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}

          <div className="modal-tags">
            {project.stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="modal-actions">
            {project.live ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-site"
              >
                ↗ View Live Site
              </a>
            ) : (
              <span
                className="btn-view-site"
                style={{ opacity: 0.45, cursor: "default" }}
              >
                In Development
              </span>
            )}
            <button
              className="btn-ghost"
              onClick={onClose}
              style={{ fontSize: "0.88rem" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero eyebrow ──────────────────────────────────────── */
const EYEBROW_TAGS = ["builds-UI", "builds-APIs", "builds-systems"];

/* ─── Main page ─────────────────────────────────────────── */
export default function Portfolio() {
  useScrollReveal();

  // Hero eyebrow
  const [eyebrowIdx, setEyebrowIdx] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHover = () => {
    if (intervalRef.current) return;
    setEyebrowIdx(0);
    intervalRef.current = setInterval(() => {
      setEyebrowIdx((prev) =>
        prev === null || prev === EYEBROW_TAGS.length - 1 ? 0 : prev + 1,
      );
    }, 1400);
  };
  const endHover = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setEyebrowIdx(null);
  };

  const eyebrow =
    eyebrowIdx === null
      ? "< ASKINFEAR />"
      : `< ASKINFEAR ${EYEBROW_TAGS[eyebrowIdx]} />`;

  // Project filter
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterTags.includes(activeFilter));

  // Modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  // Filter counts
  const countFor = (f: string) =>
    f === "All"
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.filterTags.includes(f)).length;

  return (
    <>
      {/* ── BACKGROUND ──────────────────────────── */}
      <div className="site-bg" aria-hidden>
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-grid" />
      </div>

      {/* ── NAV ─────────────────────────────────── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          askin<em>.dev</em>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#stack">Stack</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact" className="nav-hire">
              Hire me
            </a>
          </li>
        </ul>
      </nav>

      <main>
        {/* ── HERO ────────────────────────────────── */}
        <section className="hero" id="hero">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for new projects
          </div>

          <span className="hero-role">
            Full-Stack Developer · Melbourne, AU
          </span>

          <div onMouseEnter={startHover} onMouseLeave={endHover}>
            <p className="hero-eyebrow">{eyebrow}</p>
          </div>

          <h1 className="hero-title">Aşkın Fear</h1>

          <p className="hero-sub">
            I build production-ready SaaS products — from billing systems and
            REST APIs to polished interfaces. End-to-end, start to ship.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn-primary">
              View Work →
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s Talk
            </a>
          </div>

          <div className="hero-social">
            <a
              href="https://github.com/wild-butterfly"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              GitHub
            </a>
            <span className="hero-social-dot" />
            <a
              href="https://www.linkedin.com/in/askin-fear/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              LinkedIn
            </a>
            <span className="hero-social-dot" />
            <span className="hero-social-text">Melbourne, AU</span>
          </div>

          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        <hr className="section-divider" />

        {/* ── WORK ─────────────────────────────────── */}
        <section className="section" id="work">
          <div className="work-header">
            <div className="work-title-block">
              <p data-reveal className="section-label">
                Work
              </p>
              <h2 data-reveal data-reveal-delay="100" className="section-title">
                Selected Projects
              </h2>
              <p
                data-reveal
                data-reveal-delay="150"
                className="section-subtitle"
              >
                Real products, shipped to production.
              </p>
            </div>

            <div
              data-reveal
              data-reveal-delay="200"
              className="filter-tabs"
              role="tablist"
            >
              {ALL_FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={activeFilter === f}
                  className={`filter-tab${activeFilter === f ? " active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                  <sup className="filter-count">{countFor(f)}</sup>
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid" data-reveal data-reveal-delay="200">
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className="project-card"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSelectedProject(project)
                }
                aria-label={`View ${project.name}`}
              >
                <div className="project-card-preview">
                  <ProjectPlaceholder
                    gradient={project.gradient}
                    accent={project.accentColor}
                  />
                </div>
                <div className="project-card-info">
                  <span className="project-card-name">{project.name}</span>
                  <span className="project-card-stack">
                    {project.stack.slice(0, 3).join(" / ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STACK ───────────────────────────────── */}
        <div className="stack-section" id="stack">
          <div className="stack-inner">
            <p data-reveal className="section-label">
              Stack
            </p>
            <h2 data-reveal data-reveal-delay="100" className="section-title">
              Tools I work with
            </h2>

            {/* Grouped skills */}
            {[
              {
                label: "Frontend",
                skills: [
                  "React",
                  "TypeScript",
                  "Next.js",
                  "JavaScript (ES6+)",
                  "Tailwind CSS",
                  "HTML5 / CSS3",
                ],
              },
              {
                label: "Backend",
                skills: [
                  "Node.js",
                  "Express",
                  "REST APIs",
                  "Firebase",
                  "Auth & RBAC",
                ],
              },
              {
                label: "Data",
                skills: [
                  "PostgreSQL",
                  "MongoDB",
                  "MySQL",
                  "Firebase Firestore",
                ],
              },
              {
                label: "Cloud & DevOps",
                skills: [
                  "AWS (EC2, S3, CloudFront)",
                  "Vercel",
                  "Docker",
                  "CI/CD",
                  "Linux",
                ],
              },
              {
                label: "Tools",
                skills: [
                  "Git / GitHub",
                  "Stripe",
                  "Figma",
                  "Postman",
                  "VS Code",
                ],
              },
            ].map((group, gi) => (
              <div
                key={group.label}
                style={{ marginTop: gi === 0 ? "3rem" : "2rem" }}
              >
                <p
                  data-reveal
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {group.label}
                </p>
                <div
                  className="skills-grid"
                  data-reveal
                  data-reveal-delay="100"
                >
                  {group.skills.map((s) => (
                    <div key={s} className="skill-chip">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT ───────────────────────────────── */}
        <section className="section" id="about">
          <div className="about-grid">
            <div className="about-left">
              <p data-reveal className="section-label">
                About
              </p>
              <h2 data-reveal data-reveal-delay="100" className="section-title">
                A bit about me
              </h2>
              <p data-reveal data-reveal-delay="150" className="about-tagline">
                Full-stack developer based in Melbourne — I came to software
                through mechanical engineering and never looked back.
              </p>
            </div>

            <div className="about-right">
              <p data-reveal className="about-bio">
                I transitioned from engineering into software through formal IT
                study, and I bring that systems mindset to every build: reliable
                architecture, clean execution, and maintainable code.
              </p>
              <p data-reveal data-reveal-delay="50" className="about-bio">
                I’m currently shipping Clevermode in production and building
                Flowody, a work management SaaS, with end-to-end ownership from
                implementation to usability and performance.
              </p>

              <div
                data-reveal
                data-reveal-delay="100"
                className="about-credentials"
              >
                {[
                  {
                    role: "Full-Stack Developer",
                    place: "A1 Testing & Tagging",
                    year: "2025 –",
                  },
                  {
                    role: "Diploma of IT, Web Dev",
                    place: "Laneway Education",
                    year: "2024–2026",
                  },
                  {
                    role: "B.Eng Mechanical",
                    place: "Süleyman Demirel Uni.",
                    year: "2016–2020",
                  },
                ].map((c) => (
                  <div key={c.role} className="credential-row">
                    <div className="credential-main">
                      <span className="credential-role">{c.role}</span>
                      <span className="credential-place">{c.place}</span>
                    </div>
                    <span className="credential-year">{c.year}</span>
                  </div>
                ))}
              </div>

              <a
                data-reveal
                data-reveal-delay="150"
                href="https://www.linkedin.com/in/askin-fear/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-resume-link"
              >
                Full profile on LinkedIn ↗
              </a>
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────── */}
        <section id="contact">
          <div className="contact-section">
            <p data-reveal className="section-label">
              Contact
            </p>
            <h2 data-reveal data-reveal-delay="100" className="contact-title">
              Let&apos;s build something.
            </h2>
            <p data-reveal data-reveal-delay="150" className="contact-sub">
              Have a project in mind or want to discuss an opportunity? I&apos;m
              open to freelance contracts, full-time roles, and interesting
              conversations.
            </p>
            <div data-reveal data-reveal-delay="200" className="hero-actions">
              <a href="mailto:askinfear@hotmail.com" className="btn-primary">
                askinfear@hotmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/askin-fear/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer>
        <div className="footer">
          <span>© {new Date().getFullYear()} Aşkın Fear</span>
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/wild-butterfly"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/askin-fear/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* ── MODAL ───────────────────────────────── */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </>
  );
}
