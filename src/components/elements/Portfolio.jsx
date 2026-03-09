import FsLightbox from "fslightbox-react";
import Link from "next/link";
import { useState } from "react";
import { RiExternalLinkLine, RiImageLine, RiVideoLine } from "react-icons/ri";
import { Portal } from "react-portal";

const Portfolio = ({
  portfolio: { title, subtitle, coverimage, imagegallery, videogallery, url },
}) => {
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);

  return (
    <div className="portfolio card hovercard group p-4 md:p-5">
      <div className="portfolio-top relative overflow-hidden">
        <div className="portfolio-image fiximage blur-0 filter transition-all duration-500 group-hover:blur">
          <img
            src={coverimage}
            height={384}
            width={550}
            alt={title}
          />
        </div>
        <div className="portfolio-hovercontent absolute left-0 top-0 z-20 flex h-full w-full -translate-x-full transform items-center justify-center gap-4 overflow-hidden bg-grey bg-opacity-80 transition-all duration-500 group-hover:translate-x-0">
          {imagegallery.length ? (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              onClick={() => setImageGalleryOpen(true)}
            >
              <RiImageLine />
            </button>
          ) : null}
          {videogallery.length ? (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              onClick={() => setVideoGalleryOpen(true)}
            >
              <RiVideoLine />
            </button>
          ) : null}
          {url ? (
            <Link href={url}>
              <a
                target="_blank"
                className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              >
                <RiExternalLinkLine />
              </a>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="portfolio-content mt-4">
        <h5 className="mb-0">{title}</h5>
        <p className="whitespace-pre-line">
          {subtitle.split("Yard Management System (YMS)").map((part, i, parts) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <strong>Yard Management System (YMS)</strong>
              )}
            </span>
          ))}
        </p>
      </div>
      {imagegallery && (
        <Portal>
          <FsLightbox toggler={imageGalleryOpen} sources={imagegallery} />
        </Portal>
      )}
      {videogallery && (
        <Portal>
          <FsLightbox toggler={videoGalleryOpen} sources={videogallery} />
        </Portal>
      )}
    </div>
  );
};

export default Portfolio;
