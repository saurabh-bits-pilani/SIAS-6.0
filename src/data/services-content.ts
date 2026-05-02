/**
 * Long-form, SEO-optimised content for the 12 service detail pages.
 *
 * One entry per service keyed by `${category}/${slug}`. Each entry renders
 * the full template: hero intro, "what is", "how it works", problems
 * addressed, session details, "why Soul Infinity", and FAQs.
 *
 * Content is original. Keywords are woven in naturally (primary in H1 +
 * first 100 words, long-tails distributed 2–3 times). One authentic
 * Sanskrit shloka (where relevant) + 1–2 Hindi phrases in Devanagari with
 * transliteration and translation per page. Prices are never shown, all
 * CTAs route to WhatsApp or phone for personalised quotes.
 */

export interface Shloka {
  /** Devanagari */
  sanskrit: string;
  /** IAST transliteration */
  iast: string;
  /** English translation */
  english: string;
  /** Source text, e.g. "Brihat Parashara Hora Shastra, 1.3" */
  source?: string;
}

export interface HindiPhrase {
  /** Devanagari */
  devanagari: string;
  /** Latin transliteration */
  transliteration: string;
  /** English meaning */
  english: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceContent {
  /** SEO H1 for the page, primary keyword front-loaded. */
  h1: string;
  /** Primary keyword used in CTA heading + fallback hero lede. */
  primaryKeyword: string;
  /** Short one-liner for the hero section (~20 words). */
  heroTagline: string;
  /** Opening ~100-word paragraph, primary keyword in first 50 words. */
  heroIntro: string;
  /** "What is X?" section, origin + shloka + Hindi phrase (~180 words). */
  whatIs: {
    heading: string;
    paragraphs: readonly string[];
    shloka?: Shloka;
    hindiPhrase?: HindiPhrase;
  };
  /** Methodology walkthrough (~150 words). */
  howItWorks: {
    heading: string;
    paragraphs: readonly string[];
  };
  /** Life areas this service helps with. */
  problemsAddressed: {
    heading: string;
    intro?: string;
    items: readonly string[];
  };
  /** Session logistics paragraph (~150 words). */
  session: {
    heading: string;
    paragraphs: readonly string[];
  };
  /** Credibility paragraph (~120 words). */
  whySoulInfinity: {
    heading: string;
    paragraphs: readonly string[];
  };
  /** CTA block. WhatsApp pre-filled text is URL-encoded via the component. */
  cta: {
    heading: string;
    body: string;
    /** Text used in the `?text=` pre-fill for wa.me link (unencoded). */
    whatsappMessage: string;
  };
  /** 6–8 keyword-rich Q&As. Rendered visibly and mirrored to FAQPage JSON-LD. */
  faqs: readonly ServiceFaq[];
}

const PARASHARI: ServiceContent = {
  h1: 'Parashari Jyotish Consultation in Ahmedabad',
  primaryKeyword: 'Parashari Jyotish consultation Ahmedabad',
  heroTagline:
    'Classical Vedic birth chart analysis rooted in Brihat Parashara Hora Shastra, precise, compassionate, and grounded in lived practice.',
  heroIntro:
    "Parashari Jyotish is the classical system of Vedic astrology codified by the sage Parashara in the Brihat Parashara Hora Shastra, one of the oldest and most comprehensive astrological texts in the world. It forms the foundation of traditional Jyotish practice and uses the sidereal zodiac, planetary dignities, house lordships, yogas, and the Vimshottari Dasha system to analyse the full arc of a person's life. Unlike sun-sign astrology, Parashari Jyotish reads the natal chart as a complete system, examining the ascendant, Moon sign, and all nine planets in their precise house positions to reveal personality, life path, karmic patterns, and future timing. At Soul Infinity Astro Solutions, Saurabh Jain applies Parashari principles with rigorous cross-validation across multiple classical systems to ensure accuracy before sharing any prediction or remedy with the client.",
  whatIs: {
    heading: 'What is Parashari Jyotish?',
    paragraphs: [
      "Parashari Jyotish is the foundational school of Vedic astrology, attributed to Maharishi Parashara and preserved in the Brihat Parashara Hora Shastra, a text of roughly 97 chapters covering planets, signs, houses, yogas, dashas, and remedies. Unlike systems that rely only on the Sun sign, Parashari reads a chart through the ascendant (lagna), the twelve houses (bhavas), the nine planets (grahas), and the twenty-seven nakshatras, along with the Navamsa and other divisional charts (varga) that zoom into specific life areas.",
      "Saurabh Jain astrologer reads your kundli through this multi-layer lens: Rashi chart for the broad life arc, Navamsa for marriage and dharma, Dasamsa for career, and the Vimshottari Dasha analysis for timing. The result is not a generic forecast but a map of karmas ripening in your current life window.",
    ],
    shloka: {
      sanskrit: 'ॐ तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥',
      iast: 'oṁ tat saviturvareṇyaṁ bhargo devasya dhīmahi, dhiyo yo naḥ pracodayāt',
      english:
        'We meditate on the radiant splendour of the divine Sun; may it illuminate our intellect.',
      source: 'Rig Veda 3.62.10 (Gayatri Mantra)',
    },
    hindiPhrase: {
      devanagari: 'यह प्रणाली',
      transliteration: 'yah pranali',
      english: 'this system',
    },
  },
  howItWorks: {
    heading: 'How a Parashari Jyotish Reading Works',
    paragraphs: [
      "Your kundli reading in Ahmedabad begins with exact birth details, date, time, and place, used to cast the Rashi chart, Navamsa, and the relevant divisional charts. Saurabh then studies planetary positions by house and sign, examines aspects (drishti), identifies yoga formations such as Raja Yoga, Dhana Yoga, Gaja Kesari, and Neecha Bhanga, and weighs strengths using Shadbala and Ashtakavarga bindus.",
      "Timing is analysed through the Vimshottari Dasha system, a 120-year cycle of planetary periods and sub-periods (antardasha, pratyantardasha) that reveal when a yoga or dosha is likely to deliver its result. Transits (gochara) overlay the dasha picture for fine-grained forecasting. Remedies, when suggested, are drawn from classical texts: mantra, charity (daan), temple visits, or gemstone, never fear-based.",
    ],
  },
  problemsAddressed: {
    heading: 'Life Areas Parashari Jyotish Can Address',
    intro:
      'A Janma Kundli consultation can bring clarity across the major domains of life:',
    items: [
      'Career direction, timing of promotions, and profession changes',
      'Marriage timing, partner compatibility, and relationship patterns',
      'Business decisions, partnerships, and expansion windows',
      'Health vulnerabilities indicated by afflicted houses and planets',
      'Education choices, concentration issues, and foreign study prospects',
      'Finance, property, inheritance, and long-term wealth patterns',
      'Family harmony, progeny matters, and ancestral karma',
      'Spiritual growth, mantra selection, and dharmic calling',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "Sessions run 60–90 minutes. Please share exact birth date, time (hour and minute), and birth place (city and country) at least 24 hours in advance so your chart can be prepared with care. Consultations are offered in English and Hindi.",
      "You can consult in person at our Ahmedabad centre in Adani Shantigram, Khodiyar, or online via video call anywhere in India or worldwide. Birth details and written notes can be shared over WhatsApp for convenience. A follow-up window of about thirty days is held open for clarifying questions, because a reading often makes more sense after you have lived with it for a few weeks.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Parashari Jyotish',
    paragraphs: [
      "Saurabh Jain is a certified astrologer in Ahmedabad, trained at the K.N. Rao Institute, one of India's most respected schools of classical Jyotish. Over 200 clients have sat across from him with questions about career, marriage, health, and meaning, and the practice maintains a 4.9★ average across Google reviews. His approach blends classical rigour with the clarity of a technical mind; he will tell you what the chart shows and, importantly, what it does not. No fear-based pressure, no upsells on expensive rituals, no guarantees that astrology cannot honestly make.",
    ],
  },
  cta: {
    heading: 'Book Your Parashari Jyotish Consultation',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Parashari Jyotish consultation",
  },
  faqs: [
    {
      question: 'What is Parashari Jyotish and how does it differ from Sun-sign astrology?',
      answer:
        "Parashari Jyotish is the classical Vedic system from the Brihat Parashara Hora Shastra. It reads your entire birth chart, ascendant, nine planets across twelve houses, nakshatras, divisional charts, and dashas, rather than relying on a single Sun-sign column. This gives a far more specific and personal reading.",
    },
    {
      question: 'How long is a typical Parashari Jyotish consultation in Ahmedabad?',
      answer:
        "A standard session runs 60 to 90 minutes. Complex questions or combined chart readings (for family or business partners) may extend further. The aim is always a complete, unhurried conversation, not a clock-watching appointment.",
    },
    {
      question: 'Can I get a Parashari Jyotish reading online from outside Ahmedabad or India?',
      answer:
        "Yes. Online astrology consultation India-wide and internationally is available by video call. Birth details are shared over WhatsApp in advance, and the session can be recorded for your reference if you wish.",
    },
    {
      question: 'What birth details do I need for a kundli reading?',
      answer:
        "Exact date of birth, time of birth down to the minute, and place of birth (city, state, country). If your time is approximate, share the best available estimate, a brief rectification can often narrow it during the session.",
    },
    {
      question: 'How accurate are predictions from Parashari Jyotish?',
      answer:
        "Parashari Jyotish is probabilistic, not deterministic. With clean birth data and disciplined technique, especially Vimshottari Dasha analysis combined with transits, timing predictions can be strikingly accurate. Free will and effort remain the wildcard, as the classical texts themselves acknowledge.",
    },
    {
      question: 'Is Parashari Jyotish suitable for career and marriage timing?',
      answer:
        "Yes, these are among the most common reasons clients book. The Dasamsa (D10) for career and Navamsa (D9) for marriage, read alongside the running dasha, give a reliable window for decisions like job changes or the right year for matrimonial search.",
    },
    {
      question: "How is Saurabh Jain's approach to Parashari Jyotish different?",
      answer:
        "Saurabh combines K.N. Rao Institute training with an engineering and management background. That means classical technique delivered with structured clarity, no vague mysticism, no scare tactics, and a strong bias toward practical next steps you can actually act on.",
    },
  ],
};

const BNN: ServiceContent = {
  h1: 'Bhrigu Nandi Nadi (BNN) Astrology Consultation',
  primaryKeyword: 'Bhrigu Nandi Nadi astrology',
  heroTagline:
    'Rare predictive stream from the Sage Bhrigu lineage, known for tight event timing and clear karmic pattern reading.',
  heroIntro:
    "Bhrigu Nandi Nadi (BNN) is one of the rarest and most precise branches of Vedic astrology, rooted in the ancient Nadi texts attributed to the sage Bhrigu. Unlike conventional Jyotish systems that read the chart holistically, BNN focuses on specific sequential combinations of planetary pairs and their activation sequence to pinpoint the exact timing of life events with exceptional accuracy. The system is particularly powerful for identifying the year and period of major milestones such as marriage, career transitions, property acquisition, foreign travel, and health events. Very few practicing astrologers in India have mastered BNN, making it a rare specialisation in the Vedic tradition. At Soul Infinity Astro Solutions, Saurabh Jain is one of the only BNN specialists in Gujarat, trained to apply this system alongside Parashari Jyotish and KP Astrology for complete and cross-validated life guidance.",
  whatIs: {
    heading: 'What is Bhrigu Nandi Nadi?',
    paragraphs: [
      "Bhrigu Nandi Nadi (BNN) belongs to the wider Nadi astrology family, whose roots lie in the palm-leaf manuscripts authored by ancient seers, Sage Bhrigu being the one credited here. Unlike the classic palm-leaf readings at Tamil Nadi temples, BNN is a portable, chart-based technique: the astrologer works directly from your birth chart using a small set of rules around Jupiter and Ketu, dispositors, and planetary connections to indicate events and their approximate timing.",
      "The system treats each planet as a karaka (significator) of specific life themes and reads their interaction with Jupiter, the timer, to say when an event matures. For the Bhrigu Nandi Nadi astrologer India community, this method is valued precisely because it is compact, reproducible, and event-oriented.",
    ],
    shloka: {
      sanskrit: 'भृगुः सर्वज्ञो वेदवेदाङ्गपारगः।',
      iast: 'bhṛguḥ sarvajñaḥ vedavedāṅgapāragaḥ',
      english:
        'Bhrigu, all-knowing, a master of the Vedas and the Vedangas.',
      source: 'Traditional invocation to Sage Bhrigu',
    },
    hindiPhrase: {
      devanagari: 'नाड़ी ज्योतिष',
      transliteration: 'nadi jyotish',
      english: 'nadi astrology (the palm-leaf tradition)',
    },
  },
  howItWorks: {
    heading: 'How Bhrigu Nandi Nadi Works',
    paragraphs: [
      "Saurabh casts your Rashi chart and identifies the karaka planet for each theme, marriage (Venus or Jupiter depending on gender), career (Saturn, Sun, Mars), children (Jupiter), and so on. He then examines Jupiter's position and aspects, Ketu's signal role, and the dispositors in play.",
      "Timing in BNN often reads from Jupiter's transit over specific points plus the running Vimshottari Dasha. An event matures when a planet meets its karaka through conjunction, aspect, or strong dispositor linkage, with Jupiter signalling the year. Remedies, if indicated, stay close to classical instructions: specific mantras, charity on designated weekdays, and simple temple practices. BNN is not treated as a party trick; when the chart does not speak clearly on a question, Saurabh will say so.",
    ],
  },
  problemsAddressed: {
    heading: 'What BNN Astrology Can Illuminate',
    intro: 'BNN predictions timing is most useful when you need a decision window, not a vague forecast:',
    items: [
      'Marriage timing and partner-type indications',
      'Career turning points, job changes, promotions, entrepreneurship',
      'Business launch windows and expansion readiness',
      'Financial upswings, property acquisition, and loss periods',
      'Health themes and preventive awareness',
      'Progeny and family-extension timing',
      'Foreign travel, relocation, and settlement abroad',
      'Spiritual turning points and withdrawal phases',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A BNN session runs around 90 minutes. Please provide exact birth date, time, and place. Unlike temple-based palm-leaf readings, no thumb impression or printed leaf is involved, BNN here is a chart-based Sage Bhrigu astrology reading, done live with you so every conclusion can be questioned and tested.",
      "Sessions are available in person in Ahmedabad or online via video call for clients anywhere in India and abroad. English and Hindi are both fine. A written summary of key timing windows is shared on WhatsApp after the call so you can return to it over the months the predictions unfold.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for BNN',
    paragraphs: [
      "BNN is often mis-sold as mysterious or miraculous. Saurabh Jain's approach is deliberately the opposite: a calm, step-by-step walk through the chart where you can see why the reading says what it says. Saurabh is K.N. Rao Institute trained and cross-checks BNN readings against Parashari and KP frameworks where relevant, so a timing prediction is not a single-method gamble. With a 4.9★ Google rating and 200+ consultations behind the practice, the work at Soul Infinity stays honest, pragmatic, and rooted in classical sources.",
    ],
  },
  cta: {
    heading: 'Book Your Bhrigu Nandi Nadi Consultation',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in BNN (Bhrigu Nandi Nadi) consultation",
  },
  faqs: [
    {
      question: 'What is BNN astrology and how does it differ from regular Vedic astrology?',
      answer:
        "Bhrigu Nandi Nadi uses a compact set of rules focused on Jupiter, karakas, and dispositors to give event-specific timing. Regular Parashari analysis is broader and more layered. Many practitioners, including Saurabh, use both together for cross-verification.",
    },
    {
      question: 'How long is a typical BNN consultation in Ahmedabad?',
      answer:
        "Around 90 minutes, occasionally longer for complex multi-event queries. The focus stays on one or two key life questions so the timing can be read thoroughly.",
    },
    {
      question: 'Can I get a BNN astrology online from outside Ahmedabad or India?',
      answer:
        "Yes. BNN astrology online is delivered by video call to clients across India and internationally. Your chart is prepared in advance from the birth details you share over WhatsApp.",
    },
    {
      question: 'What birth details are needed for BNN predictions timing?',
      answer:
        "Exact date, time, and place of birth. If the birth time is unclear, share the closest estimate and an event history, Saurabh can do a short rectification where the chart supports it.",
    },
    {
      question: 'Is BNN suitable for marriage timing and career decisions?',
      answer:
        "These are among the strongest applications. BNN reads the Jupiter and karaka signals to name a probable year, sometimes a narrower window, which is exactly what a big decision usually needs.",
    },
    {
      question: 'How is BNN different from palm-leaf Nadi astrology?',
      answer:
        "Classical palm-leaf readings require you to visit a Nadi centre, provide a thumbprint, and have your leaf located. BNN is chart-based, the method attributed to the Sage Bhrigu tradition, but applied to your live birth chart in a consultation.",
    },
    {
      question: "What makes a Bhrigu Nandi Nadi astrologer in India reliable?",
      answer:
        "Transparency. A reliable BNN astrologer explains the reasoning, cross-checks against Parashari and transits, and does not hide behind mystique. Saurabh follows exactly this standard, trained at K.N. Rao Institute and visible in his reasoning throughout the session.",
    },
  ],
};

const KP: ServiceContent = {
  h1: 'KP Astrology Consultation in Ahmedabad',
  primaryKeyword: 'KP astrology consultation Ahmedabad',
  heroTagline:
    "Krishnamurti Paddhati, precise timing astrology built for yes/no questions, event dates, and clean decisions.",
  heroIntro:
    "KP Astrology, known as Krishnamurti Paddhati, is a modern and highly systematic branch of Vedic astrology developed by the late K.S. Krishnamurti in the mid-twentieth century. It builds on the classical Jyotish framework but introduces a unique sub-lord theory based on the Placidus house cusp system, enabling exceptional precision in predicting the timing and nature of life events. KP is particularly valued for its ability to answer direct questions, confirm event likelihood, and identify exact timing windows for marriage, career changes, property matters, foreign settlement, and health outcomes. The system uses a refined stellar hierarchy of nakshatra, sub-lord, and sub-sub-lord positions to determine planetary strength and event signification. At Soul Infinity Astro Solutions, Saurabh Jain applies KP Astrology alongside Parashari Jyotish and BNN, using all three systems in combination to cross-validate predictions before sharing them with clients.",
  whatIs: {
    heading: 'What is KP Astrology?',
    paragraphs: [
      "Krishnamurti Paddhati, developed by K.S. Krishnamurti in the 1960s, is an Indian adaptation that adopts the Placidus house system and Krishnamurti's own ayanamsa, and then introduces its defining innovation: the sub-lord. Each of the twenty-seven nakshatras is divided into nine uneven sub-divisions based on the Vimshottari Dasha proportions, and each sub is ruled by a planet whose tendencies override surface-level sign and house placements.",
      "This K.S. Krishnamurti method produces a much finer grid than traditional systems. A house cusp sub-lord tells you whether a house will 'deliver' the matters it rules; a question's significators are filtered through their sub-lords to weigh yes or no; and timing is read via the Dasha-Bhukti-Antara sub-lord chain plus transits. The result is an astrology that makes falsifiable claims, and usually gets them right.",
    ],
    hindiPhrase: {
      devanagari: 'स्पष्ट उत्तर',
      transliteration: 'spasht uttar',
      english: 'a clear answer',
    },
  },
  howItWorks: {
    heading: 'How KP Astrology Works',
    paragraphs: [
      "For a life-long reading, Saurabh prepares your natal KP chart and reads significators for the houses governing your question. For a Horary (Prashna) KP chart, a random number between 1 and 249 is provided by the querent, and the chart is cast from that number's KP sub-lord, extraordinarily useful when birth time is unknown.",
      "The sub-lord of the relevant cusp plus the significators decide yes or no. Timing is then derived from the ruling planets at the moment of question and the running Dasha-Bhukti-Antara chain. Because KP has a precise yes/no theory and a precise timing theory, its answers can be measured against reality, which is why the method has a serious research-oriented following across India.",
    ],
  },
  problemsAddressed: {
    heading: 'Questions KP Astrology Answers Well',
    intro: 'KP is especially strong for focused, time-bound decisions:',
    items: [
      'Will this job offer come through, and by when?',
      'Is this marriage proposal likely to be finalised?',
      'Best timing for a property purchase or sale',
      'Business launch date and partnership viability',
      'Court-case and legal outcome timing',
      'Medical procedure timing and recovery windows',
      'Foreign travel and visa success probability',
      'Return of lost articles or resolution of pending matters',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A KP session runs 75–90 minutes. Please bring up to three focused questions rather than a sprawling life review; KP is most effective with crisp asks. Share your exact birth details in advance; for a Horary question, you'll be invited to pick a number between 1 and 249 at the start of the call.",
      "Sessions are available in person at the Ahmedabad centre or online via video call across India and internationally. English and Hindi are welcome. You'll receive a brief written summary over WhatsApp listing the significator logic and the timing windows Saurabh identified, so you can track them as events unfold.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for KP Astrology',
    paragraphs: [
      "Many astrologers mention KP; few apply the full sub-lord framework with discipline. Saurabh Jain is trained at K.N. Rao Institute, has fifteen-plus years of focused practice, and treats KP as a precise instrument, not a brand label. With over 200 clients and a 4.9★ Google rating, the practice stays grounded in what KP can and cannot do. No pressure rituals, no magical guarantees, and no confusion between the KP sub-lord theory and loose 'Krishnamurti-inspired' readings that skip the hard calculations.",
    ],
  },
  cta: {
    heading: 'Book Your KP Astrology Consultation',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in KP astrology consultation",
  },
  faqs: [
    {
      question: 'What is KP astrology and how does it differ from Parashari Jyotish?',
      answer:
        "KP astrology uses the Placidus house system, Krishnamurti ayanamsa, and the sub-lord theory to produce precise yes/no answers and tight timing. Parashari is broader and story-driven, working from Rashi and divisional charts. The two are complementary.",
    },
    {
      question: 'How long is a typical KP astrology consultation in Ahmedabad?',
      answer:
        "Typically 75 to 90 minutes. Horary (number-based) readings for a single question can be shorter.",
    },
    {
      question: 'Can I get KP astrology online from outside Ahmedabad or India?',
      answer:
        "Yes. Online astrology consultation India-wide and internationally is offered via video call. KP is especially friendly to online sessions because its outputs are highly structured.",
    },
    {
      question: 'What if I do not know my exact birth time for KP?',
      answer:
        "KP Horary solves precisely this problem. You pick a number from 1 to 249 at the start of the session and the chart is cast from that, no birth time required for that specific question.",
    },
    {
      question: 'How accurate is precise timing astrology in KP?',
      answer:
        "With clean data and strong significators, KP is widely regarded as the sharpest timing method in Indian astrology. Dates and months can often be named; the exact day depends on transit and Antara chain strength.",
    },
    {
      question: 'Is KP suitable for career and marriage timing?',
      answer:
        "Yes, these are core KP use-cases. Houses 6, 10, and 11 are read for career; houses 2, 7, and 11 for marriage. Sub-lords of these cusps and of the significators determine outcome and timing.",
    },
    {
      question: "How is Saurabh Jain's approach to Krishnamurti Paddhati different?",
      answer:
        "Saurabh stays close to K.S. Krishnamurti's original method and its ruling planets prediction rules, and cross-verifies with Parashari. You will see the working, significators, sub-lords, Dasha-Bhukti-Antara chain, not just the conclusion.",
    },
  ],
};

const ASTRO_VASTU: ServiceContent = {
  h1: 'Astro Vastu Consultation in Ahmedabad',
  primaryKeyword: 'Astro Vastu consultation Ahmedabad',
  heroTagline:
    'Your birth chart meets the architecture of your home, a dual diagnostic for prosperity, harmony, and health.',
  heroIntro:
    "Astro Vastu is a specialised discipline that integrates the classical principles of Vastu Shastra, the ancient Indian science of spatial arrangement, with an individual's Vedic birth chart to create personalised recommendations for their home or workplace. While traditional Vastu applies universal directional guidelines, Astro Vastu goes further by mapping each person's planetary configuration to the specific zones, directions, colours, and elements of their living or working space. This personalised approach identifies which areas of a home strengthen a person's inherent planetary energies and which create friction or imbalance based on their unique chart. Corrections are recommended with minimal structural disruption, focusing on placement, colour, and elemental adjustments that activate supportive energies. At Soul Infinity Astro Solutions, Saurabh Jain offers Astro Vastu consultations for residential and commercial properties in Ahmedabad and remotely across India and worldwide, integrating chart analysis with practical spatial guidance.",
  whatIs: {
    heading: 'What is Astro Vastu?',
    paragraphs: [
      "Vastu Shastra is the traditional Indian system of architecture and spatial design, codified in texts such as the Vishwakarma Prakash and the Mayamatam. It assigns qualities to the eight directions, each governed by a deity and a planet: East to the Sun, South-East to Venus, South to Mars, South-West to Rahu, West to Saturn, North-West to the Moon, North to Mercury, and North-East to Jupiter.",
      "Astro Vastu is the practice of layering your personal birth chart over a building's Vastu map. A Vastu dosha remedies recommendation becomes more precise when the astrologer knows which planets are strong or afflicted for you. A North-East defect, for example, is much more serious for someone with a weak Jupiter than for someone with exalted Jupiter.",
    ],
    hindiPhrase: {
      devanagari: 'घर का वास्तु',
      transliteration: 'ghar ka vastu',
      english: "the home's Vastu (energetic orientation)",
    },
  },
  howItWorks: {
    heading: 'How an Astro Vastu Consultation Works',
    paragraphs: [
      "You share your birth details and a scaled floor plan of the property (home, office, shop, or plot), marked with directions. Saurabh first identifies planetary strengths and weaknesses in your chart, then overlays the Vastu map to find which directions of the property reinforce your benefics and which expose your afflictions.",
      "The analysis covers entrance direction, kitchen (Agni), master bedroom, puja room, staircase, toilet placements, water storage, and the Brahmasthan (centre). Recommendations are proportionate: a colour change, a mirror or plant, a repositioned bed, a pyramid or yantra, or in severe cases a structural review. Demolition is almost never the first remedy. The aim is to work with what you have so your space cooperates with, rather than fights, your chart.",
    ],
  },
  problemsAddressed: {
    heading: 'Concerns Astro Vastu Addresses',
    intro: 'Clients commonly consult for:',
    items: [
      'Recurring financial losses or stuck cash flow',
      'Health issues concentrated in one family member',
      'Sleeplessness and restlessness in the master bedroom',
      'Marital friction and harmony in the relationship corner',
      'Career stagnation and business-office dip in productivity',
      'Child-study and concentration zones',
      'Property selection, whether a plot or flat suits your chart',
      'Pre-construction planning for a new home or office',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "Sessions typically run 90–150 minutes depending on property size. Please share your birth details and a clear, directionally-marked floor plan 48 hours in advance. Photos of key rooms and the entrance are helpful.",
      "Consultations are available in person at our Ahmedabad centre, on-site anywhere in Gujarat for larger properties, and online via video call for clients across India and internationally. English and Hindi are both comfortable. A written Astro Vastu report is shared afterwards on WhatsApp listing the changes in order of priority, so small and free remedies come first.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Astro Vastu',
    paragraphs: [
      "Vastu has attracted a lot of fear-based selling in recent years. Saurabh Jain astrologer's approach is the opposite: classical, evidence-first, and light-touch where possible. K.N. Rao Institute training plus an engineer's instinct for structure keeps the recommendations grounded. No compulsory expensive yantras, no threats about what will 'definitely happen' if you don't act, and full transparency about the difference between a Vastu concern and a Vastu catastrophe. Over 200 clients and a 4.9★ Google rating reflect this honesty.",
    ],
  },
  cta: {
    heading: 'Book Your Astro Vastu Consultation',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Astro Vastu consultation",
  },
  faqs: [
    {
      question: 'What is Astro Vastu and how does it differ from regular Vastu?',
      answer:
        "Regular Vastu applies universal directional rules. Astro Vastu filters those rules through your personal birth chart, so remedies are tuned to your own planetary strengths and weaknesses rather than applied generically.",
    },
    {
      question: 'How long is a typical Astro Vastu consultation in Ahmedabad?',
      answer:
        "Between 90 and 150 minutes for a standard 2 or 3 BHK home. Larger homes, shops, or multi-floor offices may take longer and can be split across two sessions.",
    },
    {
      question: 'Can I get an Astro Vastu consultation online from outside Ahmedabad?',
      answer:
        "Yes. Home Vastu analysis Gujarat-wide or anywhere else is done through a scaled floor plan and photographs. Video walkthroughs work well for most rooms.",
    },
    {
      question: 'What do I need to bring for a Vastu Shastra astrologer session?',
      answer:
        "Your birth details, a floor plan with cardinal directions clearly marked, and photographs of the entrance, kitchen, master bedroom, and puja space. For plots, a site plan with surrounding roads is useful.",
    },
    {
      question: 'Do I always need to break walls or do major renovation?',
      answer:
        "Almost never. The majority of Vastu dosha remedies are non-structural, colour, placement, lighting, mirrors, plants, and specific yantras. Structural change is recommended only when a serious defect strongly aligns with a chart-level weakness.",
    },
    {
      question: 'Is Astro Vastu suitable for office and business premises?',
      answer:
        "Yes. Office Vastu consultation is a large part of the practice. The owner's chart is key, and placement of the seating, cash area, server room, and entrance is analysed in detail.",
    },
    {
      question: 'Can Astro Vastu help before buying a property?',
      answer:
        "Absolutely, this is one of its strongest uses. A pre-purchase review can flag serious defects that would be expensive to fix later, and can also confirm when a property suits your chart particularly well.",
    },
  ],
};

const GEM_STONE: ServiceContent = {
  h1: 'Gemstone Consultation in Ahmedabad',
  primaryKeyword: 'gemstone consultation Ahmedabad',
  heroTagline:
    'Birth-chart-based navratna guidance, authentic, cautious, and never one-size-fits-all.',
  heroIntro:
    "Vedic gemstone consultation is the classical Jyotish practice of recommending specific planetary gemstones to strengthen or pacify planetary influences in an individual's natal chart. In the Vedic tradition, each of the nine planets corresponds to a primary gemstone: Ruby for Surya, Pearl for Chandra, Red Coral for Mangala, Emerald for Budha, Yellow Sapphire for Guru, Diamond or White Sapphire for Shukra, Blue Sapphire for Shani, Hessonite for Rahu, and Chrysoberyl Cat's Eye for Ketu. Wearing the correct gemstone in the appropriate metal on the right finger at an auspicious time is believed to channel that planet's energy constructively. The wrong gemstone, however, can activate unfavourable planetary influences and create harm. At Soul Infinity Astro Solutions, Saurabh Jain conducts a thorough natal chart assessment before recommending any gemstone, specifying the correct stone, weight, metal, finger, and auspicious time for first wearing.",
  whatIs: {
    heading: 'What is Gemstone Astrology?',
    paragraphs: [
      "Vedic gemstone therapy is grounded in the principle that the nine grahas (planets) each resonate with a specific gemstone, a correspondence codified in texts such as the Garuda Purana and Brihat Samhita. The nine ratnas are: Ruby (Manikya) for the Sun, Pearl (Moti) for the Moon, Red Coral (Moonga) for Mars, Emerald (Panna) for Mercury, Yellow Sapphire (Pukhraj) for Jupiter, Diamond (Heera) for Venus, Blue Sapphire (Neelam) for Saturn, Hessonite (Gomed) for Rahu, and Cat's Eye (Lehsunia) for Ketu.",
      "A planetary gemstone selection is not made from your Moon sign or Sun sign alone. The ascendant (lagna), the planet's functional nature as benefic or malefic for that lagna, its house lordships, dasha period, and chart-level strength all matter. A stone that strengthens a benefic planet for one lagna can be harmful for another.",
    ],
    shloka: {
      sanskrit: 'नवग्रहा नवरत्नैर्धार्याः।',
      iast: 'navagrahā navaratnair dhāryāḥ',
      english: 'The nine planets are to be strengthened through the nine gems.',
      source: 'Traditional Jyotisha principle',
    },
    hindiPhrase: {
      devanagari: 'नवरत्न',
      transliteration: 'navaratna',
      english: 'the nine gems',
    },
  },
  howItWorks: {
    heading: 'How Ruby, Pearl, Sapphire Astrology Works',
    paragraphs: [
      "Saurabh begins with a complete chart analysis to identify the most supportive planet for your lagna, your life-lord or yoga-karaka. He then checks current and upcoming dasha periods, because a stone activates the planet during its own period most strongly. The ruby pearl sapphire astrology logic is straightforward: support benefics, never force malefics, and avoid stones whose planet is already strong and well-placed.",
      "Guidance covers the recommended weight (carat range), mounting metal, finger and day of first wearing, the Mantra for energisation (pran-pratishtha), and a short trial window, usually 40 days, during which you observe the stone's effect. You are free to discontinue if anything feels off. Gem sourcing is your choice; Soul Infinity does not sell stones, which keeps the recommendation free from conflict of interest.",
    ],
  },
  problemsAddressed: {
    heading: 'When Gemstones Can Help',
    intro: 'A gemstone is one tool among several. It is often recommended when:',
    items: [
      'A benefic planet is strong but not optimally placed',
      "A yoga-karaka for the lagna is central to the person's life goals",
      'A Mahadasha or Antardasha of a supportive planet is active',
      'Career or business needs a sustained planetary boost',
      'Marriage or relationships need a stabilising benefic',
      'Health concerns align with specific planetary weaknesses',
      'Financial flow needs a consistent energetic anchor',
      'Spiritual sadhana calls for aligning with a specific graha',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A gemstone consultation runs 45–60 minutes. Please share exact birth details and any current health, career, or relationship questions so the analysis can orient the recommendation around what matters most.",
      "Sessions are available in person at the Ahmedabad centre or online via video call across India and internationally, in English and Hindi. You receive a written note on WhatsApp afterwards with the recommended stone (and any acceptable substitutes, for instance, white sapphire for diamond), wearing instructions, and the pran-pratishtha mantra. Saurabh will also tell you, plainly, when no stone is needed, which happens more often than the industry would have you believe.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Gemstone Advice',
    paragraphs: [
      "The gemstone market in India is full of mis-selling. Saurabh Jain's approach at Soul Infinity is to keep the recommendation strictly astrological and strictly conservative. K.N. Rao Institute training, over fifteen years of chart work, and a 4.9★ Google rating across 200+ clients underpin the practice. No stone is pushed when the chart does not call for it, cheaper substitutes are openly named, and you are always free to source from a jeweller of your choice.",
    ],
  },
  cta: {
    heading: 'Book Your Gemstone Consultation',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in gemstone consultation",
  },
  faqs: [
    {
      question: 'What is an astrological gemstone recommendation based on?',
      answer:
        "It is based on your ascendant (lagna), the functional nature of each planet for that lagna, your current dasha, and chart-level strengths and weaknesses, not on your Sun or Moon sign alone.",
    },
    {
      question: 'How long is a typical gemstone consultation in Ahmedabad?',
      answer:
        "About 45 to 60 minutes. Follow-up check-ins during the trial wearing period are included on WhatsApp.",
    },
    {
      question: 'Can I get an authentic gemstone advice session online?',
      answer:
        "Yes. Online astrology consultation India-wide and internationally is available. You receive written guidance with the exact specifications needed to buy from a trusted jeweller locally.",
    },
    {
      question: 'Do you sell gemstones along with the consultation?',
      answer:
        "No. Soul Infinity deliberately does not sell stones, which keeps the recommendation independent. You source the stone from a jeweller of your choice using the specifications provided.",
    },
    {
      question: 'How quickly should a gemstone show results?',
      answer:
        "Most stones show subtle effects within 40 days, the classical trial period. Stronger, more durable effects emerge over several months, particularly during the related dasha or antardasha.",
    },
    {
      question: 'Are substitute gemstones acceptable?',
      answer:
        "Yes, classical texts allow upratnas (substitutes) such as red garnet for ruby, moonstone for pearl, and white sapphire for diamond. These are often a practical alternative when the primary stone is out of budget.",
    },
    {
      question: 'Is a planetary gemstone selection safe for everyone?',
      answer:
        "Not every stone suits every chart. Blue Sapphire (Neelam), for instance, can be disruptive if Saturn is not supportive for your lagna. This is exactly why a full chart-based analysis is required before any stone is worn.",
    },
  ],
};

const TAROT: ServiceContent = {
  h1: 'Tarot Card Reading in Ahmedabad',
  primaryKeyword: 'tarot card reading Ahmedabad',
  heroTagline:
    'A thoughtful, grounded tarot session, 78 archetypes read as a mirror for the decision you are already making.',
  heroIntro:
    "Tarot card reading is a symbolic divination system using a deck of 78 illustrated cards, divided into the 22 Major Arcana and 56 Minor Arcana, to gain insight into a person's current situation, inner dynamics, and likely future trajectories. Each card carries archetypal imagery that reflects universal human experiences, and a trained reader interprets the cards as a language of symbols, patterns, and energies rather than fixed predictions. Tarot is most effective as a tool for clarity at life crossroads, emotional processing, decision-making, and understanding the energetic dynamics at play in relationships, career, and personal growth. At Soul Infinity Astro Solutions, Saurabh Jain integrates Tarot with Vedic astrological analysis to provide readings that are both symbolically rich and grounded in the precision of planetary timing, offering a more complete picture than either system can provide alone.",
  whatIs: {
    heading: 'What is Tarot Card Reading?',
    paragraphs: [
      "Tarot is a seventy-eight-card deck structured into two arcana. The twenty-two Major Arcana cards, from The Fool to The World, depict archetypal life stages and inner transformations. The fifty-six Minor Arcana, split across Cups (emotions), Pentacles (resources), Swords (thought), and Wands (action), cover the texture of everyday life.",
      "The cards function as a projective tool. They do not decide your future; they reveal the patterns, beliefs, and energies already shaping it. Modern tarot reading grew out of the Rider Waite Smith deck (1909) and has been informed by psychology, symbolism, and decades of reflective practice. Saurabh reads tarot as an intuitive tool complementary to astrology, often answering immediate emotional and practical questions that a chart would not highlight.",
    ],
    hindiPhrase: {
      devanagari: 'टैरो पढ़ाई',
      transliteration: 'taro padhai',
      english: 'tarot reading',
    },
  },
  howItWorks: {
    heading: 'How a Tarot Session Works',
    paragraphs: [
      "You bring a specific question, the more focused, the better. Saurabh chooses a spread fitted to it: the three-card Past/Present/Future for a quick read, the Celtic Cross for a deep ten-card layout, or a custom five-card spread for decisions with multiple options on the table. Cards are shuffled and drawn by you.",
      "Each card is interpreted in context, its position, its neighbours, upright or reversed orientation, and the emotional undercurrent you bring in. Saurabh avoids single-word 'meanings' in favour of a narrative reading that connects the cards to the life decision you are holding. You leave with one or two clear next steps rather than a list of prophecies.",
    ],
  },
  problemsAddressed: {
    heading: 'Good Tarot Consultation Questions',
    intro: 'Tarot is best suited to questions you are actively thinking through:',
    items: [
      'Career decisions, should I take this offer, change roles, start a venture?',
      'Relationships, what is the dynamic here, am I reading this clearly?',
      'Family and friendship conflicts, where is the real tension?',
      'Personal growth, what pattern keeps repeating for me?',
      'Financial choices, which option feels right for this next quarter?',
      'Study and exam preparation, what am I missing?',
      'Emotional closure, what do I need to accept or let go?',
      'Spiritual direction, what practice is calling me now?',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A tarot session runs 45–60 minutes and covers one to three questions in depth. You do not need to share birth details, tarot works with the present moment. Please take a few minutes before the session to sit quietly and let your real question surface rather than the polite version.",
      "Sessions are available in person at the Ahmedabad centre or online via video call anywhere in India and internationally, in English and Hindi. The reading can be photographed at the table so you can revisit the spread later. A short summary of the key cards and the action points is sent on WhatsApp afterwards.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Tarot',
    paragraphs: [
      "The tarot world ranges from deeply reflective to genuinely irresponsible. Saurabh Jain astrologer keeps the practice on the thoughtful end. K.N. Rao Institute training in Jyotish gives him a disciplined frame for symbolic reading; an M.Phil background gives him the habit of questioning easy answers. Tarot at Soul Infinity is never used to frighten, no curse narratives, no paid 'remedies' to avert disaster. Over 200 clients and a 4.9★ rating reflect a practice of tarot reader India online sessions that respect the querent's agency.",
    ],
  },
  cta: {
    heading: 'Book Your Tarot Card Reading',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in tarot card reading consultation",
  },
  faqs: [
    {
      question: 'What is tarot and how is it different from Vedic astrology?',
      answer:
        "Tarot is a seventy-eight-card reflective tool that works with the present moment and a specific question. Vedic astrology maps your lifetime karma from a birth chart. Tarot gives a quick mirror; astrology gives a long map, they answer different questions.",
    },
    {
      question: 'How long is a typical tarot card reading in Ahmedabad?',
      answer:
        "Around 45 to 60 minutes. This comfortably covers one to three questions in a Celtic Cross or layered three-card format.",
    },
    {
      question: 'Can I get a tarot reading online from outside Ahmedabad or India?',
      answer:
        "Yes. Tarot reader India online sessions are offered by video call. You watch the cards being drawn and can photograph the spread for reference.",
    },
    {
      question: 'What tarot consultation questions work best?',
      answer:
        "Open, self-oriented questions work best, 'what do I need to see about this?' rather than 'will he call me tomorrow?' Tarot reflects clearly when the question respects your own agency.",
    },
    {
      question: 'How accurate are tarot readings for a career tarot reading?',
      answer:
        "Tarot is accurate at reading the dynamics and likely outcomes of a decision you are actively considering. It is not meant to forecast absolute events years into the future. For long timing, a KP or Parashari reading is better.",
    },
    {
      question: 'Is a love tarot reading Ahmedabad session suitable for relationship decisions?',
      answer:
        "Yes, relationships are one of tarot's strongest areas. A good love reading surfaces the dynamic, the unspoken expectations, and the likely direction if nothing changes, so you can decide clearly.",
    },
    {
      question: 'Do I need to believe in tarot for it to work?',
      answer:
        "You need to be willing to engage honestly with the question. Belief is not required, but reflection is. Clients with a sceptical, curious attitude often get the most out of a session.",
    },
  ],
};

const SYMBOL: ServiceContent = {
  h1: 'Astrological Symbol Analysis Consultation',
  primaryKeyword: 'astrological symbol analysis',
  heroTagline:
    'Archetypal reading of the recurring symbols, in your chart, your dreams, your life, and what they mean for you.',
  heroIntro:
    "Symbol analysis is the interpretive practice of reading recurring symbols, signs, dreams, and meaningful patterns that appear in a person's daily experience as communications from a deeper layer of consciousness or cosmic intelligence. In the Vedic and Jyotish tradition, the world is understood as a field of signs in which certain animals, numbers, directional signals, dream imagery, and situational repetitions carry specific meaning related to a person's planetary period, karmic patterns, and soul direction. Unlike random coincidence, recurring symbols are recognised in this tradition as consistent signals that deserve conscious attention and informed interpretation. At Soul Infinity Astro Solutions, Saurabh Jain reads these symbols in the context of the individual's natal chart and current Mahadasha to provide guidance that is both spiritually grounded and practically actionable, helping clients understand what their inner world and outer signs are communicating at any given time.",
  whatIs: {
    heading: 'What is Symbol Analysis?',
    paragraphs: [
      "Every astrological system, Vedic, Western, Tarot, Jungian, speaks a language of symbols. Planets are not just points in space; they are archetypes: Saturn as structure and time, Venus as value and relation, Mars as will and edge, the Moon as receptive inner life. Houses are fields of experience; aspects are dialogues between parts of the psyche.",
      "Symbolic chart interpretation treats the birth chart as a kind of inner map. The archetypal astrology reading tradition, influenced by C. G. Jung, James Hillman, and Richard Tarnas, sees your recurring life themes as symbolic teachings rather than mechanical fate. Saurabh reads your chart this way, noting which archetypes are under emphasis and which are silent, so that you can work with them consciously.",
    ],
    hindiPhrase: {
      devanagari: 'प्रतीक अर्थ',
      transliteration: 'prateek arth',
      english: 'the meaning of a symbol',
    },
  },
  howItWorks: {
    heading: 'How a Symbol Analysis Session Works',
    paragraphs: [
      "You share your birth details and any recurring symbols you have noticed, dream images, animals that keep appearing, objects that hold strange emotional charge, numbers that follow you. Saurabh casts the chart and identifies the archetypal weights: which planetary principles dominate, which are missing, which are in creative tension.",
      "The session then moves between chart and life. The Moon-Saturn aspect that appears in your 4th house is read as a symbolic pattern, an invitation to deepen rather than a predicted burden. A recurring dream about water is crossed against your Cancer or Pisces emphasis. The goal is not to decode the symbol as if it were a cipher, but to let you recognise it, the moment when an image clicks into place is the work.",
    ],
  },
  problemsAddressed: {
    heading: 'What Symbol Analysis Is Useful For',
    intro: 'Clients come to this work for quieter, more interior questions:',
    items: [
      'Recurring dreams and what they are pointing toward',
      'Synchronicities and meaningful coincidences',
      'Identifying personal myths and life themes',
      'Creative block and artistic direction',
      'Midlife transitions and vocational re-orientation',
      'Grief, inner shadow work, and integration',
      'Spiritual symbolism across traditions',
      'Understanding your own archetypal constellations',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "Sessions run 60–75 minutes. Please share birth details plus a short written note on any three or four symbols you want to explore, sent over WhatsApp a day in advance. This preparation deepens the session because Saurabh can look for chart correspondences ahead of time.",
      "Consultations are available in person at the Ahmedabad centre or online by video call for clients across India and internationally, in English and Hindi. You receive a short written summary after the session noting the core archetypal themes and suggested contemplative practices, for whenever you want to return to the work.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Symbol Analysis',
    paragraphs: [
      "This is a specialised service, not every astrologer is comfortable reading a chart symbolically. Saurabh Jain combines K.N. Rao Institute training with an M.Phil background and long personal reading in Jung, Hillman, and the Indian symbolic traditions. The approach at Soul Infinity stays respectful of the client's inner life, symbols are never imposed, only offered. The practice has served 200+ clients with a 4.9★ rating, and this is one of the quieter services people return to when life asks a deeper question.",
    ],
  },
  cta: {
    heading: 'Book Your Symbol Analysis Consultation',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Symbol Analysis consultation",
  },
  faqs: [
    {
      question: 'What is astrological symbol analysis?',
      answer:
        "It is the practice of reading the planetary archetypes in your birth chart, and the recurring symbols in your life, as a meaningful pattern rather than a mechanical forecast. The approach draws on classical astrology and archetypal psychology.",
    },
    {
      question: 'How is this different from a regular astrological reading?',
      answer:
        "A regular reading focuses on events and timing. Symbolic astrology consultation focuses on meaning, what the chart and the recurring symbols in your life are teaching you, and how to work with them consciously.",
    },
    {
      question: 'Can I get an archetypal astrology reading online?',
      answer:
        "Yes. Online astrology consultation India-wide and internationally is available by video call. The reflective nature of this work translates well to an online session.",
    },
    {
      question: 'Do I need to share my dreams for this work?',
      answer:
        "It helps. Dreams, images, and repeated symbols you have noticed give the session real material to work with. If you do not remember dreams, symbols from waking life are equally useful.",
    },
    {
      question: 'Is psychological astrology India-based different from Western psychological astrology?',
      answer:
        "The archetypal grammar is universal, but Indian symbolism carries its own texture, the Ashtama Rasa, the Devis and Devas, and the dharmic frame. Saurabh brings both lineages into the session where they help.",
    },
    {
      question: 'Is this consultation suitable during major life transitions?',
      answer:
        "Yes, Saturn returns, Jupiter cycles, midlife, grief, and vocational re-orientation are classic times for this work. The symbolic frame helps make sense of transitions that a purely predictive reading would flatten.",
    },
    {
      question: 'How long does a symbolic chart interpretation usually take?',
      answer:
        "About 60 to 75 minutes in a single sitting. Some clients return annually for a follow-up as their relationship to their own symbols deepens.",
    },
  ],
};

const PLR: ServiceContent = {
  h1: 'Past Life Regression Therapy in Ahmedabad',
  primaryKeyword: 'past life regression therapy Ahmedabad',
  heroTagline:
    'A safe, guided hypnotic regression to surface the past-life patterns shaping your current relationships and fears.',
  heroIntro:
    "Past life regression is a guided therapeutic process that uses a deeply relaxed state of awareness to access memories, impressions, and unresolved experiences from previous lifetimes that continue to influence a person's present life through fears, phobias, recurring relationship patterns, unexplained physical conditions, and deeply held emotional beliefs. The practice is grounded in the understanding that the soul carries karmic imprints across lifetimes, and that bringing these imprints into conscious awareness can create profound healing and release. During a session, the practitioner guides the client through a safe and structured process of inner exploration, allowing them to witness and integrate past life material at their own pace. At Soul Infinity Astro Solutions, Saurabh Jain conducts past life regression sessions in a calm and supportive environment, combining the process with Vedic astrological insight to identify which karmic patterns the chart itself indicates need resolution.",
  whatIs: {
    heading: 'What is Past Life Regression?',
    paragraphs: [
      "Past Life Regression (PLR) emerged in modern Western therapy largely through the work of Dr. Brian Weiss, a Yale-trained psychiatrist who documented cases in Many Lives, Many Masters. The technique uses guided hypnosis to induce a deeply relaxed state in which the conscious mind quietens and the subconscious surfaces impressions that often read as memories of previous lifetimes.",
      "Classical Indian philosophy has long held that samskaras, deep impressions from past actions, travel across births and influence current behaviour. Whether you view PLR as literal memory, archetypal imagery, or a projective tool of the subconscious, the therapeutic effect is similar: recognising a pattern at its apparent source loosens its grip on the present. Past life memories regression is not entertainment; it is inner work with specific psychological benefits.",
    ],
    hindiPhrase: {
      devanagari: 'पूर्व जन्म',
      transliteration: 'poorv janam',
      english: 'past life / previous birth',
    },
  },
  howItWorks: {
    heading: 'How a PLR Therapy Session Works',
    paragraphs: [
      "The session opens with a pre-regression conversation, your intention, your history with similar work, any medical considerations, and the one or two patterns you most want to explore. Saurabh then guides a progressive relaxation that moves through the body, breath, and mind into a receptive theta-adjacent state.",
      "From that state you are gently guided to an earlier time, sometimes within this life, sometimes to what surfaces as a prior life. You remain conscious and in control throughout; this is not unconsciousness. Saurabh asks open, neutral questions that let the material unfold without leading. After the regression, there is an integration conversation in which the imagery is connected to current-life patterns. Nothing is forced to be a past-life memory if it surfaces as something else.",
    ],
  },
  problemsAddressed: {
    heading: 'Concerns PLR Can Help With',
    intro: 'PLR is most useful when the current-life cause of a pattern is unclear:',
    items: [
      'Unexplained fears and phobias with no current-life trigger',
      'Repeating relationship dynamics across multiple partners',
      'Instinctive attraction or aversion to specific people or places',
      'Persistent grief or guilt without clear present-life source',
      'Unexplained physical symptoms with no medical cause',
      'Strong calling toward specific cultures, languages, or crafts',
      'Understanding current-life dharma and life purpose',
      'Healing karmic debts and closing incomplete cycles',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A full PLR session runs 120–150 minutes, longer than most consultations because the relaxation induction alone takes time. Please eat lightly beforehand, avoid caffeine in the two hours before, and come well rested. Wear comfortable clothes. The session is audio-recorded and the recording shared over WhatsApp afterwards so you can revisit the material.",
      "Sessions are available in person at the Ahmedabad centre, often preferred for a first PLR, or online via video call for clients in India and worldwide who prefer the safety of their own space. English and Hindi are both fine. A follow-up integration conversation is included a week or two later.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Past Life Regression',
    paragraphs: [
      "PLR can be mishandled, rushed inductions, leading questions, over-dramatised readings. Saurabh Jain astrologer's approach is deliberately slow and non-directive. K.N. Rao Institute training in classical jyotish, combined with years of personal meditative practice and study of the Dr. Brian Weiss method, keeps the work safe. 200+ client consultations and a 4.9★ Google rating support a practice built on trust. PLR is declined if there is active untreated trauma or serious mental health concerns, ethical boundaries matter here more than in any other service.",
    ],
  },
  cta: {
    heading: 'Book Your Past Life Regression Session',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Past Life Regression therapy",
  },
  faqs: [
    {
      question: 'What is past life regression therapy?',
      answer:
        "It is a guided hypnotic technique that uses deep relaxation to access imagery and impressions often interpreted as memories from previous lifetimes. The aim is therapeutic, recognising a pattern at its source so it loosens its grip on the present.",
    },
    {
      question: 'How long is a typical PLR session in Ahmedabad?',
      answer:
        "Plan for around 2 to 2.5 hours. The induction, regression itself, and integration conversation all take unhurried time.",
    },
    {
      question: 'Can I get past life regression India-wide online?',
      answer:
        "Yes. Many clients prefer an online session in the safety of their own room. You need a quiet space, a comfortable chair or bed, good headphones, and a stable internet connection.",
    },
    {
      question: 'Is PLR based on the Dr. Brian Weiss method?',
      answer:
        "The technique is influenced by Dr. Brian Weiss's published work and by several other lineages of regression therapy, adapted with respect for classical Indian samskara theory.",
    },
    {
      question: 'Do I lose consciousness during past life memories regression?',
      answer:
        "No. You remain awake and in control throughout. The state is closer to deep meditation than sleep, relaxed enough for the subconscious to surface material, but alert enough that you can speak and stop at any time.",
    },
    {
      question: 'What if no past life surfaces during the session?',
      answer:
        "That happens. Sometimes what surfaces is current-life material, archetypal imagery, or simply deep rest. Saurabh will not force a past-life frame where it does not arise. The session still has therapeutic value.",
    },
    {
      question: 'Is PLR suitable for karmic pattern healing in relationships?',
      answer:
        "Yes, repeating relationship dynamics are one of the strongest applications. Recognising the origin of a pattern, whether as literal past-life memory or as symbolic material, helps loosen it in current relationships.",
    },
  ],
};

const REIKI: ServiceContent = {
  h1: 'Reiki Healing in Ahmedabad',
  primaryKeyword: 'Reiki healing Ahmedabad',
  heroTagline:
    'Usui Reiki, gentle, hands-on or distance channelling of universal life force for stress, sleep, and inner calm.',
  heroIntro:
    "Reiki is a Japanese energy healing practice developed by Mikao Usui in the early twentieth century, based on the principle that a universal life force energy flows through all living beings and that disruptions or depletion of this energy contribute to physical, emotional, and spiritual imbalance. A trained Reiki practitioner channels this energy through light touch or at a distance, supporting the body's natural capacity for healing and restoring energetic equilibrium across the physical, emotional, and subtle bodies. Reiki is a gentle, non-invasive practice suitable for all ages and conditions, and works effectively alongside conventional medical treatment without interference. At Soul Infinity Astro Solutions, Saurabh Jain offers Reiki healing sessions both in person in Ahmedabad and as distance healing sessions for clients across India and worldwide, often combining Reiki with Vedic astrological insight to target the planetary energies creating specific blockages in the client's system.",
  whatIs: {
    heading: 'What is Reiki?',
    paragraphs: [
      "Reiki is a Japanese system of energy healing developed by Mikao Usui in the early twentieth century. The word combines 'rei' (universal, spiritual) and 'ki' (life force, equivalent to the Sanskrit prana). In practice, the practitioner acts as a conduit for ki, directing it to the recipient through the hands.",
      "The recipient lies or sits, fully clothed, while the practitioner places hands lightly on or just above a series of positions, the head, the heart, the abdomen, the knees, the feet. No massage or manipulation is involved. The experience is usually warm, slow, and deeply relaxing. Reiki works alongside medical care; it is not a substitute for diagnosis or treatment. What it does reliably is settle the nervous system and create space for the body's own regulatory systems to function more fully.",
    ],
    hindiPhrase: {
      devanagari: 'प्राण ऊर्जा',
      transliteration: 'prana urja',
      english: 'life-force energy',
    },
  },
  howItWorks: {
    heading: 'How a Reiki Session Works',
    paragraphs: [
      "A session opens with a short conversation about what you would like to focus on, sleep, stress, grief, a specific physical concern, or general maintenance. You then lie down or sit comfortably. Saurabh moves through a standard sequence of Reiki hand positions, pausing longer at places where the energy feels denser or more receptive.",
      "Many clients fall into a deeply relaxed half-sleep; some feel warmth, mild tingling, or subtle movement. After the session there is a brief integration conversation about anything you noticed, plus simple after-care advice, hydration, rest, and often a quiet evening. A Reiki chakra balancing sweep is included at the end to seal the work.",
    ],
  },
  problemsAddressed: {
    heading: 'What Reiki Can Help With',
    intro: 'Reiki is a gentle, broad-spectrum support especially useful for:',
    items: [
      'Chronic stress and nervous system exhaustion',
      'Poor sleep quality and insomnia',
      'Anxiety and low-grade background worry',
      'Grief, emotional overload, and post-loss fatigue',
      'Recovery support alongside medical treatment',
      'Creative block and burnout recovery',
      'Pre-procedure calm and post-procedure rest',
      'Foundational energetic maintenance, self-care rhythm',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A Reiki session runs 60–75 minutes in person at the Ahmedabad centre. No preparation is needed beyond wearing loose, comfortable clothing. Shoes are removed; the session takes place on a low bed or reclining chair in a quiet room.",
      "Distance Reiki healing India-wide is also offered, a pre-scheduled fifty-minute slot during which you rest quietly in your own space while the session is conducted remotely. Clients often report similar sensations to in-person work. A short follow-up conversation happens on WhatsApp afterwards. Sessions are available in English and Hindi.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Reiki',
    paragraphs: [
      "Reiki at Soul Infinity is practised as a legitimate complementary therapy, not as a miracle cure. Saurabh Jain is a certified Reiki practitioner trained in the Usui lineage, and his background as a K.N. Rao Institute trained Vedic astrologer lets him place each Reiki session in the context of the wider chart when helpful. 200+ consultations and a 4.9★ rating reflect the practice. Reiki sessions are never used to discourage medical care, and diagnostic claims are never made on the basis of energy work alone.",
    ],
  },
  cta: {
    heading: 'Book Your Reiki Healing Session',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Reiki Healing session",
  },
  faqs: [
    {
      question: 'What is Reiki and how does it differ from massage?',
      answer:
        "Reiki is an energy healing practice that involves light touch or no touch at all, working with the body's energy field. Massage works directly on muscles and soft tissue. The two can complement each other but are different practices.",
    },
    {
      question: 'How long is a typical Reiki session in Ahmedabad?',
      answer:
        "A standard session runs 60 to 75 minutes. First sessions often run a little longer because of the introductory conversation and post-session integration.",
    },
    {
      question: 'Is distance Reiki healing India-wide really effective?',
      answer:
        "Many clients report similar sensations, warmth, calm, deep rest, from distance sessions as from in-person work. Reiki is not limited by physical distance in the same way a massage is. You need a quiet space and an agreed time slot.",
    },
    {
      question: 'Do I need to believe in Reiki for it to work?',
      answer:
        "No. Belief is not required. What helps is being willing to rest, close your eyes, and stay open to whatever happens. Scepticism does not prevent the body from relaxing.",
    },
    {
      question: 'Is Reiki chakra balancing part of the session?',
      answer:
        "Yes. A short chakra sweep from the root to the crown is included at the close of each session, along with light aura grounding.",
    },
    {
      question: 'Can Reiki replace medical treatment?',
      answer:
        "No. Reiki is complementary, not a substitute for medical care. It works well alongside treatment and can support recovery, but diagnostic and medical decisions are always your doctor's territory.",
    },
    {
      question: 'How often should I come for Reiki?',
      answer:
        "For an acute issue, a short series of three to five sessions over a few weeks often helps. For general maintenance, one session a month is a gentle rhythm many clients settle into.",
    },
  ],
};

const PRANIC: ServiceContent = {
  h1: 'Pranic Healing in Ahmedabad',
  primaryKeyword: 'Pranic healing Ahmedabad',
  heroTagline:
    'Master Choa Kok Sui Pranic Healing, a structured, no-touch energy therapy for physical and emotional wellbeing.',
  heroIntro:
    "Pranic healing is an advanced energy healing system developed by Grand Master Choa Kok Sui, based on the principle that the body has an innate ability to heal itself and that this process can be accelerated by increasing the life force energy, known as prana, in the energy body or aura. Unlike Reiki, pranic healing uses a systematic no-touch methodology involving specific scanning, cleansing, and energising protocols applied to the affected chakras and energy channels. The system works on the principle that physical ailments and psychological conditions first manifest as disruptions in the energy body before becoming apparent at the physical level. At Soul Infinity Astro Solutions, Saurabh Jain applies pranic healing techniques for a range of physical, emotional, and psychological conditions, offering sessions both in person in Ahmedabad and remotely for clients across India and worldwide, as part of an integrated approach to holistic wellbeing.",
  whatIs: {
    heading: 'What is Pranic Healing?',
    paragraphs: [
      "Pranic Healing was systematised by Grand Master Choa Kok Sui in the 1980s after years of research into the human energy body and across healing traditions. The practice works on two principles: first, the body has an innate capacity to heal itself; second, the process can be accelerated by removing dirty or congested prana and projecting fresh prana into the affected chakras and organs.",
      "Unlike Reiki, which channels energy in a more open way, Pranic Healing follows precise step-by-step protocols, scanning the aura, sweeping diseased energy away, energising with clean prana, and stabilising. Each chakra has specific colours and frequencies of prana associated with it. The system is strictly no-touch: the practitioner's hands work in the aura, typically a few inches from the body.",
    ],
    hindiPhrase: {
      devanagari: 'आभा मंडल',
      transliteration: 'aabha mandal',
      english: 'aura (the energetic field around the body)',
    },
  },
  howItWorks: {
    heading: 'How a Pranic Healing Session Works',
    paragraphs: [
      "A session opens with a brief conversation about the current concern, physical, emotional, or both, followed by a scan of your aura to identify congested or depleted chakras and organs. You remain fully clothed, seated or standing, as the practitioner works in the space around your body.",
      "The main work is a sequence of cleansing sweeps, where dirty energy is removed and disposed of into a salt-water container, alternated with energising passes that direct fresh prana into the chakras and organs that need it. Saurabh closes with stabilisation and a short shielding protocol to protect the gains. You may notice lightness, warmth, tingling, or simply quiet. After-care advice is given: hydration, salt-water bath on the same day, and rest.",
    ],
  },
  problemsAddressed: {
    heading: 'What Pranic Healing Can Help With',
    intro: 'The MCKS Pranic Healing system has protocols for a wide range of concerns:',
    items: [
      'Stress, anxiety, and low mood',
      'Headaches, migraines, and tension patterns',
      'Respiratory issues (complementary to medical care)',
      'Digestive discomfort and sluggishness',
      'Recovery acceleration after illness or surgery',
      'Sleep disturbance and exhaustion',
      'Relationship and emotional repair work',
      'Financial stagnation (through solar plexus and basic chakra work)',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A pranic healing session runs 60–90 minutes. Please wear loose, comfortable clothing and hydrate well before and after. If you have a specific medical condition, inform Saurabh in advance so the protocol can be adjusted; pranic healing supports medical treatment and does not replace it.",
      "Sessions are available in person at the Ahmedabad centre and as distant pranic healing by video call for clients across India and internationally. Distance work follows the same protocol structure as in-person sessions. English and Hindi are both available. A short aftercare note is shared on WhatsApp.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Pranic Healing',
    paragraphs: [
      "Pranic Healing works best when it is practised in a disciplined, protocol-faithful way. Saurabh Jain has trained in the MCKS lineage and keeps each session close to the system's standards rather than improvising around them. Combined with K.N. Rao Institute training in Vedic astrology, this gives him a dual read on the client, energetic and karmic, where the chart adds useful context. With 200+ clients and a 4.9★ Google rating, the practice keeps its boundaries clear: pranic healing is a supportive therapy, not a medical replacement, and that honesty is part of why it works.",
    ],
  },
  cta: {
    heading: 'Book Your Pranic Healing Session',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Pranic Healing session",
  },
  faqs: [
    {
      question: 'What is Pranic Healing and how does it differ from Reiki?',
      answer:
        "Both work with life-force energy. Pranic Healing follows precise, codified protocols developed by Master Choa Kok Sui, scanning, cleansing, energising, and stabilising in a defined sequence. Reiki is a more open channelling system. Many practitioners (including Saurabh) are trained in both.",
    },
    {
      question: 'How long is a typical pranic healing consultation India session?',
      answer:
        "Between 60 and 90 minutes. Longer sessions are occasionally needed for complex issues involving multiple chakras and organs.",
    },
    {
      question: 'Can I get distant pranic healing from outside Ahmedabad?',
      answer:
        "Yes. Distant pranic healing is a standard part of the MCKS system and is delivered by scheduled video call. You rest quietly in your own space while the protocol is carried out.",
    },
    {
      question: 'Does MCKS Pranic Healing involve touching me?',
      answer:
        "No. The practice is strictly no-touch. The practitioner's hands work in your aura, typically a few inches away from the body throughout the session.",
    },
    {
      question: 'Is aura cleansing therapy a medical treatment?',
      answer:
        "No. Pranic healing is a complementary therapy that supports the body's own healing capacity. It is not a substitute for medical diagnosis or treatment and should be used alongside, never instead of, medical care.",
    },
    {
      question: 'How often should I book pranic healing sessions?',
      answer:
        "For acute issues, three to five sessions close together often help the protocol build. For maintenance, a session every three to four weeks is common. Saurabh will recommend a cadence at the end of the first session.",
    },
    {
      question: 'Is pranic healing suitable alongside medication?',
      answer:
        "Yes. Pranic Healing is designed to complement medical treatment, not replace it. Please continue with prescribed medications and keep your doctor in the loop on any significant changes.",
    },
  ],
};

const THETA: ServiceContent = {
  h1: 'Theta Healing in Ahmedabad',
  primaryKeyword: 'Theta Healing Ahmedabad',
  heroTagline:
    'Vianna Stibal Theta Healing, subconscious belief work at the theta brainwave level, for lasting change at the root.',
  heroIntro:
    "Theta healing is a meditation-based healing and personal development modality developed by Vianna Stibal, which works by accessing the theta brainwave state, a deeply relaxed state associated with the threshold between waking and sleep, to identify and transform limiting beliefs held in the subconscious mind. The theta state, oscillating between four and seven cycles per second, is the same brainwave pattern observed during deep meditation and hypnosis, and it provides direct access to the subconscious programming that drives a person's habitual thoughts, emotions, behaviours, and physical responses. Theta healing works by identifying core limiting beliefs, often formed in childhood or inherited ancestrally, and replacing them with empowering beliefs through a witnessed co-creative process. At Soul Infinity Astro Solutions, Saurabh Jain uses theta healing to help clients release deeply held patterns around money, relationships, health, and self-worth that have not responded to conscious effort alone.",
  whatIs: {
    heading: 'What is Theta Healing?',
    paragraphs: [
      "Theta Healing was developed in the mid-1990s by Vianna Stibal, a naturopath and intuitive healer in the United States, following her own reported healing from a serious illness. The technique uses a guided meditation to access the theta brainwave state, the same state the brain enters just before sleep or during deep meditation, in which beliefs and subconscious material become more accessible to conscious change.",
      "Belief work healing, the core technique of Theta Healing, is a structured conversation. The practitioner and client identify a limiting belief (for example, 'I have to struggle to be worthy of money'), trace it to its source (childhood, ancestral, past-life, or genetic, according to the system), and through a simple muscle-testing and witnessing process, replace it with a healthier belief. The theta state makes this shift more receptive than ordinary waking consciousness would allow.",
    ],
    hindiPhrase: {
      devanagari: 'अवचेतन',
      transliteration: 'avachetan',
      english: 'subconscious',
    },
  },
  howItWorks: {
    heading: 'How a Theta Healing Session Works',
    paragraphs: [
      "Your session opens with a conversation to identify one or two core issues, often a recurring self-sabotaging pattern, a stuck relationship dynamic, or a goal that somehow never materialises. Saurabh then guides you into a short theta brainwave meditation therapy state and begins the belief work.",
      "Through gentle questioning and muscle-testing, you surface the beliefs underneath the surface problem. Each belief is examined, consented to, released, and replaced with one that better serves the life you are building. The process is collaborative, the client is never overridden; you always confirm before any replacement belief is installed. The session closes with integration advice and a short written list of the beliefs worked on, so you can observe the shifts in the days that follow.",
    ],
  },
  problemsAddressed: {
    heading: 'What Theta Healing Can Help With',
    intro: 'Theta Healing is particularly effective at the belief layer:',
    items: [
      'Money, abundance, and deservingness blocks',
      'Self-worth, self-doubt, and imposter patterns',
      'Relationship templates inherited from childhood',
      'Fear of success, fear of visibility, fear of failure',
      'Chronic procrastination and goal-avoidance',
      'Body image and eating pattern beliefs',
      'Spiritual self-permission and connection beliefs',
      'Career-identity and vocational stuckness',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A Theta Healing session runs 90–120 minutes. Come hydrated and rested. Please prepare a short list of patterns you want to work on so the session can move into belief work quickly. Sessions are confidential and unhurried.",
      "Consultations are available in person at the Ahmedabad centre or as Theta Healing India online sessions for clients across India and internationally, in English and Hindi. The meditative format works well online. A written note summarising the beliefs released and installed is shared on WhatsApp afterwards for your reference during integration.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Theta Healing',
    paragraphs: [
      "Theta Healing can be powerful, and that means it should be practised with care. Saurabh Jain has trained in the Vianna Stibal lineage and combines the work with K.N. Rao Institute classical astrology training, which helps him spot belief patterns that align with specific chart signatures. The practice maintains firm ethical boundaries, no belief is installed without clear consent, and sessions are declined when a medical or psychiatric concern needs a clinician first. 200+ clients and a 4.9★ Google rating reflect this commitment.",
    ],
  },
  cta: {
    heading: 'Book Your Theta Healing Session',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Theta Healing session",
  },
  faqs: [
    {
      question: 'What is Theta Healing?',
      answer:
        "Theta Healing is a belief-work technique developed by Vianna Stibal. Using a light theta brainwave state, the practitioner helps you identify limiting beliefs and replace them with healthier ones at the subconscious level.",
    },
    {
      question: 'How long is a typical Theta Healing Ahmedabad session?',
      answer:
        "Around 90 to 120 minutes. A first session often runs longer as the rhythm of belief work is established.",
    },
    {
      question: 'Can I get Theta Healing India online from outside Ahmedabad?',
      answer:
        "Yes. The meditative nature of Theta Healing translates well to video call sessions. You need a quiet space, headphones, and a stable connection.",
    },
    {
      question: 'Is belief work healing safe?',
      answer:
        "Yes, when practised with consent and with awareness of when to refer out. No belief is installed without your clear approval. If a medical or psychiatric concern surfaces, Saurabh will refer you to a clinician rather than continue alone.",
    },
    {
      question: 'How is Theta Healing different from hypnotherapy?',
      answer:
        "Hypnotherapy uses a hypnotic state for suggestion and regression work. Theta Healing uses a light meditative theta state specifically for belief identification and replacement. The aims overlap but the technique and protocol differ.",
    },
    {
      question: 'How many sessions does subconscious healing technique work usually need?',
      answer:
        "Some shifts happen in one session; complex, multi-layered beliefs often take three to five sessions. Saurabh does not pre-book packages; each session is booked one at a time so you can assess progress honestly.",
    },
    {
      question: 'Do I stay conscious during the theta brainwave meditation therapy?',
      answer:
        "Yes. You remain awake and in clear conversation throughout. The state is a relaxed, receptive one, closer to deep meditation than to sleep.",
    },
  ],
};

const CRYSTAL: ServiceContent = {
  h1: 'Crystal Healing in Ahmedabad',
  primaryKeyword: 'crystal healing Ahmedabad',
  heroTagline:
    'Crystals placed with intent on chakra points, a gentle vibrational therapy for subtle-body alignment.',
  heroIntro:
    "Crystal healing is an energy-based healing practice that uses the vibrational properties of natural minerals and gemstones to interact with and balance the human energy field, chakras, and subtle bodies. Each crystal carries a specific crystalline structure and vibrational frequency that resonates with particular energetic qualities, emotions, and physiological systems, making crystals useful tools for clearing energetic blockages, amplifying positive intentions, and restoring balance to depleted or overactive energy centres. The practice draws on traditions from Vedic, Egyptian, and various indigenous healing systems, all of which recognised the energetic properties of stones and their relationship to planetary and elemental forces. At Soul Infinity Astro Solutions, Saurabh Jain integrates crystal healing with Vedic astrological guidance, identifying which planetary energies in the client's chart need support and selecting crystals that correspond to those specific planetary frequencies for a targeted and personalised healing approach.",
  whatIs: {
    heading: 'What is Crystal Healing?',
    paragraphs: [
      "Crystal healing is a vibrational therapy that uses crystals and gemstones placed in specific configurations on or near the body to influence the energy field and the chakras. The practice draws on the mineralogical fact that crystals have a highly ordered atomic lattice and piezoelectric properties, qualities that have long been interpreted, across traditions from Ayurveda to Native American medicine, as having an effect on subtle energy.",
      "Each chakra is associated with specific crystals: amethyst for the crown, lapis lazuli for the third eye, blue lace agate for the throat, rose quartz and green aventurine for the heart, citrine for the solar plexus, carnelian for the sacral, and red jasper or black tourmaline for the root. A chakras crystals consultation begins by identifying which chakras need support and selecting the stones that resonate most helpfully.",
    ],
    hindiPhrase: {
      devanagari: 'चक्र संतुलन',
      transliteration: 'chakra santulan',
      english: 'chakra balancing',
    },
  },
  howItWorks: {
    heading: 'How a Crystal Healing Session Works',
    paragraphs: [
      "You lie down fully clothed on a therapy bed. Saurabh begins with a brief chakra scan, sometimes through pendulum work, sometimes by hand, to identify which centres are depleted, congested, or over-active. Crystals are then placed on or around each chakra point in a pattern chosen for your specific needs.",
      "You rest for 25–30 minutes while the crystals work. Soft music, gentle incense, and a silent room support the relaxation. A closing sequence grounds the energy and removes the crystals in a specific order. Post-session, you receive suggestions for a small personal stone or two you can carry with you, and simple care instructions, cleansing with running water, moonlight, or a short smoke cleanse.",
    ],
  },
  problemsAddressed: {
    heading: 'What Crystal Healing Can Support',
    intro: 'Crystal therapy chakra balancing is most often sought for:',
    items: [
      'General stress relief and nervous system support',
      'Grounding and restlessness (root chakra)',
      'Creativity and emotional flow (sacral chakra)',
      'Self-confidence and decisive action (solar plexus)',
      'Heart healing after loss or conflict (heart chakra)',
      'Clear communication and voice (throat chakra)',
      'Focus, meditation, and intuition (third eye)',
      'Spiritual connection and inner quiet (crown)',
    ],
  },
  session: {
    heading: 'Your Session with Saurabh Jain',
    paragraphs: [
      "A crystal healing session runs 60–75 minutes. Wear comfortable clothes; remove metal jewellery for the session itself. Please hydrate before and after, and plan for a slower hour afterwards if possible.",
      "Sessions are available in person at the Ahmedabad centre, crystal healing is particularly rich in person because of the sensory layer, and a distance version is also offered by video call, in which Saurabh guides you through placing your own set of stones with clear instructions. Crystal grid therapy for home, office, or altar can be designed remotely. English and Hindi are both welcome.",
    ],
  },
  whySoulInfinity: {
    heading: 'Why Soul Infinity for Crystal Healing',
    paragraphs: [
      "The crystal market is cluttered with dubious sales pitches. Saurabh Jain's practice keeps crystal work simple, grounded, and free of fear-based upselling. K.N. Rao Institute training in classical Vedic astrology adds useful context, for instance, when a gemstone prescription overlaps usefully with a healing crystal choice, the two practices can support each other without confusion. The practice has served 200+ clients with a 4.9★ Google rating, and crystals are never presented as a replacement for medical care or for substantive astrological remedies.",
    ],
  },
  cta: {
    heading: 'Book Your Crystal Healing Session',
    body: 'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.',
    whatsappMessage: "Hi, I'm interested in Crystal Healing session",
  },
  faqs: [
    {
      question: 'What is crystal healing and how does it work?',
      answer:
        "Crystal healing uses the vibrational properties of specific stones placed on or near chakra points to support energetic balance. It is a complementary therapy, gentle and non-invasive, often used alongside other practices.",
    },
    {
      question: 'How long is a typical crystal healing Ahmedabad session?',
      answer:
        "Around 60 to 75 minutes, including the chakra scan at the start and the grounding sequence at the end.",
    },
    {
      question: 'Is crystal healing different from gemstone energy healing in Vedic astrology?',
      answer:
        "Yes. Vedic gemstone recommendation prescribes a specific stone worn on the body to strengthen a planet based on your birth chart. Crystal healing uses a range of stones placed on chakras for a single session, with a different aim and technique.",
    },
    {
      question: 'Do I need to buy my own crystals?',
      answer:
        "No, the studio has a working set for in-person sessions. For distance sessions, Saurabh can suggest a minimal starter set you can source locally from any reliable mineral shop.",
    },
    {
      question: 'Can crystal grid therapy be done at home?',
      answer:
        "Yes. A crystal grid is a patterned arrangement of stones designed for a specific intent, home protection, study focus, fertility support. Saurabh can design one remotely and share a simple layout diagram over WhatsApp.",
    },
    {
      question: 'Are healing crystals India clients can source locally reliable?',
      answer:
        "Yes, with care. Reputable mineral sellers in India stock good-quality stones. Saurabh provides a short checklist for basic authenticity and suggests the kinds of stones to avoid in single-session work.",
    },
    {
      question: 'How do I clean and care for my crystals?',
      answer:
        "Running water for most stones (avoiding water-sensitive ones like selenite), moonlight, or a short sage smoke cleanse resets most crystals. The session ends with a short written care note personalised to the stones you carry away.",
    },
  ],
};

/** Full content map keyed by `${category}/${slug}`. */
export const SERVICE_CONTENT: Readonly<Record<string, ServiceContent>> = {
  'vedic-astrology/parashari-jyotish': PARASHARI,
  'vedic-astrology/bnn': BNN,
  'vedic-astrology/kp-astrology': KP,
  'vedic-astrology/astro-vastu': ASTRO_VASTU,
  'vedic-astrology/gem-stone': GEM_STONE,
  'western-astrology/tarot-card': TAROT,
  'western-astrology/symbol-analysis': SYMBOL,
  'western-astrology/past-life-regression': PLR,
  'healing/reiki': REIKI,
  'healing/pranic-healing': PRANIC,
  'healing/theta-healing': THETA,
  'healing/crystal-healing': CRYSTAL,
};

export function getServiceContent(category: string, slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT[`${category}/${slug}`];
}
