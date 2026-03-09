import { useState } from "react";
import { useQuery } from "react-query";
import { getPortfolios } from "../../fetchers";
import { RiArrowLeftSLine, RiArrowRightSLine, RiFullscreenLine } from "react-icons/ri";
import FsLightbox from "fslightbox-react";
import { Portal } from "react-portal";

const SHORT_SUBTITLES = {
  Courset: "E-Learning Platform",
  "Question-Overflow": "Q&A Application",
  "Question Overflow": "Q&A Application",
  "Facebook Clone": "Social Media Replica",
  "Airbnb Clone": "Booking Platform",
};

const CARDS_PER_PAGE = 3;

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
  const [lightboxToggler, setLightboxToggler] = useState(false);
  const [lightboxSources, setLightboxSources] = useState([]);
  const { data } = useQuery("portfolios", getPortfolios);

  const openExpandLightbox = (sources) => {
    if (!sources?.length) return;
    setLightboxSources([...sources]);
    setLightboxToggler(false);
    setTimeout(() => setLightboxToggler(true), 100);
  };

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

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Other Projects
      </h2>

      <div className="relative flex items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous projects"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
        >
          <RiArrowLeftSLine className="h-6 w-6 shrink-0" aria-hidden />
        </button>

        <div className="grid min-h-[280px] flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        {visibleProjects.map((project, idx) => {
          const subtitle =
            SHORT_SUBTITLES[project.title] ||
            (project.subtitle && project.subtitle.split(/\n|\./)[0].trim().slice(0, 40));
          const stack = Array.isArray(project.filters)
            ? project.filters.slice(0, 3).join(" / ")
            : "";
          const isHighlight = idx === 1 && visibleProjects.length >= 2;
          const projectId = project.id ?? project.title;
          const images = getProjectImages(project);
          const imageIndex = getImageIndex(projectId);
          const currentImage = images[imageIndex] || "";
          const hasMultipleImages = images.length > 1;
          const goPrevImage = () => setProjectImageIndex(projectId, images.length, -1);
          const goNextImage = () => setProjectImageIndex(projectId, images.length, 1);
          const isViewingImage = hasMultipleImages && imageIndex > 0;
          return (
            <div
              key={project.id || project.title}
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
                    openExpandLightbox(images);
                  }}
                  aria-label="View images in large"
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
                className={`relative z-10 flex min-h-[280px] flex-col justify-center px-6 py-8 text-center transition-opacity duration-200 ${
                  isViewingImage ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <h3 className="text-2xl font-semibold text-white md:text-4xl">
                  {project.title}
                </h3>
                <div className="mx-auto mt-4 h-px w-32 bg-white/15" />
                <p className="mt-5 text-base text-white/90 md:text-2xl">
                  {subtitle || "Full-stack project"}
                </p>
                {stack ? (
                  <div className="mt-6 inline-flex rounded-md bg-blue-900/80 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 md:text-lg">
                    {stack}
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

      {lightboxSources.length > 0 && (
        <Portal>
          <FsLightbox
            toggler={lightboxToggler}
            sources={lightboxSources}
          />
        </Portal>
      )}
    </section>
  );
};

export default PortfoliosSection;
