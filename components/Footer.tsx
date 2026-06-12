import { socialLinks, footer } from "@/data/portfolio";
import SocialIcon from "@/components/SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-faint">
          {footer.note} · © {footer.year}
        </p>
        <div className="flex items-center gap-1">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="rounded-md p-2 text-faint transition-colors hover:text-accent"
            >
              <SocialIcon platform={social.platform} className="h-4.5 w-4.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
