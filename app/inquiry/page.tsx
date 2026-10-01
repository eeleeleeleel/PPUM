"use client";

import { useState, type FormEvent } from "react";
import SubpageHeader from "@/components/SubpageHeader";

const fieldClass =
  "border-b border-foreground/30 bg-transparent py-2 text-base text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground";
const labelClass =
  "text-xs uppercase tracking-[0.2em] text-foreground/60";

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this up to an email service (e.g. Resend) once an API key
    // and sender domain are available — for now this just confirms locally.
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHeader title="Inquiry" />

      <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10 md:py-14">
        {submitted ? (
          <p className="text-base text-foreground">
            Thanks — your inquiry has been noted. We&apos;ll get back to you
            soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="contact">
                Contact (phone / email / Instagram)
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="date">
                Preferred date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="guests">
                Number of people
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="message">
                Details (shoot type, budget, questions)
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={fieldClass}
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-fit border border-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
