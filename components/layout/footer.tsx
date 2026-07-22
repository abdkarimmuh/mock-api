export function Footer() {
  const profileUrl = process.env.PROFILE_URL;

  return (
    <footer className="text-muted-foreground border-t py-6 text-center text-sm">
      © {new Date().getFullYear()} created by{" "}
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/80 hover:text-foreground font-bold transition-colors"
      >
        Muhammad Abdul Karim
      </a>
    </footer>
  );
}
