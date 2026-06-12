import { Github, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react";
import type { SocialPlatform } from "@/data/portfolio";

const icons: Record<SocialPlatform, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
};

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

export default function SocialIcon({ platform, className }: SocialIconProps) {
  const Icon = icons[platform];
  return <Icon className={className} aria-hidden="true" />;
}
