# Brief — Tijuana VIP Experience page (GHL)

For handing to ChatGPT to restyle. **Read Part 4 before designing anything** — it sets
what can and cannot be built outside GoHighLevel.

Prepared 20 Oct 2026. Event is 29–31 Oct. **Nine days out.**

---

## PART 1 — Why the page cannot charge today

Audited live in the FemTech México sub-account (`tsRQhjGOE56vDB2Eoq9N`):

| Check | Result |
|---|---|
| Funnel exists | ✅ `FemTechMx TJ 2026`, url `/tj26` |
| Page count | ⚠️ **1 page**, type `optin_funnel_page` |
| Order-form step | ❌ **None.** The step has no `products` array at all |
| Products in account | ❌ **Zero.** `products: []` |
| Orders ever taken | ❌ **Zero.** `totalCount: 0` — no payment has ever run here |
| Live payment mode | ✅ `isLivePaymentMode: true`, `requireCreditCard: true` |
| Last edited | ⚠️ **22 May 2026** — five months stale |
| Email sequences | ❌ 3 campaigns, **all `draft`**, none Tijuana-related |
| VIP pass registry sheet | ❌ Created 17 Oct, **empty shell** (1 KB) |
| GDPR flag | ⚠️ `isGdprCompliant: false` |

**The blocking item is not design. It is that there is no product, no price and no
order-form step.** The page is an opt-in that collects names. Restyling it will produce
a prettier opt-in unless the commerce layer is added underneath.

### Decisions only you can make

1. **The VIP pass price.** The archived sponsor sheet carries *sponsor* tiers only —
   Aliado USD 3,500 / Aliado Global USD 7,000 / Presenta USD 14,000. There is **no
   individual VIP pass price anywhere.** Nothing can be sold until this number exists.
2. **Currency.** MXN, USD, or both. The sheet quotes MXN at 18/USD.
3. **Capacity.** Sponsor tiers have `Cupo` limits; the VIP experience has none recorded.
4. **Whether Stripe is actually connected.** Live payment mode is on, but zero orders
   have ever processed, so it has never been proven end to end. Test before launch.

---

## PART 2 — Content brief

### What this is

**Ruta FemTech 2026** — a route across Mexico (CDMX · Guadalajara · Tijuana) with a
Silicon Valley activation. The Tijuana leg is the closing chapter and the VIP experience
sits inside it.

Convened by **FemTech México™** with three allied organisations:
- Coalición Internacional de Turismo Médico
- CANACINTRA Tijuana
- Clúster de Dispositivos Médicos de Baja California

### Why Tijuana specifically

Baja California is Mexico's medical-device manufacturing centre. That is the
argument the page makes: the people who *build* women's health hardware are in this
room, alongside the clinicians, investors and policymakers who decide what gets made.
The BC panel is literally titled **"De Capacidad a Innovación"** — from capacity to
innovation. That phrase is the spine of the page.

### Confirmed anchors

- **Rosa María Castañeda** — Presidenta, Clúster de Dispositivos Médicos BC.
  Anchor manufacturing voice. Day 1 briefing + lunch; Day 2 BC Panel; Day 3 breakfast
  + institutional panel. *Confirmed.*
- **Mariana Montalvo** — CANACINTRA. Day 2 BC Panel. *Confirmed.*
- **Mayra Hurtado** — Co-Founder & Director, FemTech México. Day 2 keynote;
  Day 3 opening + moderator, "México en el Mapa Global". *Confirmed.*

### The three-day shape

- **Day 1** — private briefing + lunch with the BC cluster
- **Day 2** — keynote + BC panel "De Capacidad a Innovación"
- **Day 3** — institutional breakfast + opening panel "México en el Mapa Global"
- **Cena VIP de inversionistas** — the anchor dinner. *See date rule below.*

### Section-by-section

1. **Hero** — Ruta FemTech 2026, Tijuana. Dates. One sentence on what the VIP pass is.
   Single CTA.
2. **Why Tijuana** — the manufacturing argument, three or four sentences. This is the
   persuasive heart; give it room.
3. **What the VIP pass includes** — itemised. *Content pending your decision.*
4. **The three days** — a timeline, not a wall of text.
5. **Who is in the room** — speaker cards with photo, name, role, organisation.
6. **The allies** — four logos (FemTech México + three organisations).
7. **Capacity / scarcity** — only if a real number exists. Do not invent one.
8. **Checkout** — native GHL. See Part 4.
9. **FAQ** — travel, hotel, language, what is and is not included.

### Copy rules — non-negotiable

- **Spanish first, English second.** The audience is Mexican institutional. If bilingual,
  Spanish leads.
- **Affirmative only.** Say what the event *is*. No "but", no negative framing, no
  "unlike other events". The house rule is "yes, and".
- **No invented numbers.** No attendee counts, no "limited to X" unless confirmed.
- **Date rule:** on the **paid page and in paid emails**, the Xesco Espar session carries
  **"(fecha por confirmar)"**. He is kept out of free/public invitations for the 30th.
  Apply this verbatim; do not resolve it to a firm date.
- Several venues are still **"por confirmar"** in the source. Where a venue is
  unconfirmed, the page says so rather than guessing.

---

## PART 3 — Design spec (match the existing site)

North Star: **"The Neon Foundry."** Hardcoded hex, no CSS variables.

| Role | Hex |
|---|---|
| Base / background | `#280B2E` midnight |
| Paper / light surface | `#EAE4DC` sand |
| Primary accent | `#FF2FA3` magenta |
| Secondary | `#8830FF` lavender |
| Tertiary | `#2DE89A` teal |
| **Ruta accent** | **`#F0A500` amber** |

**The amber is scoped to Chihuahua and Ruta only.** This page is Ruta, so amber is
licensed here — but it stays an accent, not a third primary. Magenta remains the CTA.

**Type**
- Display: **Agrandir**
- Eyebrows / labels: **IBM Plex Mono**, uppercase, letter-spaced
- Editorial / pull quotes: **Cormorant**

**Form**
- Corners near-square, **≤ 4px**. No pill buttons, no large radii.
- Flat surfaces. The one permitted glow is on the magenta CTA.
- Mexican institutional audience — restraint reads as credibility.

---

## PART 4 — Execution constraints (read this first)

**GoHighLevel pages cannot be replaced by an uploaded HTML file.** The builder stores
its own JSON structure. There is no import path for a hand-built page.

What this means for the hand-off:

**✅ ChatGPT should produce:** one self-contained HTML block — inline `<style>`, no
external CSS, no build step, no frameworks, no external JS. It goes into a **Custom Code
/ HTML element** on the GHL page. Images referenced by absolute URL.

**❌ ChatGPT must NOT build:** the checkout. No payment form, no card fields, no
"Pay now" form that posts anywhere.

**Why that matters:** a hand-coded checkout will not charge anyone. Payment only works
through GHL's **native order-form element** bound to a GHL product and price. If the
designed page includes its own checkout, it will look like it works and take no money.

**So the page is two layers:**
1. Marketing content — ChatGPT's HTML in a custom-code block
2. Order form — native GHL element directly beneath it, styled with the same palette
   using GHL's own element styling

**Also give ChatGPT:**
- Mobile-first. Most of this traffic is phones.
- Target ~400px width up to desktop; no horizontal scroll.
- Keep the DOM shallow. GHL's builder wraps custom code in its own containers and deep
  nesting fights the wrapper.
- No `position: fixed` headers — they collide with GHL's chat widget and cookie banner.

---

## Sequence to actually go live

1. **Set the VIP price** ← blocking, yours
2. Create the product + price in GHL Payments
3. Confirm Stripe is connected and run one real test charge, then refund it
4. Add an order-form step to the `/tj26` funnel
5. Drop ChatGPT's HTML into the content page
6. Attach the product to the order-form step
7. Build the confirmation email — none exists today, all campaigns are draft
8. Test the full path on a phone, end to end, with a real card
9. Publish

Steps 2, 4, 6 I can do by API. Step 1 is yours. Steps 3 and 8 need a real card.

**Nine days.** Step 1 is what everything else waits on.
