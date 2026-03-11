import { useState } from "react";
import { useQuery } from "react-query";
import { getPortfolios } from "../../fetchers";
import FsLightbox from "fslightbox-react";
import { Portal } from "react-portal";
import { RiImageLine, RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine, RiFullscreenLine } from "react-icons/ri";

const YMS_GALLERY_FALLBACK = [
  "/images/portfolios/yms-dashboard.png",
  "/images/portfolios/yms-move-workflow.png",
  "/images/portfolios/yms-permissions.png",
  "/images/portfolios/yms-role-management.png",
  "/images/portfolios/yms-driver-mobile.png",
];

const KEY_FEATURES = [
  "Trailer Inventory Tracking",
  "Move Workflow Engine",
  "Role-Based Access Control",
  "Mobile Driver Interface",
];

const DESIGN_BLOCKS = [
  { title: "Problem", body: ["Old yard operations relied on manual processes to track trailer locations and moves."] },
  { title: "System Architecture", body: ["React frontend, Flask backend,", "PostgreSQL database.", "RESTful APIs"] },
  { title: "Key Features", body: ["Trailer Inventory Tracking", "Move Workflow Engine", "Role-Based Access Control", "Mobile Driver Interface"] },
  { title: "Technologies", body: ["React & Tailwind", "Python & Flask", "PostgreSQL", "AWS"] },
];

const FeaturedYMSSection = () => {
  const [galleryOverlayOpen, setGalleryOverlayOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { data } = useQuery("portfolios", getPortfolios);
  const yms = data?.find((p) => p.id === 1 || p.title === "LadingIQ");
  const gallery = yms?.imagegallery?.length ? yms.imagegallery : YMS_GALLERY_FALLBACK;
  const hasGallery = gallery.length > 0;
  const goPrev = () => setCurrentImageIndex((i) => (i <= 0 ? Math.max(0, gallery.length - 1) : i - 1));
  const goNext = () => setCurrentImageIndex((i) => (i >= gallery.length - 1 ? 0 : i + 1));
  const openOverlay = () => { setCurrentImageIndex(0); setGalleryOverlayOpen(true); };
  const closeOverlay = () => setGalleryOverlayOpen(false);

  return (
    <section className="space-y-8 md:space-y-10">
      {/* Featured Project label */}
      <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
        Featured Project
      </p>

      {/* Main title */}
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
        Enterprise Yard Management System (YMS)
      </h2>

      {/* Credibility line */}
      <p className="text-base italic text-white/90 md:text-lg">
        Designed using real logistics workflows observed in yard operations.
      </p>

      {/* Description */}
      <p className="max-w-3xl text-base leading-relaxed text-white/85 md:text-xl">
        Logistics platform for managing trailer inventory, yard moves, and operational workflows.
      </p>

      {/* Tech stack - single line with bullets */}
      <p className="text-base font-medium text-white/95 md:text-lg">
        React • Tailwind • Python • Flask • PostgreSQL
      </p>

      {/* Large screenshot / gallery block */}
      <div className="relative rounded-sm border border-white/10 bg-white/5 px-4 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-8 md:py-8">
        {galleryOverlayOpen ? (
          <div className="relative z-10 min-h-[400px]">
            <div className="flex items-center justify-between gap-4">
              <button type="button" onClick={goPrev} aria-label="Previous image" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition hover:bg-white/20">
                <RiArrowLeftSLine className="h-6 w-6" />
              </button>
              <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-lg bg-black/30">
                {gallery[currentImageIndex] && (
                  <img src={gallery[currentImageIndex]} alt={`YMS screenshot ${currentImageIndex + 1}`} className="mx-auto max-h-[70vh] w-full object-contain" />
                )}
              </div>
              <button type="button" onClick={goNext} aria-label="Next image" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition hover:bg-white/20">
                <RiArrowRightSLine className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={closeOverlay} className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20">
                <RiCloseLine className="text-lg" /> Close
              </button>
              <button type="button" onClick={() => { setLightboxOpen(false); setTimeout(() => setLightboxOpen(true), 100); }} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500">
                <RiFullscreenLine className="text-lg" /> View images in large
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-4xl rounded-xl border border-white/10 bg-slate-950/80 p-2 shadow-[0_30px_60px_rgba(0,0,0,0.45)] md:p-4">
              {gallery[0] && (
                <img src={gallery[0]} alt="YMS dashboard" className="w-full rounded-lg object-contain" style={{ maxHeight: "60vh" }} />
              )}
            </div>
            {hasGallery && (
              <div className="mt-4 flex justify-center">
                <button type="button" onClick={openOverlay} className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/95 transition hover:bg-white/20 md:text-base">
                  <RiImageLine className="text-lg" /> View screenshot gallery
                </button>
              </div>
            )}
          </>
        )}
        {hasGallery && (
          <Portal>
            <FsLightbox toggler={lightboxOpen} sources={gallery} />
          </Portal>
        )}
      </div>

      {/* Key features - quick scan for recruiters */}
      <div className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
        <h3 className="mb-4 text-xl font-semibold md:text-2xl">What it does</h3>
        <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          {KEY_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-white/90">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* System Design - part of featured project */}
      <div className="space-y-5">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">System Design</h3>
        <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-4">
          {DESIGN_BLOCKS.map((block) => (
            <div key={block.title} className="bg-white/5 p-6 backdrop-blur-sm md:min-h-[260px]">
              <h4 className="text-lg font-semibold text-white md:text-xl">{block.title}</h4>
              <div className="mt-3 h-px w-24 bg-white/15" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/85 md:text-base">
                {block.body.map((line) => (
                  <li key={line} className="flex gap-2">
                    {block.body.length > 1 && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />}
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedYMSSection;
