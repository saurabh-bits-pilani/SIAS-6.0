import { Link } from 'react-router-dom';
import {
  IconSparkles,
  IconStar,
  IconHome,
  IconCrown,
  IconClock,
  IconLeaf,
  IconHeartHandshake,
  IconUserCircle,
  IconBook,
  IconMoon,
  IconMoonStars,
  IconDroplet,
  IconDiamond,
  IconHeart,
  IconCalendar,
  IconGift,
  IconYoga,
  IconArrowRight,
} from '@tabler/icons-react';
import PlanetPageLayout, {
  CredentialBadge,
  HouseCard,
  Mark,
  RemedyCard,
  SectionDivider,
} from '../../components/planets/PlanetPageLayout';
import moonData from '../../data/planets/moon';

const STAR_ACCENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/star-accent.svg';
const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const DOODLE_MOON_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Moon/doodle-moon.webp';
const DOODLE_LION_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/doodle-lion.png';

function MoonSEOBody() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundColor: '#F3F7FB',
        backgroundImage: `url(${PARCHMENT_URL})`,
        backgroundSize: '800px',
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(243, 247, 251, 0.92)' }}
        aria-hidden="true"
      />

      {/* Margin doodles (desktop only) */}
      <img
        src={DOODLE_MOON_URL}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-[22%] right-4 w-28 h-28 opacity-10 pointer-events-none"
      />
      <img
        src={DOODLE_LION_URL}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-[48%] left-4 w-28 h-28 opacity-10 pointer-events-none"
      />
      <img
        src={DOODLE_MOON_URL}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-[70%] right-4 w-32 h-32 opacity-10 pointer-events-none"
      />
      <img
        src={STAR_ACCENT_URL}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-[85%] left-6 w-16 h-16 opacity-15 pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-0 font-inter text-gray-800">
        {/* ── Section 1 ─────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-3">
          <IconSparkles
            size={40}
            className="text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
            Chandra <span className="font-devanagari text-4xl md:text-5xl">(चन्द्र)</span>: The Luminous Mind
          </h2>
        </div>
        <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-8" />

        <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
          In the Vedic tradition, Chandra is not merely a celestial body reflecting
          sunlight. He is the <Mark>karaka of manas</Mark>, the governing energy of the
          mind itself. The Brihat Parashara Hora Shastra places the Moon second in
          seniority only to the Sun, and classical texts treat him as the pivot of
          emotional life, memory, and the quality of the mother bond in a birth chart.
        </p>

        <div
          className="my-6 inline-flex items-center gap-3 px-4 py-2 rounded-lg shadow-sm ring-1 ring-blue-700/20"
          style={{
            backgroundImage: `url(${PARCHMENT_URL})`,
            backgroundSize: 'cover',
            backgroundColor: '#fdf6e3',
          }}
        >
          <IconBook size={20} className="text-blue-800" aria-hidden="true" />
          <span className="font-caveat text-xl text-blue-900">
            Brihat Parashara Hora Shastra
          </span>
        </div>

        <p className="text-lg leading-relaxed mb-6">
          Mythology gives Chandra two parallel origins. In one tradition he is the son
          of the sage <Mark>Atri</Mark> and his wife Anasuya, born from the tapas of
          their meditation. In another, beloved lineage, he emerges from the churning
          of the ocean of milk alongside Lakshmi and amrita, a luminous orb of nectar
          drawn out by gods and asuras together. The Puranas layer these stories
          rather than choose between them, which is fitting for a planet that governs
          a mind made of layers.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          A classical Vedic declaration captures his role:
        </p>

        <blockquote className="my-10 mx-auto max-w-2xl border-l-4 border-blue-500 pl-8 pr-6 py-6 bg-blue-50/70 rounded-r-xl shadow-sm">
          <p className="font-devanagari text-2xl md:text-3xl text-blue-900 mb-3">
            चन्द्रमा मनसो जातः ।
          </p>
          <p className="font-kalam text-xl md:text-2xl italic text-gray-800 mb-2">
            Candramā manaso jātaḥ |
          </p>
          <p className="font-poppins text-base text-gray-600">
            The Moon is born from the mind.
          </p>
          <cite className="block mt-3 text-sm text-blue-700 font-semibold uppercase tracking-wide not-italic">
            Purusha Sukta, Rigveda 10.90
          </cite>
        </blockquote>

        <p className="text-lg leading-relaxed mb-6">
          This line from the Purusha Sukta reverses what most people assume: the mind
          is not a product of the body, but the reflective field from which the
          luminous Chandra in the sky itself arose. At Soul Infinity, every Chandra
          reading begins from this premise, because the planet measured in a chart is
          also the way a client meets their own thoughts, moods, and memory. This
          framing matters in practice, because it shifts the conversation away from
          fixing the mind and toward befriending it, a quietly revolutionary stance
          that the classical tradition has held for millennia.
        </p>

        <SectionDivider starUrl={STAR_ACCENT_URL} />

        {/* ── Section 2 ─────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-3">
          <IconStar
            size={40}
            className="text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
            Significations of the Moon in a Birth Chart
          </h2>
        </div>
        <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-8" />

        <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
          The Moon represents the <Mark>mother</Mark>, the home of childhood, and the
          quality of nurturing a person received and will give. Karaka for the fourth
          house, Chandra shapes comfort, domestic peace, and the felt sense of
          belonging. A dignified placement often tracks with a warm relationship with
          the mother, a mind that recovers quickly from strain, and a natural ease
          with family life.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          In the body, Chandra governs the fluids, the lymph, hydration, and the left
          eye in men (right eye in women). It also holds strong connection with the
          stomach, the breasts in a female chart, and the general quality of sleep.
          When a client reports restless nights, cyclical mood waves, or a sense of
          emotional depletion, the astrologer almost always begins by reading the
          natal Moon, its dasha, and its present transits.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Beyond the personal, the Moon is karaka of the public. Politicians,
          performers, caregivers, hospitality workers, and anyone whose livelihood
          depends on reading a room share a common thread of Chandra energy in the
          chart. A strong Moon in angular houses or in aspect to the tenth can give a
          natural ability to hold attention without demanding it, because the mind
          rests easily in the field of others.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Vedic vocabulary calls the Moon{' '}
          <span className="font-devanagari text-xl">मनस्कारक</span> (manaskāraka), the
          significator of manas. Manas is the subtle instrument that receives
          sensation, colours it with <Mark>emotion</Mark>, and stores the trace as
          memory. This is why the Moon is so closely linked to imagination and dream,
          which are nothing other than the mind’s free play in the absence of outer
          input.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Classical texts also associate a weak or afflicted lunar position with
          anxiety, mood instability, difficulty sleeping, and a tendency to hold onto
          old grief. A dignified Moon supports compassion, receptivity, and the
          ability to imagine a future beyond the facts of the present moment.
        </p>

        <SectionDivider starUrl={STAR_ACCENT_URL} />

        {/* ── Section 3: 12 Houses grid ───────────────────────────── */}
        <div className="flex items-center gap-4 mb-3">
          <IconHome
            size={40}
            className="text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
            Moon in the 12 Houses
          </h2>
        </div>
        <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-8" />

        <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
          A brief house-by-house overview of Chandra’s classical themes. Each
          placement is modulated by sign, paksha (waxing or waning), aspect, and
          dasha, so these lines are a starting point rather than a verdict.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-8">
          <HouseCard
            number="1st"
            name="First house"
            text="Emotional sensitivity as a visible trait, nurturing presence, mind at the front of identity."
          />
          <HouseCard
            number="2nd"
            name="Second house"
            text="Deep attachment to family, heirlooms, and early home; comforting voice and speech."
          />
          <HouseCard
            number="3rd"
            name="Third house"
            text="Imagination powering communication, fluctuating courage, creative siblings."
          />
          <HouseCard
            number="4th"
            name="Fourth house"
            text="Digbala placement. Emotional peace at home, strong mother bond, deep sense of belonging."
          />
          <HouseCard
            number="5th"
            name="Fifth house"
            text="Creative intelligence, poetic sensibility, strong first-born bond, artistic children."
          />
          <HouseCard
            number="6th"
            name="Sixth house"
            text="Emotional wear from service, possible fluid or digestive sensitivities, healing vocation."
          />
          <HouseCard
            number="7th"
            name="Seventh house"
            text="Partner embodies care and reflection, emotional reciprocity shapes the marriage."
          />
          <HouseCard
            number="8th"
            name="Eighth house"
            text="Deep psychic sensitivity, mother-related karmic themes, interest in the occult and dreams."
          />
          <HouseCard
            number="9th"
            name="Ninth house"
            text="Devotion through feeling, spiritual travel, dharma arrived at through intuition more than logic."
          />
          <HouseCard
            number="10th"
            name="Tenth house"
            text="Public profile through nurturing roles: food, hospitality, care, media, or communication."
          />
          <HouseCard
            number="11th"
            name="Eleventh house"
            text="Emotional satisfaction through friendships and networks, gains through women and mentors."
          />
          <HouseCard
            number="12th"
            name="Twelfth house"
            text="Retreat into inner life, foreign residence, spiritual introversion, rich dream landscape."
          />
        </div>

        <SectionDivider starUrl={STAR_ACCENT_URL} />

        {/* ── Section 4 ───────────────────────────── */}
        <div className="flex items-center gap-4 mb-3">
          <IconCrown
            size={40}
            className="text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
            Moon’s Dignities and Relationships
          </h2>
        </div>
        <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-8" />

        <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
          Chandra is exalted in <Mark>Taurus</Mark>, with peak exaltation at 3
          degrees, and he continues in Mooltrikona in Taurus from 3 to 30 degrees.
          Cancer is his own sign. The debilitation sign is <Mark>Scorpio</Mark>, with
          deepest debilitation at 3 degrees of Scorpio. A rare feature of Chandra in
          the Parashari scheme is that he has no declared enemies, only friends and
          neutrals, which makes the Moon the most universally well-disposed planet in
          the natural pantheon.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          The classical friend list for Chandra includes the Sun and Mercury. The
          other five grahas, Mars, Jupiter, Venus, and Saturn, are treated as neutral
          in most Parashari tables, and even the nodes do not colour the Moon with
          unqualified hostility. The astrological implication is practical: almost
          any chart can receive support through the Moon, which is one reason
          Chandra-based practices appear so widely in Vedic remedy tradition.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Beyond simple dignity, Chandra carries a unique consideration called
          paksha bala. A waxing luminary, strengthening in the bright half between
          new and full, brings different results than a waning one in the dark half.
          Saurabh always notes paksha before assigning final strength, because a
          technically well-placed Chandra in Krishna paksha can still feel drained,
          and a less dignified Chandra in Shukla paksha near a full moon can act
          with surprising resilience. A practical corollary: when a client’s chart
          shows a waning luminary in a difficult house, Saurabh will often align
          remedy practices to the waxing fortnight so that each cycle of effort
          lands on a rising tide of subtle support rather than working against it.
        </p>

        <SectionDivider starUrl={STAR_ACCENT_URL} />

        {/* ── Section 5 ───────────────────────────── */}
        <div className="flex items-center gap-4 mb-3">
          <IconClock
            size={40}
            className="text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
            <Mark>Chandra Mahadasha</Mark>: The <Mark>Ten-Year</Mark> Period
          </h2>
        </div>
        <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-8" />

        <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
          In the Vimshottari Dasha system, Chandra Mahadasha runs for ten years. The
          themes that rise during this period often relate to home, family, public
          favour, comfort, and emotional cycles. Saurabh observes clients frequently
          experiencing life events tied to motherhood, mothering, marriage
          negotiations, moves into or out of the childhood home, and a noticeable
          shift in mental tone.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Outcomes depend entirely on the natal Moon’s placement. A Moon exalted in
          Taurus, placed in an angular house, or strongly supported by Jupiter can
          bring a decade of nurturing relationships, public goodwill, steady income
          through food, media, or care work, and emotional maturation. A Moon
          debilitated in Scorpio, aspected by Saturn or Rahu, may surface anxiety
          themes, disturbed sleep, or unsettled domestic circumstances that call for
          slower rhythms and stronger boundaries.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Because the Moon governs fluids and the subtle mental current, Mahadasha
          outcomes often manifest as health themes alongside circumstantial ones.
          Saurabh therefore recommends a gentle baseline of sleep, hydration, and
          tranquil environments at the start of Chandra dasha, not as medical advice
          but as the classical lifestyle support that helps a ten-year cycle unfold
          without unnecessary turbulence.
        </p>

        <SectionDivider starUrl={STAR_ACCENT_URL} />

        {/* ── Section 6: Remedies grid ──────────────────────── */}
        <div className="flex items-center gap-4 mb-3">
          <IconLeaf
            size={40}
            className="text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
            Traditional Remedies for a Weak or Afflicted Moon
          </h2>
        </div>
        <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-8" />

        <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
          Classical remedies for Chandra are grounded in mantra, lifestyle, and small
          charitable acts. They can support a Moon that is dignified but weak, and
          they work best when practised consistently over a dasha-appropriate window.
          None of them carry medical or psychological guarantees and should be
          adopted as steady disciplines rather than quick fixes.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-10">
          <RemedyCard
            icon={<IconMoon size={24} className="text-blue-700" />}
            title={<>Monday Night Mantra</>}
            text={
              <>
                <Mark>Chant Chandra mantras on Monday nights</Mark> under moonlight,
                ideally near a window or outdoors.
              </>
            }
          />
          <RemedyCard
            icon={<IconDroplet size={24} className="text-blue-700" />}
            title={<>Offer Water or Milk</>}
            text={
              <>
                Offer water or milk to the Moon on Purnima (full moon) nights in a
                silver or white vessel.
              </>
            }
          />
          <RemedyCard
            icon={<IconDiamond size={24} className="text-blue-700" />}
            title={<>Wear Pearl</>}
            text={
              <>
                Wear Pearl (Moti) set in silver on the little finger of the right
                hand, only after <Mark>astrological verification</Mark>.
              </>
            }
          />
          <RemedyCard
            icon={<IconCalendar size={24} className="text-blue-700" />}
            title={<>Monday Fasts</>}
            text={
              <>
                Observe Monday fasts with light vegetarian food, broken before
                sunset with white or milk-based nourishment.
              </>
            }
          />
          <RemedyCard
            icon={<IconHeart size={24} className="text-blue-700" />}
            title={<>Honour the Mother</>}
            text={
              <>
                Honour the mother and maternal figures with gratitude, and where
                possible, regular contact and care.
              </>
            }
          />
          <RemedyCard
            icon={<IconGift size={24} className="text-blue-700" />}
            title={<>Donate White Items</>}
            text={
              <>
                Donate rice, milk, or silver on Mondays, traditionally before noon
                and with a quiet mind.
              </>
            }
          />
          <RemedyCard
            icon={<IconYoga size={24} className="text-blue-700" />}
            title={<>Moonlight Time</>}
            text={
              <>
                Spend unhurried time in moonlight and near water bodies, especially
                during the waxing fortnight.
              </>
            }
          />
        </div>

        <p className="text-lg leading-relaxed mb-6">
          As with every gemstone recommendation in classical Vedic practice, Pearl
          should be worn only after a qualified astrologer has reviewed the chart in
          full. Pearl suits a Moon that is functionally benefic but weak in Shadbala.
          It can amplify difficulties when the Moon is deeply afflicted, and for
          that reason Soul Infinity never advises Pearl wearing without prior
          consultation.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Mantra remains the most universally safe remedy. The two mantras earlier
          in this page, the Navagraha Stotra verse and the short beej mantra, are
          the classical entry points. A simple starting cadence is 108 repetitions
          on Monday evenings for at least 40 consecutive weeks, practised with
          steady breath rather than speed.
        </p>

        <SectionDivider starUrl={STAR_ACCENT_URL} />

        {/* ── Section 7 ───────────────────────────── */}
        <div className="flex items-center gap-4 mb-3">
          <IconHeartHandshake
            size={40}
            className="text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
            Chandra in Modern Life
          </h2>
        </div>
        <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-8" />

        <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
          The ancient symbolism of Chandra translates directly into contemporary
          themes of <Mark>mental health</Mark>, emotional wellbeing, sleep hygiene,
          and creative imagination. In a culture saturated with stimuli, a healthy
          lunar principle is the ability to return to an inner centre and let the
          mind rest there without apology.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Modern clients often come to Soul Infinity asking about anxiety, burnout,
          and the difficulty of being present with family while holding demanding
          careers. These are textbook Chandra questions. The answers almost always
          involve slowing the intake of information, protecting sleep and nutrition,
          tending to relationships with maternal figures, and making room for play
          and imagination in the week.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Practical modern expressions of Chandra sadhana include silent walks in
          moonlight, a consistent sleep window, mindful moments with water during
          the day, and time spent creating something without any goal. None of this
          is esoteric. It is simply the ancient wisdom applied to a twenty-first
          century nervous system.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          A useful reframe for secular-minded readers: modern psychology talks about
          emotional regulation and the window of tolerance, both of which map
          cleanly onto a well-supported luminary in a chart. When the lunar field is
          steady, the mind tolerates stress; when the field is frayed, even small
          triggers overwhelm. The Vedic remedies named above quietly widen that
          window, not by force but by restoring rhythm, which is always what a
          stressed nervous system is quietly asking for beneath the noise of its
          louder complaints. Saurabh often frames this to clients as the difference
          between a cup of water and a cup of water with a thin film of oil on top.
          The volume looks the same, but one drinks cleanly and one does not.
        </p>

        <SectionDivider starUrl={STAR_ACCENT_URL} />

        {/* ── Section 8: Saurabh Jain card ──────────── */}
        <div className="my-8 rounded-2xl border border-blue-300 bg-gradient-to-br from-blue-50 to-sky-50 p-8 md:p-10 shadow-lg">
          <div className="flex items-center gap-4 mb-5">
            <IconUserCircle
              size={40}
              className="text-blue-500 flex-shrink-0"
              aria-hidden="true"
            />
            <h2 className="font-caveat text-5xl md:text-6xl text-blue-800 leading-none">
              How Saurabh Jain Reads Chandra in Your Chart
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent mb-6" />

          <div className="flex flex-wrap gap-2 mb-6">
            <CredentialBadge>M.Tech</CredentialBadge>
            <CredentialBadge>MBA</CredentialBadge>
            <CredentialBadge>M.Phil</CredentialBadge>
            <CredentialBadge>K.N. Rao Institute trained</CredentialBadge>
          </div>

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-700 first-letter:leading-none">
            Saurabh Jain brings a multi-system approach to lunar analysis. Trained
            at the <Mark>K.N. Rao Institute</Mark> and holding an M.Tech, MBA, and
            M.Phil, he combines classical <Mark>Parashari Jyotish</Mark> with{' '}
            <Mark>BNN</Mark> and <Mark>KP</Mark> Astrology to triangulate the Moon’s
            role in a chart. This layered method surfaces patterns that a
            single-system reading can miss, from dasha-timed emotional cycles to
            subtle indicators of sleep and hydration.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            A personalised Chandra analysis includes a review of house and sign
            placement, paksha bala, nakshatra lord behaviour, and the classical
            timing tools that indicate when the lunar promise is set to activate.
            Clients leave with concrete lifestyle guidance, a mantra cadence suited
            to their chart, and, where appropriate, a considered Pearl
            recommendation. Saurabh also walks through the running Vimshottari and
            Yogini dashas so that the near-term unfolding is mapped out clearly,
            not left abstract. Where relevant, he cross-checks the reading against
            a Bhrigu Nandi Nadi axis or a KP sub-lord query, which lets a single
            question receive a consistent answer across three classical lenses, and
            a final shortlist of remedies that respects the client’s time and
            temperament rather than overwhelming them with practice.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            Book a Chandra reading
            <IconArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const DIYA_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/diya.svg';

interface MoonPhase {
  symbol: string;
  label: string;
  sub: string;
}

const MOON_PHASES: readonly MoonPhase[] = [
  { symbol: '\u{1F311}', label: 'New Moon', sub: 'Set Intentions' },
  { symbol: '\u{1F312}', label: 'Waxing Crescent', sub: 'Take Action' },
  { symbol: '\u{1F313}', label: 'First Quarter', sub: 'Build Momentum' },
  { symbol: '\u{1F314}', label: 'Waxing Gibbous', sub: 'Refine Efforts' },
  { symbol: '\u{1F315}', label: 'Full Moon', sub: 'Receive and Heal' },
  { symbol: '\u{1F316}', label: 'Waning Gibbous', sub: 'Gratitude' },
  { symbol: '\u{1F317}', label: 'Last Quarter', sub: 'Release' },
  { symbol: '\u{1F318}', label: 'Waning Crescent', sub: 'Rest and Surrender' },
];

function MoonClosingPhases() {
  return (
    <section className="border-t border-blue-900/40 bg-gradient-to-b from-[#050b1a] via-[#0b1a2f] to-[#050b1a] py-10 px-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Row 1: three-column strip */}
        <div className="grid md:grid-cols-3 items-center gap-6">
          <div className="flex items-start gap-3">
            <span className="font-devanagari text-4xl text-yellow-300 leading-none">
              {'ॐ'}
            </span>
            <p className="font-caveat text-xl text-blue-100/85 italic leading-snug max-w-xs">
              The mind is like the moon, it reflects what it receives.
            </p>
          </div>

          <div className="relative flex items-center justify-center py-4">
            <IconMoonStars
              size={48}
              className="text-blue-300 opacity-70"
              aria-hidden="true"
            />
            <IconStar
              size={10}
              className="absolute top-2 left-1/3 text-yellow-200 opacity-70"
              aria-hidden="true"
            />
            <IconStar
              size={12}
              className="absolute top-6 right-1/3 text-yellow-200 opacity-60"
              aria-hidden="true"
            />
            <IconStar
              size={8}
              className="absolute bottom-2 left-1/2 text-yellow-200 opacity-80"
              aria-hidden="true"
            />
            <IconStar
              size={11}
              className="absolute bottom-4 right-1/4 text-yellow-200 opacity-50"
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center justify-end gap-3 flex-wrap">
            <div className="text-right">
              <p className="font-devanagari text-xl text-yellow-300 leading-tight">
                {'ॐ सोम सोमाय नमः ।'}
              </p>
              <p className="font-caveat italic text-blue-200 text-lg">
                Om Som Somaya Namah
              </p>
            </div>
            <img
              src={DIYA_URL}
              alt=""
              width={32}
              height={32}
              loading="lazy"
              aria-hidden="true"
              className="w-8 h-8"
            />
          </div>
        </div>

        {/* Row 2: 8 Phases of Nourishment */}
        <h3 className="font-caveat text-2xl md:text-3xl text-yellow-300 text-center mt-8 mb-4">
          Chandra&rsquo;s 8 Phases of Nourishment
        </h3>
        <div
          role="list"
          className="grid grid-cols-4 md:grid-cols-8 gap-4 items-start text-center"
        >
          {MOON_PHASES.map((phase) => (
            <div key={phase.label} role="listitem" className="flex flex-col items-center gap-1 px-1">
              <span
                aria-hidden="true"
                className="text-3xl md:text-4xl leading-none select-none"
                style={{ filter: 'drop-shadow(0 0 8px rgba(147,197,253,0.35))' }}
              >
                {phase.symbol}
              </span>
              <p className="font-caveat text-sm md:text-base text-yellow-200 leading-tight">
                {phase.label}
              </p>
              <p className="text-xs text-blue-200/70 leading-snug">{phase.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MoonPage() {
  return (
    <PlanetPageLayout
      {...moonData}
      seoBody={<MoonSEOBody />}
      closingExtension={<MoonClosingPhases />}
    />
  );
}
