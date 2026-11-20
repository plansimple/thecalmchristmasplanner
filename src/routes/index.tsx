import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Gift,
  Heart,
  House,
  Mail,
  Maximize2,
  Printer,
  ShoppingBasket,
  Snowflake,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getChristmasCountdown, PLANNER_CHECKOUT_URL, PLANNER_PRICE } from "@/lib/planner-offer";
import plannerCover from "@/assets/calm-christmas-cover.jpg.asset.json";
import budgetPreviewImage from "@/assets/budget.webp.asset.json";
import giftListPreviewImage from "@/assets/gift-list.webp.asset.json";
import holidayMenuPreviewImage from "@/assets/holiday-menu.webp.asset.json";
import christmasTimelinePreviewImage from "@/assets/christmas-timeline.webp.asset.json";
import guestListPreviewImage from "@/assets/guest-list.webp.asset.json";
import skipListPreviewImage from "@/assets/skip-list.webp.asset.json";
import calmResetPreviewImage from "@/assets/weekly-calm-reset.webp.asset.json";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const price = money.format(PLANNER_PRICE);

const sections = [
  {
    number: "01",
    title: "Plan",
    icon: CalendarDays,
    tint: "section-sage",
    description: "Set your budget, key dates and a calm intention.",
  },
  {
    number: "02",
    title: "Gifts",
    icon: Gift,
    tint: "section-berry",
    description: "Gift lists, purchase trackers and thank-you notes.",
  },
  {
    number: "03",
    title: "Feast",
    icon: Utensils,
    tint: "section-gold",
    description: "Menu, recipes, a day-of timeline and two grocery lists.",
  },
  {
    number: "04",
    title: "Host",
    icon: House,
    tint: "section-blue",
    description: "Prep schedules, your guest list and a welcome checklist.",
  },
  {
    number: "05",
    title: "Calm",
    icon: Snowflake,
    tint: "section-lavender",
    description: "Choose what to skip, reset each week and reflect.",
  },
];

const pagePreviews = [
  {
    title: "Budget overview",
    label: "A PLAN PAGE",
    kind: "budget",
    caption: "A place for 14 spending categories and your totals.",
    icon: CalendarDays,
    image: budgetPreviewImage.url,
  },
  {
    title: "Gift list",
    label: "A GIFTS PAGE",
    kind: "gifts",
    caption: "Keep gifts, budgets and wrapping in one helpful list.",
    icon: Gift,
    image: giftListPreviewImage.url,
  },
  {
    title: "Holiday menu",
    label: "A FEAST PAGE",
    kind: "menu",
    caption: "Plan a meal you love and leave room for the rest.",
    icon: Utensils,
    image: holidayMenuPreviewImage.url,
  },
  {
    title: "Christmas Day timeline",
    label: "A FEAST PAGE",
    kind: "timeline",
    caption: "Work backwards from serving time, one calm step at a time.",
    icon: Clock3,
    image: christmasTimelinePreviewImage.url,
  },
  {
    title: "Guest list & RSVPs",
    label: "A HOST PAGE",
    kind: "guests",
    caption: "Remember who is coming, and what they are bringing.",
    icon: House,
    image: guestListPreviewImage.url,
  },
  {
    title: "Weekly Calm Reset",
    label: "A CALM PAGE",
    kind: "reset",
    caption: "Five quiet minutes to make space for what matters.",
    icon: Snowflake,
    image: calmResetPreviewImage.url,
  },
  {
    title: "What I’m skipping",
    label: "A CALM PAGE",
    kind: "skip",
    caption: "A gentle reminder that you’re allowed to do less.",
    icon: Heart,
    image: skipListPreviewImage.url,
  },
] as const;

const pages = [
  "Christmas at a Glance",
  "Budget Overview · 14 categories",
  "December Overview · Christmas Eve & Christmas Day",
  "Gift List · 2 pages",
  "Purchase Tracker · 2 pages",
  "Cards & Thank-Yous",
  "Holiday Menu Planner",
  "Recipe Cards",
  "Christmas Day Timeline",
  "Grocery List · Shop 1",
  "Grocery List · Shop 2",
  "Prep Schedule · 2 pages",
  "Guest List & RSVPs",
  "Before Guests Arrive",
  "What I’m Skipping This Year",
  "Weekly Calm Reset",
  "Christmas Reflection",
  "Notes & dot-grid page",
];

const faqItems = [
  {
    question: "Will it work on my iPad?",
    answer:
      "Yes. Import the PDF into GoodNotes or Notability to write over it. To type in the fillable fields, use an app that supports PDF forms, such as the free Adobe Acrobat Reader app.",
  },
  {
    question: "Can I print it at home?",
    answer: "Yes. Print at 100% scale on either US Letter or A4 paper.",
  },
  {
    question: "Is it dated?",
    answer:
      "Only the December calendar page uses 2026 dates. All of the other pages are undated, so you can reuse them each year.",
  },
  {
    question: "What do I receive?",
    answer:
      "An instant digital download containing two 30-page PDFs: one in US Letter and one in A4. No physical item is shipped.",
  },
  {
    question: "Do the budget totals calculate automatically?",
    answer:
      "The budget auto-sum works in Adobe Acrobat and Reader. In other apps, you can type in the totals yourself.",
  },
  {
    question: "Can I share or resell it?",
    answer:
      "The planner is for personal use. You may print as many copies as you need for your household; please don’t share or resell the file.",
  },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Christmas Budget & Hosting Planner Printable | The Calm Christmas Planner",
      },
      {
        name: "description",
        content:
          "Take the stress out of gifting, hosting and holiday spending with a thoughtful 30-page printable Christmas planner. Instant A4 and US Letter PDF download.",
      },
      {
        property: "og:title",
        content: "Christmas Budget & Hosting Planner Printable | The Calm Christmas Planner",
      },
      {
        property: "og:description",
        content:
          "A gentler Christmas starts with one calm place for your budget, gifts, menu and plans.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isOfferVisible, setIsOfferVisible] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refresh = () => setCountdown(getChristmasCountdown(new Date()));
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (typeof IntersectionObserver === "undefined") {
      const updateScrollState = () => setIsOfferVisible(window.scrollY > hero.offsetHeight);
      window.addEventListener("scroll", updateScrollState, { passive: true });
      updateScrollState();
      return () => window.removeEventListener("scroll", updateScrollState);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsOfferVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0.12 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const countdownCopy = countdown === null ? null : `${countdown} ${countdown === 1 ? "day" : "days"}`;

  return (
    <main className="overflow-x-hidden pb-24 text-ink md:pb-0">
      {countdownCopy !== null && (
        <a
          href="#offer"
          className="top-ribbon flex min-h-10 items-center justify-center gap-2 px-4 text-center text-xs font-semibold sm:text-sm"
          aria-label={`Christmas is ${countdownCopy} away. View the planner offer.`}
        >
          <Snowflake className="size-3.5 shrink-0" aria-hidden="true" />
          <span>Christmas is {countdownCopy} away. Start planning today.</span>
          <ArrowDown className="size-3.5 shrink-0" aria-hidden="true" />
        </a>
      )}

      <header ref={heroRef} className="hero-shell relative isolate overflow-hidden">
        <div className="site-width relative">
          <nav className="flex h-[72px] items-center justify-between" aria-label="Page navigation">
            <a className="brand-mark flex items-center gap-2.5" href="#top" aria-label="The Calm Christmas Planner, home">
              <span className="brand-mark-icon" aria-hidden="true">
                <Snowflake className="size-5" />
              </span>
              <span className="brand-mark-name">The Calm <span>Christmas Planner</span></span>
            </a>
            <a href="#inside" className="nav-text hidden sm:inline-flex">What’s inside <ArrowDown className="size-3.5" aria-hidden="true" /></a>
            <Button asChild variant="buy" size="sm" className="nav-buy hidden min-h-11 sm:inline-flex">
              <a
                href={PLANNER_CHECKOUT_URL}
                className="gumroad-button"
                data-gumroad-single-product="true"
                data-gumroad-overlay-checkout="true"
                aria-label={`Get the planner for ${price}`}
              >
                Get the planner <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </nav>

          <div id="top" className="hero-grid grid items-center gap-12 pb-20 pt-9 md:grid-cols-[1.08fr_.92fr] md:gap-6 md:pb-[116px] md:pt-11">
            <div className="hero-copy order-2 md:order-1">
              <div className="eyebrow"><span className="eyebrow-mark">✳</span> Printable &amp; fillable Christmas planner</div>
              <h1 className="store-heading hero-title mt-5 text-[45px] font-medium leading-[1.08] sm:text-[54px] md:text-[64px]">
                Plan Christmas <em>Without the Stress</em>
              </h1>
              <p className="hero-description mt-5 max-w-[510px]">
                The Calm Christmas Planner is a 30-page fillable and printable PDF for your budget, gifts, menu, groceries, guests and prep schedule, so you can finally enjoy your own Christmas.
              </p>

              <ul className="hero-checklist mt-6 grid gap-3" aria-label="Planner benefits">
                {[
                  "Stay on budget with a simple overview and trackers",
                  "Never buy the same gift twice",
                  "Know what to do and when, week by week",
                  "Works on iPad, GoodNotes or paper",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-[15px]">
                    <span className="checkmark"><Check className="size-3.5" aria-hidden="true" /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-buy-row mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <BuyButton className="hero-buy" text="Get the Planner" />
                <span className="price-lockup"><span>Just</span>{price}</span>
              </div>
              <p className="microcopy mt-3">Instant download <span aria-hidden="true">·</span> US Letter + A4 included <span aria-hidden="true">·</span> No subscription</p>

              <a className="hero-scroll mt-10 inline-flex items-center gap-2" href="#problem">
                A little more room to breathe <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="hero-art relative order-1 flex min-h-[350px] items-center justify-center md:order-2 md:min-h-[520px]" aria-label="A look at The Calm Christmas Planner and its printable pages">
              <div className="hero-art-halo" aria-hidden="true" />
              <div className="hero-art-note"><span className="note-star">✳</span><span>Make room for the<br /><em>good bits.</em></span></div>
              <PreviewSheet kind="budget" className="hero-sheet hero-sheet-back hero-sheet-back-left" aria-hidden />
              <PreviewSheet kind="gifts" className="hero-sheet hero-sheet-back hero-sheet-back-right" aria-hidden />
              <figure className="cover-mockup">
                <img
                  className="cover-photo"
                  src={plannerCover.url}
                  alt="The Calm Christmas Planner cover: a forest-green Christmas planner by Tom Ehigh"
                  width="760"
                  height="1075"
                  fetchPriority="high"
                />
                <figcaption className="sr-only">A preview of the real The Calm Christmas Planner cover.</figcaption>
              </figure>
              <span className="art-page-label">30 thoughtful pages <span>·</span> for a calmer December</span>
              <span className="art-stamp" aria-hidden="true"><span>made<br />for more<br /><em>peace</em></span><Sparkles className="size-4" /></span>
            </div>
          </div>
        </div>
      </header>

      <section id="problem" className="problem-band section-pad">
        <div className="content-width">
          <SectionIntro kicker="A softer kind of Christmas" title={<>Christmas shouldn’t feel like a <em>second job.</em></>}>
            Between the gifts, the food, the guests and the budget, it is easy to lose track, overspend and burn out before the day even arrives.
          </SectionIntro>

          <div className="problem-grid mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: ShoppingBasket, title: "The money worry", text: "Overspending on gifts, sales and little extras." },
              { icon: Gift, title: "The running tally", text: "Forgetting what you bought, who it’s for and what has arrived." },
              { icon: Clock3, title: "The last-minute scramble", text: "Menu, shopping and guests all needing your attention at once." },
            ].map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="problem-note motion-raise">
                <span className={`problem-icon problem-icon-${index}`}><Icon className="size-5" aria-hidden="true" /></span>
                <h3 className="store-heading mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="solution-band section-pad">
        <div className="content-width">
          <SectionIntro kicker="Five simple sections" title={<>One calm place for your <em>whole Christmas.</em></>}>
            The Calm Christmas Planner puts everything on paper in five simple sections, so it stops living in your head.
          </SectionIntro>

          <div className="section-cards mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {sections.map(({ number, title, icon: Icon, tint, description }) => (
              <article key={number} className={`chapter-card ${tint} motion-raise`}>
                <span className="chapter-number">{number}</span>
                <span className="chapter-icon"><Icon className="size-[21px]" aria-hidden="true" /></span>
                <h3 className="store-heading mt-7 text-xl font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-[1.65]">{description}</p>
                <span className="chapter-line" />
              </article>
            ))}
          </div>

          <div className="section-cta mt-10 text-center"><BuyButton text="Get the Planner" /><p className="microcopy mt-3">A calmer plan for just {price} <span aria-hidden="true">·</span> Download right away</p></div>
        </div>
      </section>

      <section id="inside" className="inside-band section-pad">
        <div className="content-width">
          <SectionIntro kicker="Thoughtfully sorted, not overstuffed" title={<>30 pages. <em>Everything you need.</em></>}>
            A real-world planner for the things you’re actually juggling, from the first budget check to the last holiday thank-you.
          </SectionIntro>

          <div className="inside-grid mt-12 grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-[72px]">
            <div className="inside-aside">
              <div className="contents-slip">
                <div className="contents-slip-top"><BookOpen className="size-[18px]" aria-hidden="true" /><span>YOUR PLANNER AT A GLANCE</span></div>
                <ol className="contents-list">
                  {sections.map(({ number, title }) => (
                    <li key={number}><span>{number}</span><span>{title}</span><span className="contents-dot" /></li>
                  ))}
                </ol>
                <p className="contents-bottom"><CheckCircle2 className="size-4" aria-hidden="true" /> Clickable contents &amp; color-coded section tabs</p>
              </div>
              <p className="inside-honesty mt-5">The month view is dated for December 2026. Everything else is undated and reusable.</p>
            </div>

            <div className="inside-pages">
              {pages.map((page, index) => (
                <div key={page} className="inside-page-row">
                  <span className={`inside-page-marker inside-marker-${index % 5}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{page}</span>
                  <Check className="inside-page-tick size-4" aria-hidden="true" />
                </div>
              ))}
              <div className="inside-footer"><span>plus useful breathing room for notes</span><span>30 pages in all</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="previews" className="gallery-band section-pad">
        <div className="content-width">
          <div className="gallery-heading flex flex-wrap items-end justify-between gap-5">
            <SectionIntro kicker="Paper, but a little more peaceful" title={<>Take a look <em>inside.</em> </>}>
              Thoughtful pages, all ready for your real plans.
            </SectionIntro>
            <span className="gallery-swipe-note"><ArrowDown className="size-4 rotate-[-90deg]" aria-hidden="true" /> Swipe to see more</span>
          </div>

          <div className="gallery-scroller mt-11 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5" aria-label="Planner page previews, horizontally scrollable">
            {pagePreviews.map((preview, index) => (
              <button
                key={preview.title}
                type="button"
                className="gallery-card group min-w-[244px] snap-start text-left sm:min-w-[286px]"
                onClick={() => setSelectedPreview(index)}
                aria-haspopup="dialog"
                aria-label={`View a larger preview of ${preview.title}`}
              >
              <span className="gallery-sheet-wrap">
                <img
                  className="gallery-sheet"
                  src={preview.image}
                  alt={`${preview.title} page from The Calm Christmas Planner. ${preview.caption}`}
                  width="643"
                  height="832"
                  loading="lazy"
                />
                <span className="gallery-zoom" aria-hidden="true"><Maximize2 className="size-4" /></span>
              </span>
                <span className="gallery-card-title mt-4 flex items-center justify-between gap-3">
                  <span className="store-heading text-[18px]">{preview.title}</span>
                  <span className="gallery-index">{String(index + 1).padStart(2, "0")}</span>
                </span>
                <span className="gallery-caption mt-1 block text-sm leading-relaxed text-muted-foreground">{preview.caption}</span>
              </button>
            ))}
          </div>

          <div className="section-cta mt-5 text-center"><BuyButton text="Get the Planner" /><p className="microcopy mt-3">Instant access to both printable sizes</p></div>
        </div>
      </section>

      <section id="how" className="how-band section-pad">
        <div className="content-width">
          <SectionIntro kicker="Print it, write in it or type" title={<>Use it <em>your way.</em></>}>
            A digital planner that fits how you already like to organize.
          </SectionIntro>

          <div className="how-grid mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: Mail, title: "TYPE", description: "Open it in Adobe Acrobat, Apple Preview or a browser and tap any line to type." },
              { icon: Heart, title: "WRITE", description: "Import it into GoodNotes or Notability and write with your Apple Pencil." },
              { icon: Printer, title: "PRINT", description: "Print on US Letter or A4 at 100% scale. The dark divider pages are optional." },
            ].map(({ icon: Icon, title, description }, index) => (
              <article key={title} className={`how-card how-card-${index}`}>
                <span className="how-number">0{index + 1} <span>·</span> HOW YOU USE IT</span>
                <span className="how-icon"><Icon className="size-[21px]" aria-hidden="true" /></span>
                <h3 className="store-heading mt-5 text-[22px] font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-[1.7]">{description}</p>
              </article>
            ))}
          </div>
          <p className="autosum-note mt-5">A small honest note: The budget auto-sum works in Adobe Acrobat and Reader. In other apps, type the totals yourself.</p>
        </div>
      </section>

      <section className="benefits-band section-pad">
        <div className="content-width">
          <SectionIntro kicker="The room to actually enjoy it" title={<>What changes when <em>you plan it?</em></>}>
            Less to carry in your head. More of your day for you.
          </SectionIntro>

          <div className="benefits-grid mt-11 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {[
              { icon: ShoppingBasket, text: "You spend what you planned to spend" },
              { icon: CheckCircle2, text: "Nothing gets forgotten or bought twice" },
              { icon: Utensils, text: "Dinner lands on the table on time" },
              { icon: Heart, text: "You get to relax on the day" },
            ].map(({ icon: Icon, text }, index) => (
              <div key={text} className="benefit-line">
                <span className={`benefit-icon benefit-icon-${index}`}><Icon className="size-5" aria-hidden="true" /></span>
                <span className="store-heading text-lg sm:text-[21px]">{text}</span>
                <span className="benefit-check"><Check className="size-4" aria-hidden="true" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="for-you" className="audience-band section-pad">
        <div className="content-width audience-layout grid items-center gap-9 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionIntro kicker="A more human December" title={<>Made for <em>real life.</em></>}>
              For anyone who could use a little more calm in the run-up to Christmas.
            </SectionIntro>
          </div>
          <div className="audience-tags flex flex-wrap gap-3">
            {["First-time hosts", "Busy parents", "Budget-conscious families", "A simpler Christmas", "iPad & GoodNotes users"].map((tag, index) => (
              <span key={tag} className={`audience-tag audience-tag-${index}`}><Sparkles className="size-3.5" aria-hidden="true" />{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="offer" className="offer-band section-pad">
        <div className="content-width">
          <div className="offer-overline"><span className="offer-star">✳</span> A gentler Christmas, all in one place</div>
          <div className="offer-card mt-6 grid gap-8 p-5 sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-11 lg:p-10">
            <div className="offer-cover-wrap flex items-center justify-center">
              <img
                className="offer-cover"
                src={plannerCover.url}
                alt="The Calm Christmas Planner forest-green printable PDF cover"
                width="760"
                height="1075"
                loading="lazy"
              />
              <span className="offer-stamp">30 PAGES<br />US LETTER + A4</span>
            </div>

            <div className="offer-details">
              <p className="offer-kicker">THE COMPLETE DIGITAL PLANNER</p>
              <h2 className="store-heading offer-title mt-2">The Calm Christmas Planner</h2>
              <p className="offer-byline">A little more room for the moments that matter.</p>
              <div className="offer-price-row mt-5"><span className="offer-price">{price}</span><span className="offer-one-time">one time · instant digital download</span></div>

              <ul className="offer-list mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "30-page fillable & printable PDF",
                  "US Letter and A4 versions",
                  "Clickable tabs and contents",
                  "Auto-sum budget in Adobe Acrobat / Reader",
                  "Instant digital download",
                  "Personal use license",
                ].map((feature) => (
                  <li key={feature}><CheckCircle2 className="size-[17px] shrink-0" aria-hidden="true" /><span>{feature}</span></li>
                ))}
              </ul>

          <Button
            asChild
            variant="buy"
            size="buy"
            className="offer-buy mt-7 flex min-h-14 w-full"
          >
          <a
                href={PLANNER_CHECKOUT_URL}
                className="gumroad-button flex w-full items-center justify-center gap-3 px-6"
                data-gumroad-overlay-checkout="true"
                aria-label={`Get the planner now for ${price}`}
              >
                Get the Planner Now <ArrowRight className="size-[18px]" aria-hidden="true" />
          </a>
          </Button>
              <p className="secure-note mt-3"><CheckCircle2 className="size-4" aria-hidden="true" /> Secure checkout with Gumroad</p>
              <p className="license-note mt-5">For personal use: print as many copies as you need for your own household. Please don’t share or resell the file.</p>
              <p className="license-note mt-3">This is an instant digital download. No physical product is shipped.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-band section-pad">
        <div className="content-width grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="faq-intro">
            <SectionIntro kicker="A few little details" title={<>A few good <em>questions.</em></>}>
              Everything you might want to know before you begin.
            </SectionIntro>
            <div className="faq-note mt-7"><Snowflake className="size-[18px]" aria-hidden="true" /><span>Need just the basics? Two PDF sizes. One simple download.</span></div>
          </div>

          <div className="faq-list">
            {faqItems.map(({ question, answer }, index) => (
              <details key={question} className="faq-item" open={index === 0}>
                <summary>
                  <span>{question}</span>
                  <ChevronDown className="faq-chevron size-4 shrink-0" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="closing" className="closing-band">
        <div className="content-width closing-layout grid items-center gap-9 py-14 md:grid-cols-[1fr_auto] md:py-[72px]">
          <div>
            <span className="closing-kicker"><Sparkles className="size-4" aria-hidden="true" /> A note for you</span>
            <h2 className="store-heading closing-title mt-4">Make this the Christmas <em>you actually enjoy.</em></h2>
            <p className="closing-copy mt-3">Start planning today.</p>
            {countdownCopy !== null && <p className="closing-countdown mt-5"><Snowflake className="size-4" aria-hidden="true" />Christmas is {countdownCopy} away</p>}
          </div>
          <div className="closing-cta flex flex-col items-start gap-3 md:items-end">
            <BuyButton text="Get the Planner" className="closing-buy" />
            <span className="closing-price">Just {price} <span>· Instant download</span></span>
          </div>
        </div>
      </section>

      <footer className="footer-band">
        <div className="content-width flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="footer-brand"><span className="footer-star" aria-hidden="true">✳</span><span>© 2026 Tom Ehigh</span></div>
          <p className="footer-digital">Instant digital download. No physical product.</p>
          <a className="footer-license" href="#offer">Personal use only</a>
        </div>
      </footer>

      {isOfferVisible && (
        <div className="mobile-offer-bar md:hidden" role="region" aria-label="Quick planner checkout">
          <div className="mobile-offer-price"><span>THE CALM CHRISTMAS PLANNER</span><strong>{price}</strong></div>
          <Button
            asChild
            variant="buy"
            size="buy"
            className="mobile-offer-buy flex min-h-[48px] min-w-40 items-center justify-center px-4"
          >
          <a
            href={PLANNER_CHECKOUT_URL}
            className="gumroad-button flex items-center justify-center gap-2"
            data-gumroad-overlay-checkout="true"
          >
            Get the Planner <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          </Button>
        </div>
      )}

      <Dialog open={selectedPreview !== null} onOpenChange={(open) => !open && setSelectedPreview(null)}>
        <DialogContent className="store-dialog-content">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="eyebrow">A closer look at the pages</p>
              <DialogTitle className="store-heading mt-2 text-2xl text-forest">
                {selectedPreview === null ? "Planner page preview" : pagePreviews[selectedPreview]?.title}
              </DialogTitle>
              <DialogDescription className="mt-2 max-w-lg text-sm leading-relaxed">
                {selectedPreview === null ? "A printable page from The Calm Christmas Planner." : pagePreviews[selectedPreview]?.caption}
              </DialogDescription>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Close page preview" className="shrink-0">
                <X className="size-5" aria-hidden="true" />
              </Button>
            </DialogClose>
          </div>
          {selectedPreview !== null && (
            <div className="dialog-page-wrap">
              <img
                className="dialog-sheet"
                src={pagePreviews[selectedPreview]?.image ?? budgetPreviewImage.url}
                alt={`${pagePreviews[selectedPreview]?.title ?? "Planner page"} from The Calm Christmas Planner`}
                width="643"
                height="832"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function SectionIntro({ kicker, title, children }: { kicker: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className="section-intro">
      <p className="section-kicker">{kicker}</p>
      <h2 className="store-heading section-title mt-3">{title}</h2>
      <p className="section-description mt-3">{children}</p>
    </div>
  );
}

function BuyButton({ text, className = "" }: { text: string; className?: string }) {
  return (
    <Button
      asChild
      variant="buy"
      size="buy"
      className={`buy-button ${className}`}
      aria-label={`${text} for ${price}`}
    >
      <a
        href={PLANNER_CHECKOUT_URL}
        className="gumroad-button"
        data-gumroad-single-product="true"
        data-gumroad-overlay-checkout="true"
      >
        <span>{text}</span><ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

function PreviewSheet({
  kind,
  className = "",
  ...props
}: {
  kind: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const activePreview = pagePreviews.find((preview) => preview.kind === kind);
  const pageTitle = activePreview?.title ?? "A little more calm";
  const sectionLabel = activePreview?.label ?? "THE CALM CHRISTMAS PLANNER";
  const categories = ["Gifts: family", "Gifts: children", "Friends & colleagues", "Food & groceries", "Decor & lights", "Wrapping & cards", "Postage & shipping", "Hosting supplies", "Travel", "Charity & giving", "Other", "Budget total"];
  const rows = ["Who for", "Gift idea", "Budget", "Notes / link", "Bought", "Wrapped"];
  const checkedText: Record<string, string[]> = {
    menu: ["A favourite main", "One easy side", "A dessert I love", "Something to sip", "A simple breakfast"],
    timeline: ["Slow morning", "Switch the oven on", "Prep the sides", "Welcome everyone", "Serve & enjoy"],
    reset: ["One thing to finish", "One thing I’ll skip", "One thing just for me", "How I’m feeling"],
    guests: ["Name", "RSVP", "Dietary needs", "Bringing", "Thank-you sent"],
    skip: ["One dessert is enough.", "A gift bag is a wrapped gift.", "Perfect is not the goal.", "Rest is part of the plan."],
  };
  const previewLines = checkedText[kind] ?? checkedText["menu"] ?? [];

  return (
    <div className={`page-preview ${className}`} {...props}>
      <div className="preview-toprule" />
      <div className="preview-inside">
        <span className="preview-section-tag"><span>{sectionLabel.split(" ")[0]}</span> · {sectionLabel.replace("A ", "")}</span>
        <h3 className="store-heading preview-heading">{pageTitle}</h3>
        <span className="preview-heading-line" />
        <p className="preview-subtitle">{activePreview?.caption ?? "A little more room for the moments that matter."}</p>

        {kind === "budget" && (
          <div className="preview-budget-table">
            <div className="preview-table-head preview-budget-columns"><span>CATEGORY</span><span>PLANNED</span><span>ACTUAL</span><span>LEFT</span></div>
            {categories.slice(0, 10).map((category, index) => (
              <div key={category} className={`preview-budget-row preview-budget-columns${index % 2 === 0 ? " row-shade" : ""}`}><span>{category}</span><span /><span /><span /></div>
            ))}
          </div>
        )}

        {kind === "gifts" && (
          <div className="preview-gift-table">
            <div className="preview-table-head preview-gift-columns">{rows.map((row) => <span key={row}>{row}</span>)}</div>
            {Array.from({ length: 7 }, (_, index) => <div key={index} className={`preview-gift-row preview-gift-columns${index % 2 === 0 ? " row-shade" : ""}`}>{rows.map((row) => row === "Bought" || row === "Wrapped" ? <span key={row} className="preview-checkbox" /> : <span key={row} />)}</div>)}
          </div>
        )}

        {(kind === "menu" || kind === "timeline" || kind === "guests" || kind === "reset" || kind === "skip") && (
          <div className={`preview-list preview-list-${kind}`}>
            {previewLines.map((item, index) => (
              <div className="preview-list-line" key={item}>
                {kind === "skip" ? <span className="preview-star">✳</span> : kind === "timeline" ? <span className="preview-time">{["9:00", "11:00", "1:00", "3:00", "4:00"][index]}</span> : <span className="preview-checkbox" />}
                <span className="preview-list-text">{item}</span>
                {(kind === "menu" || kind === "guests") && <span className="preview-fill-line" />}
              </div>
            ))}
            {kind === "menu" && <div className="preview-lines-extra">A little note for the day<br /><span /><span /></div>}
            {kind === "guests" && <div className="preview-mini-table"><span>GOOD TO KNOW</span><span /><span /></div>}
            {kind === "reset" && <div className="preview-feelings"><span>A MOMENT FOR ME</span><span>○ &nbsp; ○ &nbsp; ○ &nbsp; ○</span></div>}
            {kind === "skip" && <div className="preview-gold-quote">You are allowed<br />to do less.</div>}
          </div>
        )}

        <div className="preview-footer"><span>The Calm Christmas Planner</span><span className="preview-page-number">{kind === "gifts" ? "8" : kind === "budget" ? "5" : "26"}</span><span>Contents</span></div>
      </div>
    </div>
  );
}