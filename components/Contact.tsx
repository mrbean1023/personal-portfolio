"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { contact } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  /** Honeypot — must stay empty; bots fill it in */
  company: string;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

const inputClasses =
  "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionHeading index="04" title={contact.heading} />

      <div className="grid gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {contact.blurb}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-6 inline-block lowercase text-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-foreground"
            >
              {contact.email}
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="space-y-7">
            {/* Honeypot field — hidden from humans, catches naive bots */}
            <div
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              aria-hidden="true"
            >
              <label>
                Company
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </label>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block lowercase text-xs text-faint"
                >
                  name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="ada lovelace"
                  aria-invalid={Boolean(errors.name)}
                  className={inputClasses}
                  {...register("name", {
                    required: "Please tell me your name.",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters.",
                    },
                    maxLength: {
                      value: 100,
                      message: "Name must be under 100 characters.",
                    },
                  })}
                />
                {errors.name && (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block lowercase text-xs text-faint"
                >
                  email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="ada@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className={inputClasses}
                  {...register("email", {
                    required: "An email is required so I can reply.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                      message: "That doesn't look like a valid email.",
                    },
                  })}
                />
                {errors.email && (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1 block lowercase text-xs text-faint"
              >
                message *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="tell me about your project, role or idea…"
                aria-invalid={Boolean(errors.message)}
                className={`${inputClasses} resize-y`}
                {...register("message", {
                  required: "A message is required.",
                  minLength: {
                    value: 20,
                    message: "Give me a little more detail (20+ characters).",
                  },
                  maxLength: {
                    value: 5000,
                    message: "Message must be under 5,000 characters.",
                  },
                })}
              />
              {errors.message && (
                <p role="alert" className="mt-1.5 text-xs text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 border border-accent px-6 py-2.5 lowercase text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    sending…
                  </>
                ) : (
                  <>
                    send message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-1.5 text-sm text-emerald-400"
                  role="status"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  message sent — thanks! i&apos;ll be in touch soon.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-1.5 text-sm text-red-400"
                  role="alert"
                >
                  <TriangleAlert className="h-4 w-4" />
                  something went wrong — please email me directly instead.
                </motion.p>
              )}
            </div>
          </form>
        </Reveal>
      </div>

      <FAQ />
    </section>
  );
}
