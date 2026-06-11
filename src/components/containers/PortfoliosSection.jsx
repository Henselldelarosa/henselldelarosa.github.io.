import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getPortfolios } from "../../fetchers";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFullscreenLine,
  RiCloseLine,
  RiExternalLinkLine,
} from "react-icons/ri";
import { Portal } from "react-portal";

const SHORT_SUBTITLES = {
  Courset: "E-Learning Platform",
  "Question-Overflow": "Q&A Application",
  "Question Overflow": "Q&A Application",
  "Facebook Clone": "Social Media Replica",
  "Airbnb Clone": "Booking Platform",
  "Bilingual Wedding Site with Live Admin CMS": "Wedding Site CMS",
};

const CARDS_PER_PAGE = 2;

const getProjectImages = (project) => {
  const cover = project.coverimage || "";
  const gallery = Array.isArray(project.imagegallery) ? project.imagegallery : [];
  if (!cover && !gallery.length) return [];
  if (!gallery.length) return [cover];
  const first = gallery[0];
  if (cover && cover === first) return gallery;
  return [cover, ...gallery].filter(Boolean);
};

const PortfoliosSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageIndexByProject, setImageIndexByProject] = useState({});
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [detailProject, setDetailProject] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const { data } = useQuery("portfolios", getPortfolios);

  const openDetail = (project, images) => {
    if (!images?.length) return;
    setDetailProject({ ...project, _images: images });
    setDetailImageIndex(0);
  };
  const closeDetail = () => setDetailProject(null);

  // Close detail modal on Escape
  useEffect(() => {
    if (!detailProject) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeDetail();
      if (e.key === "ArrowRight") {
        setDetailImageIndex((i) => {
          const len = detailProject._images?.length || 0;
          return len ? (i + 1) % len : i;
        });
      }
      if (e.key === "ArrowLeft") {
        setDetailImageIndex((i) => {
          const len = detailProject._images?.length || 0;
          return len ? (i - 1 + len) % len : i;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailProject]);

  const otherProjects = data
    ? data.filter((p) => p.id !== 1 && p.title !== "LadingIQ").slice(0, 6)
    : [];

  const totalPages = Math.max(1, Math.ceil(otherProjects.length / CARDS_PER_PAGE));
  const start = currentPage * CARDS_PER_PAGE;
  const visibleProjects = otherProjects.slice(start, start + CARDS_PER_PAGE);

  const goPrev = () => setCurrentPage((p) => (p <= 0 ? totalPages - 1 : p - 1));
  const goNext = () => setCurrentPage((p) => (p >= totalPages - 1 ? 0 : p + 1));

  const getImageIndex = (projectId) => imageIndexByProject[projectId] ?? 0;
  const setProjectImageIndex = (projectId, imagesLength, delta) => {
    if (imagesLength <= 1) return;
    setImageIndexByProject((prev) => {
      const current = prev[projectId] ?? 0;
      const next = (current + delta + imagesLength) % imagesLength;
      return { ...prev, [projectId]: next };
    });
  };

  if (!data) return null;

  const hoveredProject = data.find(
    (p) => (p.id ?? p.title) === hoveredCardId
  );

  const infoPanel = (
    <div className="flex h-full min-h-[200px] flex-col rounded-md border border-white/10 bg-white/[0.03] p-4 shadow-lg shadow-black/10 transition-colors duration-200">
      {hoveredProject ? (
        <>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-white">
              {hoveredProject.title}
            </h3>
            {hoveredProject.url ? (
              <a
                href={hoveredProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue-300 transition hover:text-blue-200"
              >
                Visit
                <RiExternalLinkLine className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </div>
          <p className="mt-3 flex-1 overflow-y-auto whitespace-pre-line text-base leading-relaxed text-white/85">
            {hoveredProject.subtitle}
          </p>
          {Array.isArray(hoveredProject.filters) && hoveredProject.filters.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {hoveredProject.filters.map((f) => (
                <span
                  key={f}
                  className="whitespace-nowrap rounded-full border border-blue-400/40 bg-blue-500/15 px-2.5 py-1 text-xs font-medium text-blue-50"
                >
                  {f}
                </span>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <p className="m-auto text-center text-base text-white/60">
          Hover over a project to see full description and stack
        </p>
      )}
    </div>
  );

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Other Projects
      </h2>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-4">
        <div className="relative flex flex-1 items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous projects"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
        >
          <RiArrowLeftSLine className="h-6 w-6 shrink-0" aria-hidden />
        </button>

        <div className="grid min-h-[280px] flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {visibleProjects.map((project, idx) => {
          const subtitle =
            SHORT_SUBTITLES[project.title] ||
            (project.subtitle && project.subtitle.split(/\n|\./)[0].trim().slice(0, 40));
          const filters = Array.isArray(project.filters) ? project.filters : [];
          const stack = filters.slice(0, 3).join(" / ");
          const hasMoreStack = filters.length > 3;
          const isHighlight = idx === 1 && visibleProjects.length >= 2;
          const projectId = project.id ?? project.title;
          const images = getProjectImages(project);
          const imageIndex = getImageIndex(projectId);
          const currentImage = images[imageIndex] || "";
          const hasMultipleImages = images.length > 1;
          const goPrevImage = () => setProjectImageIndex(projectId, images.length, -1);
          const goNextImage = () => setProjectImageIndex(projectId, images.length, 1);
          const isViewingImage = hasMultipleImages && imageIndex > 0;
          const isCardHovered = hoveredCardId === projectId && !isViewingImage;
          return (
            <div
              key={project.id || project.title}
              onMouseEnter={() => setHoveredCardId(projectId)}
              onMouseLeave={() => {
                setHoveredCardId((id) => (id === projectId ? null : id));
              }}
              className={`group relative min-h-[280px] overflow-hidden rounded-sm border shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.25)] ${
                isHighlight
                  ? "border-blue-400/30"
                  : "border-white/10"
              }`}
              style={{
                backgroundImage: currentImage ? `url(${currentImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-200 ${
                  isViewingImage
                    ? "bg-black/25"
                    : isCardHovered
                      ? "bg-black/80"
                      : isHighlight
                        ? "bg-blue-900/70"
                        : "bg-black/60"
                }`}
              />
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openDetail(project, images);
                  }}
                  aria-label="Expand project details"
                  className="absolute right-2 top-2 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition hover:bg-black/80"
                >
                  <RiFullscreenLine className="h-5 w-5 shrink-0" aria-hidden />
                </button>
              )}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goPrevImage(); }}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition hover:bg-black/70"
                  >
                    <RiArrowLeftSLine className="h-5 w-5 shrink-0" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goNextImage(); }}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition hover:bg-black/70"
                  >
                    <RiArrowRightSLine className="h-5 w-5 shrink-0" aria-hidden />
                  </button>
                </>
              )}
              {isHighlight && !isViewingImage && (
                <span className="absolute left-2 top-2 z-10 rounded-full bg-blue-500/80 px-2.5 py-0.5 text-xs font-semibold text-white">
                  Featured
                </span>
              )}
              <div
                className={`relative z-10 flex min-h-[280px] flex-col px-6 py-8 text-center transition-opacity duration-200 ${
                  isViewingImage ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex flex-1 flex-col items-center justify-center">
                  <h3 className="text-2xl font-semibold text-white md:text-4xl">
                    {project.title}
                  </h3>
                  <div className="mx-auto mt-4 h-px w-32 bg-white/15" />
                  <p className="mt-5 text-base text-white/90 md:text-2xl">
                    {subtitle || "Full-stack project"}
                  </p>
                </div>
                {stack ? (
                  <div className="mt-6 flex justify-center">
                    <div className="inline-flex cursor-default items-center rounded-md bg-blue-900/80 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 md:text-lg">
                      {stack}
                      {hasMoreStack ? (
                        <span className="ml-1 text-white/70">+{filters.length - 3}</span>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next projects"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
        >
          <RiArrowRightSLine className="h-6 w-6 shrink-0" aria-hidden />
        </button>
        </div>

        <div className="w-full lg:w-[300px] xl:w-[340px]">
          {infoPanel}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous projects"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
          >
            <RiArrowLeftSLine className="h-4 w-4 shrink-0" aria-hidden />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition ${
                  i === currentPage
                    ? "scale-125 border-white/40 bg-white/20"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${i === currentPage ? "bg-white" : "bg-white/50"}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next projects"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
          >
            <RiArrowRightSLine className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        </div>
      )}

      {detailProject && (
        <Portal>
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4"
            onClick={closeDetail}
            role="dialog"
            aria-modal="true"
            aria-label={`${detailProject.title} details`}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-zinc-950 text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeDetail}
                aria-label="Close"
                className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
              >
                <RiCloseLine className="h-5 w-5" aria-hidden />
              </button>

              <div className="relative flex aspect-video w-full items-center justify-center bg-black">
                {detailProject._images?.[detailImageIndex] && (
                  <img
                    src={detailProject._images[detailImageIndex]}
                    alt={`${detailProject.title} screenshot ${detailImageIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
                {detailProject._images?.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const len = detailProject._images.length;
                        setDetailImageIndex((i) => (i - 1 + len) % len);
                      }}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    >
                      <RiArrowLeftSLine className="h-6 w-6" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const len = detailProject._images.length;
                        setDetailImageIndex((i) => (i + 1) % len);
                      }}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    >
                      <RiArrowRightSLine className="h-6 w-6" aria-hidden />
                    </button>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs">
                      {detailImageIndex + 1} / {detailProject._images.length}
                    </span>
                  </>
                )}
              </div>

              <div className="overflow-y-auto">
                <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr]">
                  <section>
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Description
                      </h4>
                      {detailProject.url ? (
                        <a
                          href={detailProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-300 transition hover:text-blue-200"
                        >
                          Visit live site
                          <RiExternalLinkLine className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      ) : null}
                    </div>
                    <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">
                      {detailProject.title}
                    </h3>
                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/85">
                      {detailProject.subtitle}
                    </p>
                  </section>
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      Tech Stack
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(detailProject.filters || []).map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-50"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </section>
  );
};

export default PortfoliosSection;
