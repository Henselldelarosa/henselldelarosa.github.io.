import FsLightbox from "fslightbox-react";
import Link from "next/link";
import { useState } from "react";
import { RiExternalLinkLine, RiImageLine } from "react-icons/ri";
import { Portal } from "react-portal";

const OtherProjectCard = ({
  portfolio: { title, subtitle, coverimage, imagegallery, url, filters },
}) => {
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
  const firstLine = subtitle
    ? subtitle.split(/\n/)[0].trim().replace(/^Yard Management System \(YMS\)\s*/i, "")
    : "";
  const shortDescription = firstLine.length > 60 ? `${firstLine.slice(0, 57)}...` : firstLine;
  const techStack = Array.isArray(filters) ? filters.slice(0, 4).join(" / ") : "";

  return (
    <div className="portfolio card hovercard group overflow-hidden rounded-lg border border-white border-opacity-10 bg-grey-darken/30 p-0 transition-all hover:border-primary hover:border-opacity-30">
      <div className="portfolio-top relative overflow-hidden">
        <div className="portfolio-image fiximage relative h-48 overflow-hidden">
          <img
            src={coverimage}
            alt={title}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <div className="portfolio-hovercontent absolute left-0 top-0 z-20 flex h-full w-full -translate-x-full transform items-center justify-center gap-4 overflow-hidden bg-grey bg-opacity-80 transition-all duration-500 group-hover:translate-x-0">
          {imagegallery?.length ? (
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary p-0 text-grey"
              onClick={() => setImageGalleryOpen(true)}
            >
              <RiImageLine className="text-lg" />
            </button>
          ) : null}
          {url ? (
            <Link href={url}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary p-0 text-grey"
              >
                <RiExternalLinkLine className="text-lg" />
              </a>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="portfolio-content border-t border-white border-opacity-10 p-4">
        <h5 className="mb-1 text-lg font-semibold">{title}</h5>
        <p className="mb-2 text-sm opacity-90">{shortDescription}</p>
        {techStack ? (
          <p className="text-xs font-medium text-primary">{techStack}</p>
        ) : null}
      </div>
      {imagegallery?.length ? (
        <Portal>
          <FsLightbox toggler={imageGalleryOpen} sources={imagegallery} />
        </Portal>
      ) : null}
    </div>
  );
};

export default OtherProjectCard;
