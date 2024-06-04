import Link from "next/link";

const Logo = ({ url = "/", text = true }) => {
  return (
    <Link href={url}>
      <a className="sitelogo py-2">
        {text ? (
          <span className="text-4xl font-bold uppercase leading-none text-primary">

          </span>
        ) : (
          <>
          </>
        )}
      </a>
    </Link>
  );
};

export default Logo;
