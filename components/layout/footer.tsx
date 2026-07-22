export function Footer() {
  const profileUrl = process.env.PROFILE_URL;

  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} created by{" "}
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-foreground/80 transition-colors hover:text-foreground"
      >
        Muhammad Abdul Karim
      </a>
    </footer>
  );
}
