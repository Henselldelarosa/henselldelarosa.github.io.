import { useState } from "react";
import { useQuery } from "react-query";
import { getPortfolios } from "../../fetchers";
import FsLightbox from "fslightbox-react";
import { Portal } from "react-portal";
import { RiImageLine, RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine, RiFullscreenLine } from "react-icons/ri";

const YMS_TECH = ["React", "Tailwind CSS", "Python", "Flask", "PostgreSQL"];
const SIDEBAR_NAV = [
  "Overview",
  "Map and Search",
  "Fleet Management",
  "Load Dashboard",
  "Yard Entry",
  "Yard Movements",
  "Driver Activity",
  "Door Loadout",
  "Audit & Security",
];
const YMS_GALLERY_FALLBACK = [
  "/images/portfolios/yms-dashboard.png",
  "/images/portfolios/yms-move-workflow.png",
  "/images/portfolios/yms-permissions.png",
  "/images/portfolios/yms-role-management.png",
  "/images/portfolios/yms-driver-mobile.png",
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
  const openOverlay = () => {
    setCurrentImageIndex(0);
    setGalleryOverlayOpen(true);
  };
  const closeOverlay = () => setGalleryOverlayOpen(false);

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Yard Management System (YMS)
      </h2>

      <div className="relative rounded-sm border border-white/10 bg-white/5 px-6 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-10 md:py-10">
        {galleryOverlayOpen ? (
          <div className="relative z-10 min-h-[400px]">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition hover:bg-white/20"
              >
                <RiArrowLeftSLine />
              </button>
              <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-lg bg-black/30">
                {gallery[currentImageIndex] && (
                  <img
                    src={gallery[currentImageIndex]}
                    alt={`YMS screenshot ${currentImageIndex + 1}`}
                    className="mx-auto max-h-[70vh] w-full object-contain"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition hover:bg-white/20"
              >
                <RiArrowRightSLine />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={closeOverlay}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <RiCloseLine className="text-lg" />
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setLightboxOpen(false);
                  setTimeout(() => setLightboxOpen(true), 0);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
              >
                <RiFullscreenLine className="text-lg" />
                View images in large
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-center text-base text-white/85 md:text-2xl">
              Logistics platform for managing trailer inventory, yard moves, and
              operational workflows. Built from real logistics workflows observed in yard operations.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8">
              {YMS_TECH.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 bg-slate-700/70 px-3 py-2 text-sm font-medium text-white/95 shadow-inner md:px-4 md:text-lg"
                >
                  {item}
                </span>
              ))}
            </div>

            {hasGallery && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={openOverlay}
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/95 transition hover:bg-white/20 md:text-base"
                >
                  <RiImageLine className="text-lg" />
                  View real screenshots
                </button>
              </div>
            )}

            <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-white/10 bg-slate-950/80 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.45)] md:mt-10 md:p-5">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900">
            <div className="grid min-h-[420px] grid-cols-[220px_1fr] md:min-h-[520px]">
              <aside className="hidden border-r border-white/10 bg-[#0b1733] p-4 md:block">
                <div className="mb-6 text-sm font-semibold text-white/70">
                  Trailer Frames
                </div>
                <div className="space-y-3 text-sm text-white/55">
                  {SIDEBAR_NAV.map((nav, idx) => (
                    <div
                      key={nav}
                      className={`rounded-md px-3 py-2 ${
                        idx === 1
                          ? "bg-blue-600/20 text-blue-300"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {nav}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="bg-slate-100 p-4 text-slate-800 md:p-6">
                <div className="rounded-lg bg-white p-4 shadow-sm md:p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold md:text-3xl">
                        Move Queue
                      </h3>
                      <p className="text-xs text-slate-500 md:text-sm">
                        Yard operations / procedures
                      </p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 md:text-sm">
                      Active
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-3 text-sm font-medium text-slate-700 md:text-base">
                        Yard Routing Overview
                      </div>
                      <div className="relative h-44 overflow-hidden rounded-lg bg-[linear-gradient(180deg,#dbeafe_0%,#bbf7d0_100%)] md:h-64">
                        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:32px_32px]" />
                        <div className="absolute left-8 top-6 h-16 w-24 rounded-md bg-blue-500 shadow-lg md:h-24 md:w-32" />
                        <div className="absolute left-24 top-20 h-14 w-20 rounded-md bg-blue-600 shadow-lg md:left-36 md:top-28 md:h-20 md:w-28" />
                        <div className="absolute bottom-8 left-8 right-8 h-2 rounded-full bg-amber-400/90" />
                        <div className="absolute right-8 top-8 h-32 w-28 rounded-lg border border-dashed border-slate-400/70 bg-white/45 md:h-44 md:w-36" />
                      </div>
                      <div className="mt-4 space-y-2">
                        {[1, 2].map((r) => (
                          <div
                            key={r}
                            className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-xs md:text-sm"
                          >
                            <span>Dock Workflow {r}</span>
                            <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                              Ready
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                      {[
                        ["Yard", "02A9M4CC", "green"],
                        ["Source", "04DM4XCC", "amber"],
                        ["Storage", "08DM4N4CC", "blue"],
                        ["Door", "00DM4XCC", "slate"],
                      ].map(([label, code, tone]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-8 w-8 rounded-full ${
                                tone === "green"
                                  ? "bg-green-100"
                                  : tone === "amber"
                                    ? "bg-amber-100"
                                    : tone === "blue"
                                      ? "bg-blue-100"
                                      : "bg-slate-100"
                              }`}
                            />
                            <div>
                              <div className="text-sm font-semibold md:text-base">
                                {label}
                              </div>
                              <div className="text-xs text-slate-500 md:text-sm">
                                {code}
                              </div>
                            </div>
                          </div>
                          <button type="button" className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 md:text-sm">
                            See job
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-4 h-3 w-4/5 rounded-b-[2rem] bg-slate-700 shadow-[0_16px_32px_rgba(0,0,0,0.55)] md:h-4" />
          </div>
          </>
        )}
        {hasGallery && (
          <Portal>
            <FsLightbox
              key={lightboxOpen ? "open" : "closed"}
              toggler={lightboxOpen}
              sources={gallery}
            />
          </Portal>
        )}
      </div>
    </section>
  );
};

export default FeaturedYMSSection;
