"use client";

import { useCallback, useState, type FormEvent } from "react";
import SubpageHeader from "@/components/SubpageHeader";
import MenuViewer from "@/components/MenuViewer";

const fieldClass =
  "border-b border-foreground/30 bg-transparent py-2 text-base text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground";
const labelClass =
  "text-[13px] sm:text-[15px] font-medium tracking-wide text-foreground";
const optionClass =
  "flex items-center gap-2 text-base text-foreground cursor-pointer";
const errorFieldClass = "border-red-600 focus:border-red-600";

const REQUIRED_FIELDS = ["name", "contact", "date", "guests", "drinkOrder"];

function FieldError({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="text-xs text-red-600">필수 사항입니다.</p>;
}

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [drinkOrder, setDrinkOrder] = useState<"yes" | "no" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const required =
      data.get("drinkOrder") === "yes"
        ? [...REQUIRED_FIELDS, "drinkTime"]
        : REQUIRED_FIELDS;
    const missing = required.filter(
      (field) => !String(data.get(field) ?? "").trim(),
    );
    if (missing.length > 0) {
      setErrors(new Set(missing));
      const first = e.currentTarget.elements.namedItem(missing[0]);
      const el = first instanceof RadioNodeList ? first[0] : first;
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus({ preventScroll: true });
      }
      return;
    }

    setSending(true);
    setSendFailed(false);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSendFailed(true);
    } finally {
      setSending(false);
    }
  }

  function clearError(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name;
    if (!errors.has(name)) return;
    const next = new Set(errors);
    next.delete(name);
    setErrors(next);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHeader />

      <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10 md:py-14">
        <h1 className="mb-10 text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] text-foreground">
          Inquiry
        </h1>
        {submitted ? (
          <p className="text-base text-foreground">
            문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            onChange={clearError}
            noValidate
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="name">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`${fieldClass} ${errors.has("name") ? errorFieldClass : ""}`}
              />
              <FieldError show={errors.has("name")} />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="contact">
                연락처 (전화번호 / 이메일 / 인스타그램)
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                className={`${fieldClass} ${errors.has("contact") ? errorFieldClass : ""}`}
              />
              <FieldError show={errors.has("contact")} />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="date">
                희망 날짜
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className={`${fieldClass} ${errors.has("date") ? errorFieldClass : ""}`}
              />
              <FieldError show={errors.has("date")} />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="guests">
                인원
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                className={`${fieldClass} ${errors.has("guests") ? errorFieldClass : ""}`}
              />
              <FieldError show={errors.has("guests")} />
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className={`${labelClass} mb-3`}>음료 주문</legend>
              <div className="flex items-center gap-6">
                <label className={optionClass}>
                  <input
                    type="radio"
                    name="drinkOrder"
                    value="yes"
                    checked={drinkOrder === "yes"}
                    onChange={() => setDrinkOrder("yes")}
                    className="accent-foreground"
                  />
                  O
                </label>
                <label className={optionClass}>
                  <input
                    type="radio"
                    name="drinkOrder"
                    value="no"
                    checked={drinkOrder === "no"}
                    onChange={() => setDrinkOrder("no")}
                    className="accent-foreground"
                  />
                  X
                </label>
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="ml-2 text-[11px] font-normal text-foreground/80 underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  메뉴 보기 →
                </button>
              </div>
              <FieldError show={errors.has("drinkOrder")} />

              {drinkOrder === "yes" && (
                <div className="mt-2 flex flex-col gap-3">
                  <span className={labelClass}>희망 수령 시간</span>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {["오전 촬영 시작 시", "점심", "둘 다"].map((time) => (
                      <label key={time} className={optionClass}>
                        <input
                          type="radio"
                          name="drinkTime"
                          value={time}
                          className="accent-foreground"
                        />
                        {time}
                      </label>
                    ))}
                  </div>
                  <FieldError show={errors.has("drinkTime")} />
                </div>
              )}

              <p className="text-xs leading-relaxed text-foreground/60">
                음료 준비를 위해 직원이 따로 출근합니다.{" "}
                {/* Mobile: one sentence per line instead of a mid-sentence wrap. */}
                <br className="sm:hidden" />
                촬영팀 전체 주문을 모아서 한 번에 알려주세요.
                <br />
                주문 취소는 촬영 전날까지 가능합니다. (당일 취소 불가)
              </p>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="message">
                촬영 정보 (촬영 종류, 이용 시간, 궁금한 점)
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={fieldClass}
              />
            </div>

            {sendFailed && (
              <p className="text-sm text-red-600">
                전송에 실패했습니다. 잠시 후 다시 시도하거나 인스타그램 DM으로
                문의해 주세요.
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-4 w-full bg-foreground py-4 text-sm font-semibold tracking-[0.2em] text-background transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {sending ? "보내는 중…" : "문의 보내기"}
            </button>
          </form>
        )}
      </main>

      {menuOpen && <MenuViewer onClose={closeMenu} />}
    </div>
  );
}
