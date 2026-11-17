"use client";

import Link from "next/link";

const CREAM = "#F8F5EE";
const BLACK = "#000000";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const menuItems = [
  { label: "Space", href: "/space" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "Inquiry", href: "/inquiry" },
  { label: "Info", href: "/info" },
];

// Slide-in site menu shared by the home hero and the subpage header.
export default function MenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity 500ms ${EASE}`,
        }}
        onClick={onClose}
      />

      <nav
        className="fixed inset-y-0 left-0 z-50 flex w-[75vw] max-w-[360px] flex-col gap-6 px-8 pt-8"
        style={{
          backgroundColor: CREAM,
          transform: `translateX(${open ? "0" : "-100%"})`,
          transition: `transform 600ms ${EASE}`,
        }}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="mb-6 w-fit text-2xl"
          style={{ color: BLACK }}
        >
          ×
        </button>

        {menuItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`text-lg font-semibold uppercase tracking-[0.12em] ${
              index === 2 ? "mt-6" : ""
            }`}
            style={{ color: BLACK }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
