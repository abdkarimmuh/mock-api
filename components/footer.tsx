export function Footer() {
  const profileUrl = process.env.PROFILE_URL;

  return (
    <footer className="border-t border-black/[.08] py-6 text-center text-sm text-zinc-500 dark:border-white/[.145] dark:text-zinc-400">
      © {new Date().getFullYear()} created by{" "}
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        Muhammad Abdul Karim
      </a>
    </footer>
  );
}
