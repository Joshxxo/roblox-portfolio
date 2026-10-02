"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "button" | "project";

type Project = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "BOW SYSTEM",
    description:
      "A physics-based Roblox bow system featuring custom trajectory prediction, draw mechanics, raycasting, and server-side projectile simulation.",
    tags: ["LUAU", "PHYSICS", "RAYCASTING"],
  },
  {
    number: "02",
    title: "PROJECT TWO",
    description:
      "A gameplay experience focused on polished mechanics, responsive systems, and immersive player interactions.",
    tags: ["ROBLOX", "GAMEPLAY", "SYSTEMS"],
  },
  {
    number: "03",
    title: "PROJECT THREE",
    description:
      "A custom Roblox system designed around performance, clean architecture, and satisfying player feedback.",
    tags: ["LUAU", "UI", "SYSTEMS"],
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 15L15 3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7 3H15V11"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function Home() {
  const cursorTarget = useRef({ x: 0, y: 0 });
  const cursorCurrent = useRef({ x: 0, y: 0 });

  const [cursorMode, setCursorMode] =
    useState<CursorMode>("default");

  const [cursorVisible, setCursorVisible] = useState(true);

  /*
   * CURSOR MOVEMENT
   *
   * Instead of snapping directly to the mouse,
   * the cursor smoothly follows it.
   */
  useEffect(() => {
    let animationFrame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      cursorTarget.current.x = event.clientX;
      cursorTarget.current.y = event.clientY;

      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    const animateCursor = () => {
      const current = cursorCurrent.current;
      const target = cursorTarget.current;

      /*
       * Smooth follow.
       *
       * Higher number = faster.
       * Lower number = more floaty.
       */
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      const cursor =
        document.querySelector<HTMLElement>(".custom-cursor");

      if (cursor) {
        cursor.style.transform = `
          translate3d(
            ${current.x}px,
            ${current.y}px,
            0
          )
          translate(-50%, -50%)
        `;
      }

      animationFrame =
        requestAnimationFrame(animateCursor);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    animationFrame =
      requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  /*
   * CURSOR INTERACTION
   *
   * Different elements produce different cursor states.
   */
  useEffect(() => {
    const interactiveElements =
      document.querySelectorAll<HTMLElement>(
        "a, button, .interactive, .project, .service"
      );

    const handleEnter = (event: Event) => {
      const element =
        event.currentTarget as HTMLElement;

      if (
        element.classList.contains("hero-button") ||
        element.classList.contains("discord-button") ||
        element.classList.contains("nav-contact")
      ) {
        setCursorMode("button");
        return;
      }

      if (element.classList.contains("project")) {
        setCursorMode("project");
        return;
      }

      setCursorMode("hover");
    };

    const handleLeave = () => {
      setCursorMode("default");
    };

    interactiveElements.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        handleEnter
      );

      element.addEventListener(
        "mouseleave",
        handleLeave
      );
    });

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          handleEnter
        );

        element.removeEventListener(
          "mouseleave",
          handleLeave
        );
      });
    };
  });

  const cursorClass =
    cursorMode === "hover"
      ? "cursor-hover"
      : cursorMode === "button"
        ? "cursor-button"
        : cursorMode === "project"
          ? "cursor-project"
          : "";

  return (
    <>
      {/* PREMIUM CURSOR */}

      <div
        className={`custom-cursor ${cursorClass} ${
          cursorVisible ? "" : "cursor-hidden"
        }`}
        aria-hidden="true"
      />

      <main>
        {/* NAVIGATION */}

        <nav className="navbar">
          <a
            href="#top"
            className="logo interactive"
          >
            JOSHUA<span>.</span>
          </a>

          <div className="nav-links">
            <a
              href="#work"
              className="interactive"
            >
              Work
            </a>

            <a
              href="#about"
              className="interactive"
            >
              About
            </a>

            <a
              href="#services"
              className="interactive"
            >
              Services
            </a>

            <a
              href="#contact"
              className="interactive"
            >
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="nav-contact interactive"
          >
            LET&apos;S TALK ↗
          </a>
        </nav>

        {/* HERO */}

        <section
          className="hero"
          id="top"
        >
          <div
            className="hero-background"
            aria-hidden="true"
          >
            <div className="hero-grid" />
          </div>

          <div className="hero-content">
            <div className="hero-label">
              <span className="status-dot" />

              ROBLOX DEVELOPER / GAME SYSTEMS
            </div>

            <h1>
              I BUILD
              <br />
              <span>THINGS</span>
              <br />
              PEOPLE PLAY.
            </h1>

            <div className="hero-bottom">
              <p>
                I&apos;m Joshua, a Roblox developer focused on
                <br />
                polished systems, gameplay, and experiences.
              </p>

              <a
                href="#work"
                className="hero-button interactive"
              >
                <span>
                  EXPLORE MY WORK
                </span>

                <ArrowIcon />
              </a>
            </div>
          </div>

          {/* DISCORD CARD ONLY */}

          <a
            href="https://discord.com/users/746740941414596668"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-discord-card interactive"
          >
            <div className="hero-discord-header">
              <span>DISCORD</span>

              <span className="hero-discord-status">
                <i />
                ONLINE
              </span>
            </div>

            <div className="hero-discord-profile">
              <div className="hero-discord-avatar" />

              <div className="hero-discord-user">
                <strong>ezzzzz3653</strong>
                <span>open for commissions</span>
              </div>
            </div>

            <div className="hero-discord-bottom">
              <span>MESSAGE ME</span>

              <span className="hero-discord-arrow">
                ↗
              </span>
            </div>
          </a>

          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>

            <div className="scroll-line" />
          </div>
        </section>

        {/* MARQUEE */}

        <div className="marquee">
          <div className="marquee-track">
            <span>ROBLOX DEVELOPMENT</span>
            <span>✦</span>
            <span>SYSTEMS</span>
            <span>✦</span>
            <span>GAMEPLAY</span>
            <span>✦</span>
            <span>PHYSICS</span>
            <span>✦</span>

            <span>ROBLOX DEVELOPMENT</span>
            <span>✦</span>
            <span>SYSTEMS</span>
            <span>✦</span>
            <span>GAMEPLAY</span>
            <span>✦</span>
            <span>PHYSICS</span>
            <span>✦</span>
          </div>
        </div>

        {/* WORK */}

        <section
          className="section"
          id="work"
        >
          <div className="section-heading">
            <div>
              <span className="section-number">
                01 /
              </span>

              <span className="section-label">
                SELECTED WORK
              </span>
            </div>

            <p>
              A collection of systems,
              <br />
              mechanics and experiences.
            </p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article
                className="project interactive"
                key={project.number}
              >
                <div className="project-image">
                  <div className="project-placeholder">
                    <span>
                      {project.number}
                    </span>

                    <div className="project-placeholder-text">
                      {project.title}
                    </div>
                  </div>

                  <div className="project-overlay">
                    <span>
                      VIEW PROJECT
                    </span>

                    <span className="project-arrow">
                      ↗
                    </span>
                  </div>
                </div>

                <div className="project-info">
                  <div>
                    <span className="project-number">
                      {project.number}
                    </span>

                    <h2>
                      {project.title}
                    </h2>
                  </div>

                  <p>
                    {project.description}
                  </p>

                  <div className="project-footer">
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="watch-button interactive"
                    >
                      VIEW CASE STUDY ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT */}

        <section
          className="section"
          id="about"
        >
          <div className="section-heading">
            <div>
              <span className="section-number">
                02 /
              </span>

              <span className="section-label">
                ABOUT
              </span>
            </div>

            <p>
              Building things that feel
              <br />
              simple when they&apos;re finished.
            </p>
          </div>

          <div className="about-layout">
            <h2>
              BUILDING
              <br />
              WITH
              <br />
              <span>INTENTION.</span>
            </h2>

            <div className="about-copy">
              <p className="large-copy">
                I&apos;m a Roblox developer focused on
                building polished systems, gameplay
                mechanics, combat, physics, and
                experiences that feel good to play.
              </p>

              <p>
                I care about how systems work underneath
                the surface just as much as how they feel
                to the player.
              </p>

              <p>
                From gameplay mechanics to custom
                physics and responsive interactions,
                I aim to make every part of an experience
                feel intentional.
              </p>

              <a
                href="#contact"
                className="text-link interactive"
              >
                LET&apos;S WORK TOGETHER
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}

        <section
          className="section"
          id="services"
        >
          <div className="section-heading">
            <div>
              <span className="section-number">
                03 /
              </span>

              <span className="section-label">
                WHAT I DO
              </span>
            </div>

            <p>
              Systems designed around
              <br />
              gameplay and player experience.
            </p>
          </div>

          <div className="services">
            {[
              "ROBLOX SCRIPTING",
              "GAMEPLAY SYSTEMS",
              "COMBAT SYSTEMS",
              "PHYSICS SYSTEMS",
              "UI & UX",
              "OPTIMIZATION",
            ].map((service, index) => (
              <div
                className="service interactive"
                key={service}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                  {service}
                </h3>

                <span className="service-arrow">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}

        <section
          className="contact-section"
          id="contact"
        >
          <div
            className="contact-background"
            aria-hidden="true"
          >
            <div />
            <div />
            <div />
          </div>

          <div className="contact-content">
            <span className="section-number">
              04 / CONTACT
            </span>

            <h2>
              LET&apos;S MAKE
              <br />
              SOMETHING
              <br />
              <span>WORTH PLAYING.</span>
            </h2>

            <p>
              Have an idea for a Roblox experience?
              <br />
              Let&apos;s turn it into something real.
            </p>

            <a
              href="https://discord.com/users/746740941414596668"
              target="_blank"
              rel="noopener noreferrer"
              className="discord-button interactive"
            >
              <span>
                CONTACT ME ON DISCORD
              </span>

              <span>
                ↗
              </span>
            </a>
          </div>
        </section>

        {/* FOOTER */}

        <footer>
          <span>
            JOSHUA © 2026
          </span>

          <div>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
            >
              GITHUB ↗
            </a>

            <a
              href="https://discord.com/users/746740941414596668"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
            >
              DISCORD ↗
            </a>
          </div>

          <span>
            BUILT WITH NEXT.JS
          </span>
        </footer>
      </main>
    </>
  );
}