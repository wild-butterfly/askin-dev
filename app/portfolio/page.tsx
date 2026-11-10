"use client";

import { projectGalleries } from "../data/project-galleries";
import { skillGroups } from "../data/skills";
import Image from "next/image";
import Link from "next/link";
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
type ProjectSlide = {
  sectionTitle: string;
  title: string;
  desc: string;
  bullets: string[];
  imageAlt?: string;
  imageNote?: string;
  label?: string;
};

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
  slides?: ProjectSlide[]; // per-slide content (matches images array)
  featured: boolean;
  github?: string;
};

/* ─── Data ──────────────────────────────────────────────── */
function projectGallery(id: keyof typeof projectGalleries): Pick<Project, "images" | "slides"> {
  const items = projectGalleries[id];
  return {
    images: items.map((item) => `/projects/${item.file}`),
    slides: items.map((item, index) => ({ ...item, sectionTitle: `${String(index + 1).padStart(2, "0")} · ${item.label}` })),
  };
}

const PROJECTS: Project[] = [
  {
    id: "flowody",
    name: "Flowody",
    category: "Job Management · Web Platform",
    filterTags: ["React", "TypeScript"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Express"],
    desc: "Job management for service businesses, from the first booking request and quote to field work, job costs, invoicing and payment.",
    highlights: [
      "Shared calendar for job scheduling and team assignments",
      "Customer records, quotes and invoices connected to each job",
      "Combined invoicing, payment receipts and branded documents",
      "Customer email templates, sender options and renewal reminders",
      "Shared backend connecting the web platform and field app",
    ],
    href: "https://flowody.com",
    live: true,
    gradient: "linear-gradient(135deg, #1a1020 0%, #831843 50%, #db2777 100%)",
    accentColor: "#f472b6",
    ...projectGallery("flowody"),
    featured: true,
  },
  {
    id: "clevermode",
    name: "Clevermode",
    category: "SaaS Platform · Live",
    filterTags: ["Next.js", "JavaScript"],
    stack: [
      "Next.js",
      "JavaScript",
      "Node.js",
      "Express",
      "Firebase",
      "Stripe",
      "AWS",
    ],
    desc: "A Flowody Software product for testing and tagging, with a website, printer registration, customer accounts, subscription billing and reporting tools.",
    highlights: [
      "Firebase Authentication with role-based access control for staff and customers",
      "Stripe payments and subscription management integrated end-to-end",
      "Deployed on AWS — EC2, S3, CloudFront, Route 53",
      "Mobile-first interfaces built for field technicians",
      "REST APIs built with Node.js and Express",
    ],
    href: "https://clevermode.com.au",
    live: true,
    gradient: "linear-gradient(135deg, #1e1040 0%, #3b1d8a 50%, #6d28d9 100%)",
    accentColor: "#a78bfa",
    images: ["/clevermode.png", "/cleverlogin.png", "/cleverconvert.png", "/clevermodeAWS.png"],
    slides: [
      {
        sectionTitle: "1. Main Platform",
        title: "Clevermode Dashboard",
        desc: "Clevermode is a production SaaS platform built with Next.js to support Clevermode printer customers. The main page gives users access to the platform workflow, account tools, and printer-related actions from a single interface.",
        bullets: [
          "Next.js frontend for the customer platform",
          "Central dashboard for printer users",
          "Connected to Node.js and Express APIs",
          "Firebase-backed data and authentication flow",
          "SEO metadata updates and roadmap planning",
        ],
      },
      {
        sectionTitle: "2. Login, Registration & Membership",
        title: "Customer Onboarding and Billing",
        desc: "This page handles customer login and onboarding. Customers register their printer to start their membership, pay through Stripe, and access the Clevermode platform. Clevermode also includes an admin panel used to manage Firebase data and customer records.",
        bullets: [
          "Customer login and account access",
          "Printer registration during signup",
          "Stripe payment flow for membership",
          "Admin panel for managing Firebase",
        ],
      },
      {
        sectionTitle: "3. Image Conversion",
        title: "Convert Images to Printer-Ready PCX",
        desc: "The convert page allows users to upload artwork and convert image files to PCX format, which Clevermode printers support. This makes it easier for customers to prepare compatible files before sending them to print.",
        bullets: [
          "Uploads image files for conversion",
          "Converts assets into PCX format",
          "Prepared specifically for Clevermode printers",
        ],
      },
      {
        sectionTitle: "4. Infrastructure & Deployment",
        title: "Hosted on AWS — Production-Grade Infrastructure",
        desc: "Clevermode is deployed on AWS using a production-grade infrastructure stack. The architecture is designed for reliability, security, and scalability — ensuring the platform remains available and performant for all active customers.",
        bullets: [
          "EC2 — application server hosting",
          "Elastic Beanstalk — managed app deployment and scaling",
          "S3 — static asset and file storage",
          "CloudFront — global CDN for fast content delivery",
          "Route 53 — DNS management and domain routing",
          "VPC — isolated network with security group controls",
          "AWS Certificate Manager — SSL/TLS certificate provisioning",
        ],
      },
    ],
    featured: true,
  },

  {
    id: "flowody-mobile",
    name: "Flowody Mobile",
    category: "Field Team App · iOS & Android",
    filterTags: ["React Native", "TypeScript"],
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
    desc: "The iOS and Android field app connects bookings, attendance, site paperwork, timesheets and crew updates to the office. Owners and admins can also schedule work and prepare quotes.",
    highlights: ["Assigned jobs and job information on a phone", "Check-in and check-out workflows", "Labour records and timesheets", "Shared Flowody account and job data"],
    href: "https://flowody.com",
    live: true,
    gradient: "linear-gradient(135deg, #172c24, #0a5a45)",
    accentColor: "#70d9ad",
    ...projectGallery("flowody-mobile"),
    featured: true,
  },
  {
    id: "movivate",
    name: "Movivate Website",
    category: "Home Workouts · Product Website",
    filterTags: ["TypeScript", "Next.js"],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    desc: "The Movivate website includes a signed-in desktop workspace for weekly training, Free and Pro workouts, custom programs and nutrition.",
    highlights: ["Weekly training plans with workouts, walks, sports and rest", "Free and Pro workout library and exercise search", "Custom workout creation and synced plans", "Weekly meal planning and a daily food log"],
    href: "https://movivate.com",
    live: true,
    gradient: "linear-gradient(135deg, #102c3b, #17506e)",
    accentColor: "#1cbfc4",
    ...projectGallery("movivate"),
    featured: true,
  },
  {
    id: "movivate-mobile",
    name: "Movivate Mobile",
    category: "Home Workouts · iOS & Android",
    filterTags: ["React Native", "TypeScript"],
    stack: ["React Native", "Expo", "TypeScript"],
    desc: "A training and nutrition app for iOS and Android. Plan the week, follow guided workouts with animated exercises and timers, and review activity and nutrition by day, week or month.",
    highlights: ["Weekly plans for workouts, walks, sport and rest", "Custom program creator with exercise selection, reps and timers", "Add a Free or Pro library workout to a planned day", "Nutrition logging and Pro meal planning"],
    href: "https://movivate.com/download",
    live: true,
    gradient: "linear-gradient(135deg, #102c3b, #17506e)",
    accentColor: "#1cbfc4",
    ...projectGallery("movivate-mobile"),
    featured: true,
  },
  {
    id: "flowody-software",
    name: "Flowody Software",
    category: "My Studio · Company Website",
    filterTags: ["Next.js", "TypeScript"],
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    desc: "The website for my software studio, bringing services, product case studies and project enquiries together in a responsive, accessible site.",
    highlights: ["Service pages and product case studies", "Responsive layouts with real product screenshots", "Validated proposal enquiry form and Node.js API", "Static frontend deployed on Cloudflare"],
    href: "https://flowodysoftware.com",
    live: true,
    gradient: "linear-gradient(135deg, #0b2a20, #0a5a45)",
    accentColor: "#c4d99d",
    images: ["/projects/flowody-software.png"],
    featured: true,
  },

  {
    id: "portfolio",
    name: "This Portfolio",
    category: "Personal Site",
    filterTags: ["React", "TypeScript", "Next.js"],
    stack: ["Next.js 16", "TypeScript", "CSS"],
    desc: "Hand-crafted portfolio built with Next.js 16, TypeScript, and custom CSS, with SEO metadata, scroll-reveal motion, and a filterable project showcase.",
    highlights: [
      "Custom scroll-reveal system — no Framer Motion or GSAP",
      "Animated floating orbs + CSS grid overlay for the background",
      "Filterable project grid with modal detail view",
      "SEO metadata configured for portfolio discoverability",
      "Deployed on Vercel with automatic CI/CD from GitHub",
    ],
    href: "https://askin-portfolio.vercel.app",
    live: true,
    gradient: "linear-gradient(135deg, #1a1200 0%, #92400e 50%, #f97316 100%)",
    accentColor: "#fb923c",
    images: ["/askindev.png"],
    slides: [
      {
        sectionTitle: "1. Portfolio Experience",
        title: "Next.js Portfolio with Case Studies",
        desc: "This portfolio is built with Next.js 16 and TypeScript to present production work, technical strengths, and contact pathways in a fast, polished single-site experience. It includes custom UI animation, project filtering, modal case studies, and SEO-focused metadata.",
        bullets: [
          "Built with Next.js 16 and TypeScript",
          "Custom CSS visuals and scroll-reveal interactions",
          "Filterable projects with modal case-study views",
          "SEO metadata included for search visibility",
          "Automatically deployed via Vercel on every push to main",
        ],
      },
    ],
    github: "https://github.com/wild-butterfly/askin-dev",
    featured: false,
  },

  {
    id: "cocktail-finder",
    name: "Cocktail Finder",
    category: "API Project",
    filterTags: ["JavaScript"],
    stack: ["JavaScript", "REST APIs", "HTML5 / CSS3"],
    desc: "A simple web app that lets users search cocktail recipes by ingredient using a public cocktail API.",
    highlights: [
      "Ingredient-based search against a public REST API",
      "Dynamic recipe results rendered from JSON responses",
      "Clean UI built with vanilla JavaScript and CSS",
    ],
    href: "#",
    live: false,
    github: "https://github.com/wild-butterfly/cocktailfinder",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #0e4d6b 50%, #0891b2 100%)",
    accentColor: "#22d3ee",
    images: ["/cocktail.png"],
    featured: false,
  },

  {
    id: "gossip-girl-api",
    name: "Gossip Girl API",
    category: "Backend · REST API",
    filterTags: ["JavaScript"],
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    desc: "REST API example project demonstrating backend architecture — CRUD endpoints, route handling, and structured JSON responses.",
    highlights: [
      "RESTful endpoints with Express route handling",
      "Structured JSON response formatting",
      "Demonstrates clean backend architecture patterns",
    ],
    href: "#",
    live: false,
    github: "https://github.com/wild-butterfly/gossipgirlAPI",
    gradient: "linear-gradient(135deg, #1a0a1e 0%, #6b0e4d 50%, #c026d3 100%)",
    accentColor: "#e879f9",
    images: ["/gossipgirl.png"],
    featured: false,
  },

  {
    id: "realm-portfolio",
    name: "Realm Portfolio",
    category: "Creative Frontend · Earlier Portfolio",
    filterTags: ["React", "JavaScript"],
    stack: ["React", "Vite", "Tailwind CSS", "React Router", "React Icons"],
    desc: "An earlier experimental portfolio built as a sci-fi realm. A creative frontend project exploring animated navigation, sound and game-inspired interfaces with React, Vite and Tailwind CSS.",
    highlights: [
      "Portal intro screen with custom sound and radial animation",
      "Animated realm menu with builds, skills, and developer sections",
      "Glow-based sci-fi UI with responsive layout across devices",
    ],
    github: "https://github.com/wild-butterfly/realm-portfolio",
    href: "https://wild-butterfly.github.io/realm-portfolio/",
    live: true,
    gradient: "linear-gradient(135deg, #0a1a0e 0%, #14532d 50%, #16a34a 100%)",
    accentColor: "#4ade80",
    images: ["/realmportfolio.png"],
    slides: [
      {
        sectionTitle: "1. Sci-Fi Portfolio Experience",
        title: "Interactive Realm Portfolio",
        desc: "Realm Portfolio is a sci-fi-inspired interactive developer portfolio built with React, Vite, and Tailwind CSS. Instead of a traditional static site, it creates a small realm with animated transitions, glowing UI, and a game-like browsing experience.",
        bullets: [
          "Portal intro screen with custom sound and radial animation",
          "Animated Realm menu with Builds, Skills, and About sections",
          "Developer card with stats, skills, and profile photo",
          "Hosted on GitHub Pages",
        ],
      },
    ],
    featured: false,
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
  const hasFeatureNav = project.slides?.some((item) => Boolean(item.label));
  const hasImages = project.images.length > 0;
  const slideCount = hasImages
    ? Math.max(project.images.length, project.slides?.length ?? 0)
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
        <div className={`modal-carousel${project.id === "flowody-mobile" || project.id === "movivate-mobile" ? " modal-carousel--mobile" : ""}${hasFeatureNav ? " modal-carousel--showcase" : ""}`}>
          {hasImages ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.images[slide]}
              alt={project.slides?.[slide]?.imageAlt ?? `${project.name} screenshot ${slide + 1}`}
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
              {!hasFeatureNav && <div className="carousel-dots">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot${i === slide ? " active" : ""}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>}
            </>
          )}
        </div>

        {hasFeatureNav && (
          <div className="showcase-slide-nav" role="group" aria-label={`${project.name} screenshots`}>
            {project.slides?.map((item, index) => (
              <button key={item.sectionTitle} type="button" aria-pressed={index === slide} onClick={() => setSlide(index)}>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="modal-body">
          {project.slides?.[slide] ? (
            <>
              <p className="modal-category">
                {project.slides[slide].sectionTitle}
              </p>
              <h2 className="modal-title">{project.slides[slide].title}</h2>
              <p className="modal-desc">{project.slides[slide].desc}</p>
              {hasFeatureNav && (
                <p className="showcase-image-details">
                  {project.slides[slide].imageNote && <span>{project.slides[slide].imageNote}</span>}
                  <a href={project.images[slide]} target="_blank" rel="noopener noreferrer">Open full-size image ↗</a>
                </p>
              )}
              {project.slides[slide].bullets.length > 0 && (
                <ul className="modal-highlights">
                  {project.slides[slide].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
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
            </>
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
                View Live Site
              </a>
            ) : project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-site"
              >
                GitHub
              </a>
            ) : (
              <span
                className="btn-view-site"
                style={{ opacity: 0.45, cursor: "default" }}
              >
                In Development
              </span>
            )}
            {project.github && project.live && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: "0.88rem" }}
              >
                GitHub
              </a>
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

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterTags.includes(activeFilter));

  const featuredOrder = ["flowody", "flowody-mobile", "movivate", "movivate-mobile", "clevermode", "flowody-software"];
  const featuredProjects = filtered.filter((p) => p.featured).sort((a, b) => featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id));
  const otherProjects = filtered.filter((p) => !p.featured);

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
        <Link href="/" className="nav-logo">
          askin<em>.dev</em>
        </Link>
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
            Full-Stack Developer & Studio Founder · Melbourne, AU
          </span>

          <div onMouseEnter={startHover} onMouseLeave={endHover}>
            <p className="hero-eyebrow">{eyebrow}</p>
          </div>

          <h1 className="hero-title">Aşkın Fear</h1>

          <p className="hero-sub">
            I’m a mechanical engineer turned full-stack developer and the founder of Flowody Software.
            I build websites, mobile apps and business platforms — from the first interface to the backend and deployment.
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

          {/* Featured projects */}
          <div className="projects-grid" data-reveal data-reveal-delay="200">
            {featuredProjects.map((project, i) => (
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
                <div className={`project-card-preview${(project.id === "flowody-mobile" || project.id === "movivate-mobile") ? " project-card-preview--mobile" : ""}`}>
                  {project.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.images[0]}
                      alt={`${project.name} preview`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: (project.id === "flowody" || project.id === "flowody-mobile" || project.id === "movivate" || project.id === "movivate-mobile") ? "contain" : "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <ProjectPlaceholder
                      gradient={project.gradient}
                      accent={project.accentColor}
                    />
                  )}
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

          {/* Other projects */}
          {otherProjects.length > 0 && (
            <>
              <p
                data-reveal
                className="section-label"
                style={{ marginTop: "3.5rem" }}
              >
                Other Projects
              </p>
              <div
                className="projects-grid projects-grid--other"
                data-reveal
                data-reveal-delay="100"
              >
                {otherProjects.map((project, i) => (
                  <div
                    key={project.id}
                    className="project-card project-card--other"
                    style={{ animationDelay: `${i * 80}ms` }}
                    onClick={() => setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedProject(project)
                    }
                    aria-label={`View ${project.name}`}
                  >
                    <div className={`project-card-preview${(project.id === "flowody-mobile" || project.id === "movivate-mobile") ? " project-card-preview--mobile" : ""}`}>
                      {project.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.images[0]}
                          alt={`${project.name} preview`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <ProjectPlaceholder
                          gradient={project.gradient}
                          accent={project.accentColor}
                        />
                      )}
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
            </>
          )}
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
            {skillGroups.map((group, gi) => (
              <div
                key={group.title}
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
                  {group.title}
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
              <Image src="/team/askin-fear-bun.webp" alt="Aşkın Fear, founder and full-stack developer, with her hair in a bun, wearing a black blazer" width={1000} height={1250} sizes="(max-width: 820px) 85vw, 400px" className="founder-portrait" />
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
                I founded Flowody Software, where I build and maintain Flowody for job management,
                Movivate for home workouts and Clevermode for testing and tagging. My work spans
                web interfaces, native mobile apps, APIs, databases and deployment.
              </p>

              <div
                data-reveal
                data-reveal-delay="100"
                className="about-credentials"
              >
                {[
                  {
                    role: "Founder & Developer",
                    place: "Flowody Software",
                    year: "2026 –",
                  },
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
              <a href="https://flowodysoftware.com" target="_blank" rel="noopener noreferrer" className="about-resume-link">Visit my software studio ↗</a>
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
              <a href="https://flowodysoftware.com/contact" className="btn-primary" target="_blank" rel="noopener noreferrer">Discuss a studio project ↗</a>
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
