export function Footer() {
  const profileUrl = process.env.PROFILE_URL;

  return (
    <footer className="mt-auto border-t px-6 py-4 text-center text-xs">
      <span className="text-muted-foreground">
        © {new Date().getFullYear()} created by{" "}
      </span>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground font-bold underline-offset-4 hover:underline"
      >
        Muhammad Abdul Karim
      </a>
    </footer>
  );
}
