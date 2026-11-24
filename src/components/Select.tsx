"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "./ui";

export type SelectOption = { value: string; label: string };

/**
 * A dropdown drawn in the site's own style, replacing the browser's default
 * list. It follows the listbox pattern: arrow keys move, Enter or Space
 * chooses, Escape closes, and typing jumps to a matching option.
 */
export function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  tone = "light",
  invalid = false,
  describedBy,
  className,
}: {
  id: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  tone?: "light" | "dark";
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [dropUp, setDropUp] = useState(false);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const dark = tone === "dark";

  function openList() {
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setDropUp(below < 320 && rect.top > below);
    }
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!list || !item) return;
    // Scroll inside the list only, never the page.
    if (item.offsetTop < list.scrollTop) list.scrollTop = item.offsetTop;
    else if (item.offsetTop + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = item.offsetTop + item.offsetHeight - list.clientHeight;
    }
  }, [open, active]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else setActive((index) => Math.min(last, index + 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList();
        else setActive((index) => Math.max(0, index - 1));
        return;
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        return;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(last);
        }
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(active);
        else openList();
        return;
      case "Escape":
        if (open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
        }
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        if (event.key.length === 1 && /\S/.test(event.key)) {
          const fresh = event.timeStamp - typed.current.at > 700;
          const text = (fresh ? "" : typed.current.text) + event.key.toLowerCase();
          typed.current = { text, at: event.timeStamp };
          const match = options.findIndex((option) => option.label.toLowerCase().startsWith(text));
          if (match >= 0) {
            if (open) setActive(match);
            else onChange(options[match].value);
          }
        }
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
        }}
        className={cn(
          "flex w-full items-center justify-between gap-3 border-0 border-b bg-transparent px-0 py-2.5 text-left text-[15px] transition-colors focus:outline-none",
          dark
            ? "border-paper/25 text-paper focus-visible:border-paper"
            : "border-rule text-ink focus-visible:border-ink",
          open && (dark ? "border-paper" : "border-ink"),
          invalid && "border-danger",
        )}
      >
        <span className={cn("truncate", !selected && (dark ? "text-paper/40" : "text-stone/70"))}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          aria-hidden
          width="12"
          height="7"
          viewBox="0 0 12 7"
          className={cn("shrink-0 transition-transform duration-300", open && "rotate-180")}
        >
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className={cn(
            "select-panel scroll-thin absolute inset-x-0 z-30 max-h-72 overflow-y-auto border py-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]",
            dropUp ? "bottom-full mb-2" : "top-full mt-2",
            dark ? "border-paper/15 bg-[#141414]" : "border-rule bg-white",
          )}
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;
            const isActive = index === active;
            return (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 text-sm transition-colors",
                  dark ? "text-paper/70" : "text-graphite",
                  isActive && (dark ? "bg-paper/10 text-paper" : "bg-mist text-ink"),
                  isSelected && (dark ? "font-semibold text-paper" : "font-semibold text-ink"),
                )}
              >
                <span>{option.label}</span>
                {isSelected ? (
                  <svg aria-hidden width="12" height="9" viewBox="0 0 12 9" className="shrink-0">
                    <path d="M1 4.5l3.5 3.5L11 1" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
