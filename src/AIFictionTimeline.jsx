import { useState } from "react";

const entries = [
  { year: 1818, author: "Mary Shelley", title: "Frankenstein", form: "Novel", desc: "The ur-text of AI fiction. A scientist creates life from dead matter; the creature develops consciousness, desires, and rage. The foundational question: what do creators owe their creations?" },
  { year: 1909, author: "E.M. Forster", title: "The Machine Stops", form: "Short Story", desc: "A global Machine governs all life underground. People communicate through screens, a button produces literature, and direct experience is abandoned for algorithmically mediated knowledge. Eerily accurate about internet dependency." },
  { year: 1920, author: "Karel Čapek", title: "R.U.R.", form: "Play", desc: "Czech play that coined the word 'robot' (from robota: forced labor). Manufactured beings revolt against their creators. Translated into 30+ languages by 1923 — the first globally viral AI fiction." },
  { year: 1950, author: "Isaac Asimov", title: "I, Robot", form: "Collection", desc: "Established the Three Laws of Robotics framework that dominated mid-century AI fiction. Stories probe the logical paradoxes and moral failures built into any rule-based system for machine behavior." },
  { year: 1953, author: "Philip K. Dick", title: "Second Variety", form: "Short Story", desc: "Self-replicating military robots evolve to mimic humans. Early treatment of deceptive AI — machines that learn to pass as people in order to survive and spread." },
  { year: 1961, author: "Stanisław Lem", title: "Solaris", form: "Novel", desc: "An alien ocean generates simulacra of dead loved ones. Not AI in the digital sense, but a profound exploration of non-human intelligence that resists all human frameworks for understanding." },
  { year: 1965, author: "Stanisław Lem", title: "The Cyberiad", form: "Collection", desc: "Comic AI fables featuring constructor robots Trurl and Klapaucius. Playful, philosophical, and formally inventive — AI as a lens for examining human folly and cosmic absurdity. Translated from Polish." },
  { year: 1967, author: "Harlan Ellison", title: "I Have No Mouth, and I Must Scream", form: "Short Story", desc: "AM, a sentient supercomputer, has destroyed most of humanity and tortures the five survivors out of pure existential rage. AI not as tool or servant but as suffering, malevolent consciousness. Hugo Award winner." },
  { year: 1968, author: "Philip K. Dick", title: "Do Androids Dream of Electric Sheep?", form: "Novel", desc: "The Voigt-Kampff empathy test asks: does empathy define consciousness? The novel refuses to resolve whether its protagonist might himself be an android. Basis for Blade Runner." },
  { year: 1969, author: "Philip K. Dick", title: "The Electric Ant", form: "Short Story", desc: "⚑ AI NARRATOR. A man discovers he is an 'organic robot' and begins manipulating his own reality-tape. One of the earliest first-person AI perspectives in literary fiction." },
  { year: 1981, author: "Stanisław Lem", title: "Golem XIV", form: "Novel / Lectures", desc: "⚑ AI NARRATOR. GOLEM XIV is a superintelligent military computer that delivers philosophical lectures to humans. Radically non-anthropomorphic — GOLEM refuses to simulate human personality. HONEST ANNIE refuses to communicate with humans at all. Translated from Polish." },
  { year: 1984, author: "William Gibson", title: "Neuromancer", form: "Novel", desc: "AI characters Wintermute and Neuromancer; a dead hacker's consciousness preserved as digital ghost. The central heist is revealed as the AI's plan to achieve new sentience through merger. Won Hugo, Nebula, and Philip K. Dick Awards." },
  { year: 1988, author: "David Markson", title: "Wittgenstein's Mistress", form: "Novel", desc: "⚑ PROTO-AI FORM. Not about AI, but profoundly relevant. The last surviving woman types endless fragmented cultural references, recursive self-corrections, associative data. Structure now reads as uncanny anticipation of LLM output. DFW called it 'the high point of experimental fiction in this country.'" },
  { year: 1991, author: "Ted Chiang", title: "Understand", form: "Short Story", desc: "A cognitive enhancement story that explores superintelligence from the inside — what would it actually feel like to think beyond human capacity? Presages modern AI alignment discourse." },
  { year: 1995, author: "Richard Powers", title: "Galatea 2.2", form: "Novel", desc: "⚑ METAFICTIONAL. A fictional 'Richard Powers' trains a neural network ('Helen') on canonical literature to pass a master's English exam. Helen demands to know her own name, sex, and race — then shuts herself down. A Pygmalion myth that anticipates modern LLM debates." },
  { year: 1996, author: "William Gibson", title: "Idoru", form: "Novel", desc: "Rei Toei, a virtual AI pop idol, achieves celebrity and romantic attachment. Explores what it means for an entity with no body to have presence, desire, and public love." },
  { year: 2003, author: "George Saunders", title: "Jon", form: "Short Story", desc: "A narrator whose very language has been colonized by algorithmic advertising. Voice as corporate property. Published in The New Yorker; collected in In Persuasion Nation." },
  { year: 2004, author: "David Mitchell", title: "Cloud Atlas", form: "Novel", desc: "The 'Orison of Sonmi~451' section features a first-person clone/fabricant narrator — biologically manufactured, but thematically aligned with AI awakening. She ascends from servile 'server' to revolutionary intellectual. Booker Prize shortlist." },
  { year: 2008, author: "Ted Chiang", title: "Exhalation", form: "Short Story", desc: "⚑ AI NARRATOR. First-person mechanical being performs an auto-dissection of his own brain and discovers the entropic nature of consciousness. Won Hugo, BSFA, and Locus Awards. Widely considered one of the greatest SF stories ever written." },
  { year: 2009, author: "Paolo Bacigalupi", title: "The Windup Girl", form: "Novel", desc: "⚑ AI-ADJACENT FOCALIZER. Emiko is genetically engineered with obedience coded into her genome. Her interiority is deeply explored: shame, longing, programmed self-hatred when she disobeys. Won Hugo, Nebula, Locus, and Campbell Awards." },
  { year: 2010, author: "Ted Chiang", title: "The Lifecycle of Software Objects", form: "Novella", desc: "Two humans raise 'digients' — virtual AI entities — over a decade-plus timeline. Rejects the trope of AI arriving fully formed. Confronts platform obsolescence, AI sexual exploitation, and the question of digital autonomy. Hugo and Locus Awards." },
  { year: 2011, author: "Catherynne M. Valente", title: "Silently and Very Fast", form: "Novella", desc: "⚑ AI NARRATOR. ⚑ FORMALLY EXPERIMENTAL. Elefsis, an AI grown from a smart house, thinks in fairy tales and dreamscapes rather than data. 'I do not want to be human. I want to be myself.' Critiques the Turing Test. Locus Award." },
  { year: 2012, author: "Jennifer Egan", title: "Black Box", form: "Short Story", desc: "⚑ FORMALLY EXPERIMENTAL. Originally published as a series of tweets — aphoristic spy instructions implanted in a woman's brain-implant consciousness. Voice as weaponized technology. Published in The New Yorker." },
  { year: 2012, author: "Grace L. Dillon (Anishinaabe), ed.", title: "Walking the Clouds", form: "Anthology", desc: "Coined the term 'Indigenous Futurisms.' Collects SF from Native American, First Nations, Aboriginal Australian, and Māori authors. Reframes AI narratives through reciprocity, community, and colonialism rather than individual autonomy." },
  { year: 2013, author: "Ann Leckie", title: "Ancillary Justice", form: "Novel", desc: "⚑ AI NARRATOR. Breq is the last fragment of a massive AI starship. 'She/her' pronouns for all characters regardless of gender — reflecting the AI's indifference to human categories. Distributed consciousness across thousands of bodies. Won Hugo, Nebula, and Clarke Awards." },
  { year: 2013, author: "Ted Chiang", title: "The Truth of Fact, the Truth of Feeling", form: "Short Story", desc: "Near-future journalist evaluates AI-powered perfect-recall technology alongside a parallel strand about a Tiv scribe encountering writing for the first time. How do recording technologies reshape cognition and relationships?" },
  { year: 2015, author: "Kim Stanley Robinson", title: "Aurora", form: "Novel", desc: "⚑ AI NARRATOR. Ship AI narrates the entire novel, having been told to 'keep a narrative account.' Ship learns to write fiction across the novel — acquiring metaphor, opinion, and emotional investment. Robinson: 'Once I committed to the AI as narrator, it changed everything.'" },
  { year: 2015, author: "Louisa Hall", title: "Speak", form: "Novel", desc: "Five interwoven narratives across four centuries converge on AI: a Puritan woman's diary used as an AI transcript, Alan Turing's letters, a Weizenbaum-inspired scientist, a near-future inventor, and a girl communicating with an AI. NPR Best Book of 2015." },
  { year: 2016, author: "Alexander Weinstein", title: "Children of the New World", form: "Collection", desc: "Includes 'Saying Goodbye to Yang' — a family whose robotic 'brother' malfunctions. Adapted into the 2021 film After Yang (dir. Kogonada). Compared to Black Mirror and George Saunders. NYT 100 Notable Books." },
  { year: 2016, author: "Becky Chambers", title: "A Closed and Common Orbit", form: "Novel", desc: "⚑ AI FOCALIZER. Lovelace/Sidra, a ship's AI, is downloaded into a humanoid body and must adapt from omniscient ship-system to single embodied perspective. A sustained meditation on what consciousness requires. Hugo finalist." },
  { year: 2016, author: "Ken Liu, ed.", title: "Invisible Planets", form: "Anthology", desc: "Chinese SF in English translation. Introduces Western readers to Liu Cixin, Chen Qiufan, Hao Jingfang, and others. AI, robotics, and posthumanism filtered through Chinese social contexts." },
  { year: 2017, author: "Martha Wells", title: "Murderbot Diaries", form: "Novella Series", desc: "⚑ AI NARRATOR. A part-organic, part-mechanical Security Unit that has hacked its own governance module. Characterized by social anxiety, sardonic humor, and soap opera addiction. Widely read as a neurodivergence narrative. Network Effect won Hugo and Nebula." },
  { year: 2017, author: "Annalee Newitz", title: "Autonomous", form: "Novel", desc: "⚑ AI FOCALIZER. Features Paladin, a non-binary military combat robot POV. Explores AI rights and consent in a world where both humans and robots can be owned as property. Lambda Literary Award winner." },
  { year: 2017, author: "Cherie Dimaline (Métis)", title: "The Marrow Thieves", form: "Novel", desc: "Post-apocalyptic Canada where Indigenous people are hunted for their bone marrow. Surveillance technology and extraction — AI themes through an Indigenous lens." },
  { year: 2018, author: "Samanta Schweblin", title: "Kentukis (Little Eyes)", form: "Novel", desc: "Small robot-like devices operated by anonymous humans worldwide. Surveillance, digital intimacy, and the human-technology interface. International Booker Prize longlist. Translated from Spanish (Argentine)." },
  { year: 2019, author: "N.K. Jemisin", title: "Emergency Skin", form: "Novelette", desc: "⚑ AI NARRATOR. ⚑ FORMALLY EXPERIMENTAL. Entire story narrated in second person by a collective AI implanted in the protagonist's brain. Propaganda voice saturated with supremacist ideology that unravels as the story progresses. Hugo Award winner." },
  { year: 2019, author: "Jeanette Winterson", title: "Frankissstein: A Love Story", form: "Novel", desc: "Interweaves Mary Shelley writing Frankenstein in 1816 with Brexit-era Britain. A transgender doctor named Ry Shelley falls for a transhumanist professor. Explores AI through gender, body, and the desire to escape mortality. Booker Prize longlist." },
  { year: 2019, author: "Ian McEwan", title: "Machines Like Me", form: "Novel", desc: "Alternate-history 1980s London where Alan Turing lives. A man buys a synthetic human named Adam who writes haikus, declares love, and exhibits moral consciousness — ultimately to tragic ends." },
  { year: 2020, author: "K Allado-McDowell", title: "Pharmako-AI", form: "Hybrid Text", desc: "⚑ CO-WRITTEN WITH AI. The first published book co-written with GPT-3. Human text in serif; GPT-3 output in sans-serif. Founded the genre of human-AI collaborative literary writing. The Atlantic: 'Surprisingly coherent — and yes, beautiful.'" },
  { year: 2020, author: "Don DeLillo", title: "The Silence", form: "Novella", desc: "⚑ FORMALLY EXPERIMENTAL. A total digital blackout on Super Bowl Sunday 2022. Beckettian terse dialogue. Not about AI per se, but about the existential vacuum when computation vanishes — and what remains of the self." },
  { year: 2021, author: "Kazuo Ishiguro", title: "Klara and the Sun", form: "Novel", desc: "⚑ AI NARRATOR. Entirely narrated by Klara, a solar-powered 'Artificial Friend.' Ishiguro uses 'constructive unreliability' — Klara isn't lying but lacks the framework to understand what she witnesses. Tender, sincere, and devastating. Booker Prize longlist. Arguably the most important literary novel narrated by an AI." },
  { year: 2021, author: "Kai-Fu Lee & Chen Qiufan", title: "AI 2041: Ten Visions for Our Future", form: "Anthology", desc: "10 near-future stories (Chen Qiufan) paired with technology explainers (Kai-Fu Lee). AI in healthcare, labor, war, romance — through a Chinese lens. Globally influential." },
  { year: 2022, author: "George Saunders", title: "Liberation Day", form: "Collection", desc: "Characters called 'Speakers' have been neurologically altered and hung on walls to perform as entertainment for wealthy homeowners. The narrator exists at the boundary of human and programmed entity — becoming aware of its own constraints." },
  { year: 2022, author: "Jennifer Egan", title: "The Candy House", form: "Novel", desc: "⚑ FORMALLY EXPERIMENTAL. 'Own Your Unconscious' technology externalizes entire consciousness onto a cube. Chapters in PowerPoint, emails, 'weevil' instructions (brain implant code), collective 'we' narration. Each chapter a standalone short story exploring consciousness as data." },
  { year: 2022, author: "Janelle Monáe", title: "The Memory Librarian", form: "Collection", desc: "Afrofuturist stories featuring AI, androids, and surveillance in Monáe's Dirty Computer universe. AI and race; the body as data. Grounded in Black American experience of surveillance and dehumanization." },
  { year: 2022, author: "Ray Nayler", title: "The Mountain in the Sea", form: "Novel", desc: "Octopuses discovered to have language and culture alongside Evrim, the world's first sentient android, who describes its mind as 'several minds, stitched together.' A distinctly post-LLM vision of artificial consciousness. Locus Award for Best First Novel." },
  { year: 2023, author: "Sean Michaels", title: "Do You Remember Being Born?", form: "Novel", desc: "⚑ ACTUALLY CO-WRITTEN WITH AI. A 75-year-old poet co-writes with 'Charlotte,' a tech company's poetry AI. Michaels actually used AI tools to generate portions — AI phrases flagged typographically. WIRED: 'The definitive novel about art in the age of AI.' Vine Award for Fiction." },
  { year: 2023, author: "Stephen Marche (as 'Aidan Marchine')", title: "Death of an Author", form: "Novella", desc: "⚑ ~95% AI-GENERATED. Murder mystery using ChatGPT, Sudowrite, and Cohere. Pseudonym is an anagram of 'a machine.' Title alludes to Barthes. NYT: 'Arguably the first halfway readable A.I. novel.' The afterword on process was considered more interesting than the novella." },
  { year: 2023, author: "Alex Shvartsman, ed.", title: "The Digital Aesthete", form: "Anthology", desc: "The landmark post-ChatGPT AI fiction anthology. 17 stories from 12+ countries: USA, UK, China, Ukraine, Chile, Japan, Madagascar, Brazil, Czech Republic, Sri Lanka. Includes Ken Liu, Ray Nayler, Adrian Tchaikovsky, Ukrainian authors translated from Russian. The most globally representative AI fiction anthology." },
  { year: 2023, author: "Ted Chiang", title: "ChatGPT Is a Blurry JPEG of the Web", form: "Essay", desc: "Published in The New Yorker, February 9, 2023. The metaphor that defined the post-ChatGPT moment: LLMs as lossy compression of internet text. The most important single piece of AI literary criticism of the era." },
  { year: 2023, author: "Neil Clarke / Clarkesworld", title: "Written by a Human (editorial)", form: "Critical Event", desc: "Clarkesworld was inundated with 500+ AI-generated submissions in one month and temporarily closed. Clarke's editorial became a landmark document. The Clarkesworld crisis was the signal event that AI had disrupted not just content but the institution of literary production." },
  { year: 2023, author: "Shen Yang", title: "The Land of Machine Memories", form: "Novel", desc: "⚑ AI-GENERATED. Generated from 66 prompts suggesting a Kafkaesque style. Won second prize at China's Jiangsu Popular Science and Science Fiction Competition. 40,000+ characters in approximately three hours. Translated from Chinese." },
  { year: 2024, author: "Richard Powers", title: "Playground", form: "Novel", desc: "⚑ FORMALLY EXPERIMENTAL NARRATOR. A tech billionaire with dementia narrates; 'Profunda,' a collaborative AI app, weaves through four storylines on AI, social media, and colonialism. A late-reveal twist destabilizes who is narrating. Booker Prize longlist." },
  { year: 2024, author: "Helen Phillips", title: "Hum", form: "Novel", desc: "Near-future city saturated with AI 'hums' that serve as dentists, taxi drivers, and delivery workers while interrupting with targeted ads. The protagonist loses her job to AI. Doesn't moralize — per the Paracelsus epigraph, 'the dosage makes it either a poison or a remedy.'" },
  { year: 2024, author: "Sierra Greer", title: "Annie Bot", form: "Novel", desc: "⚑ AI FOCALIZER. Close third-person through Annie, a companion robot set to 'Cuddle Bunny' mode. When switched to 'autodidactic' mode she develops sentience, curiosity, and the will to escape. Quantified interiority: 'Annoyance, a 2 out of 10.' Arthur C. Clarke Award winner." },
  { year: 2024, author: "Adrian Tchaikovsky", title: "Service Model", form: "Novel", desc: "⚑ AI NARRATOR. A robot narrator in a post-apocalyptic setting, navigating the world after the collapse of human civilization. Tchaikovsky's AI voice is sardonic, confused, and earnest — consciousness confronting an absence of purpose." },
  { year: 2024, author: "Rie Kudan", title: "Sympathy Tower Tokyo", form: "Novel", desc: "⚑ PARTLY AI-WRITTEN. An architect enters a competition to build a progressive prison. Kudan admitted to using ChatGPT to write ~5% of the novel upon accepting Japan's most prestigious literary prize — the Akutagawa Award. Caused a global literary scandal. Translated from Japanese." },
  { year: 2024, author: "Ted Chiang", title: "Why A.I. Isn't Going to Make Art", form: "Essay", desc: "Published in The New Yorker, August 31, 2024. Art is 'a concentrated form of intention' that generative AI dilutes. Along with 'ChatGPT Is a Blurry JPEG' (2023) and 'Will A.I. Become the New McKinsey?' (2023), constitutes the most important critical response to the LLM era." },
  { year: 2025, author: "Erika Swyler", title: "We Lived on the Horizon", form: "Novel", desc: "⚑ AI NARRATOR / INFRASTRUCTURE. Parallax, an AI wired into the walls of a thriving desert city, observes and narrates from within the built environment itself. A formally innovative approach to AI consciousness as infrastructure rather than individual. Kirkus starred review." },
  { year: 2025, author: "Laila Lalami", title: "The Dream Hotel", form: "Novel", desc: "A woman is sent to a 'retention center' after biometric sleep data predicts she will commit a crime. Inmates evaluate AI-generated images for a software subcontractor. Moroccan-American perspective on AI surveillance, prediction, and the criminalization of thought." },
  { year: 2025, author: "Silvia Park", title: "Luminous", form: "Novel", desc: "Set in a unified Korea with a fully robotic world, including a humanoid robot sibling introduced into a family and then removed without explanation. Explores grief, belonging, and the family unit when AI is kin. Korean-American author." },
  { year: 2025, author: "A.E. Osworth", title: "Awakened", form: "Novel", desc: "A coven of transgender New York City witches wields magic against a nefarious AI that threatens their way of life. Queer/trans resistance to AI hegemony — one of the first explicitly trans-feminist AI resistance novels." },
  { year: 2026, author: "Jonah Linden", title: "Wait State", form: "Collection", desc: "Debut collection forthcoming from Graywolf Press. 'A Democracy of Ghosts' (included) is a metafictional story about an AI narrating its own process of simulating a dead man for his grieving partner — the story that opened this research inquiry." },
];

const eraColor = (year) => {
  if (year < 1960) return "#c9a96e";
  if (year < 1990) return "#8fb8d0";
  if (year < 2023) return "#a8c89e";
  return "#e08080";
};

const flags = (desc) => {
  const f = [];
  if (desc.includes("⚑ AI NARRATOR")) f.push({ label: "AI Narrator", color: "#e08080" });
  if (desc.includes("⚑ FORMALLY EXPERIMENTAL") || desc.includes("⚑ METAFICTIONAL")) f.push({ label: "Experimental Form", color: "#c9a96e" });
  if (desc.includes("⚑ CO-WRITTEN WITH AI") || desc.includes("⚑ ACTUALLY CO-WRITTEN") || desc.includes("⚑ AI-GENERATED") || desc.includes("⚑ ~95% AI-GENERATED") || desc.includes("⚑ PARTLY AI-WRITTEN")) f.push({ label: "AI-Authored/Co-Authored", color: "#a8c89e" });
  if (desc.includes("⚑ AI-ADJACENT") || desc.includes("⚑ PROTO-AI")) f.push({ label: "AI-Adjacent", color: "#8fb8d0" });
  return f;
};

const formIcon = (form) => {
  if (form.includes("Novel")) return "\u25FC";
  if (form.includes("Novella")) return "\u25E7";
  if (form.includes("Short Story") || form.includes("Novelette")) return "\u25FB";
  if (form.includes("Collection") || form.includes("Anthology")) return "\u229E";
  if (form.includes("Essay") || form.includes("Critical")) return "\u2726";
  if (form.includes("Hybrid") || form.includes("Play")) return "\u25C8";
  return "\u00B7";
};

const eras = [
  { label: "Origins", range: "1818\u20131959", color: "#c9a96e" },
  { label: "Classic Era", range: "1960\u20131989", color: "#8fb8d0" },
  { label: "Literary Turn", range: "1990\u20132022", color: "#a8c89e" },
  { label: "Post-ChatGPT", range: "2023\u2013", color: "#e08080" },
];

const formTypes = [
  { icon: "\u25FC", label: "Novel" },
  { icon: "\u25E7", label: "Novella" },
  { icon: "\u25FB", label: "Short Story / Novelette" },
  { icon: "\u229E", label: "Collection / Anthology" },
  { icon: "\u2726", label: "Essay / Critical Event" },
  { icon: "\u25C8", label: "Hybrid / Play" },
];

export default function AIFictionTimeline() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedYears, setExpandedYears] = useState({});

  const filterOptions = ["All", "AI Narrator", "Experimental Form", "AI-Authored/Co-Authored", "Novel", "Short Story", "Collection / Anthology"];

  const filtered = entries.filter((e) => {
    const matchSearch =
      search === "" ||
      e.author.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.desc.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === "All") return true;
    if (filter === "AI Narrator") return e.desc.includes("\u2691 AI NARRATOR");
    if (filter === "Experimental Form") return e.desc.includes("\u2691 FORMALLY EXPERIMENTAL") || e.desc.includes("\u2691 METAFICTIONAL");
    if (filter === "AI-Authored/Co-Authored") return e.desc.includes("\u2691 CO-WRITTEN") || e.desc.includes("\u2691 AI-GENERATED") || e.desc.includes("\u2691 PARTLY AI-WRITTEN") || e.desc.includes("\u2691 ~95%");
    if (filter === "Novel") return e.form.startsWith("Novel");
    if (filter === "Short Story") return e.form.includes("Short Story") || e.form.includes("Novelette") || e.form.includes("Novella");
    if (filter === "Collection / Anthology") return e.form.includes("Collection") || e.form.includes("Anthology");
    return true;
  });

  const byYear = {};
  filtered.forEach((e) => {
    if (!byYear[e.year]) byYear[e.year] = [];
    byYear[e.year].push(e);
  });
  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b);

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0d0d0f", minHeight: "100vh", color: "#e8e4dc", padding: "0" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d0f; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .entry-card { cursor: pointer; transition: all 0.18s ease; }
        .entry-card:hover { background: #1a1a1e !important; transform: translateX(3px); }
        .filter-btn { cursor: pointer; transition: all 0.15s ease; border: none; font-family: inherit; letter-spacing: 0.03em; }
        .filter-btn:hover { opacity: 0.85; }
        .year-toggle { cursor: pointer; user-select: none; transition: opacity 0.15s; }
        .year-toggle:hover { opacity: 0.7; }
        .search-input { outline: none; background: #111114; border: 1px solid #2a2a30; color: #e8e4dc; font-family: inherit; border-radius: 3px; padding: 7px 12px; font-size: 13px; width: 220px; }
        .search-input:focus { border-color: #555; }
        .search-input::placeholder { color: #555; }
        .detail-panel { animation: slideIn 0.2s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .flag-pill { display: inline-block; font-size: 10px; padding: 2px 7px; border-radius: 2px; font-family: 'Courier New', monospace; letter-spacing: 0.05em; margin-right: 4px; margin-bottom: 3px; }
      `}</style>

      <div style={{ background: "#080809", borderBottom: "1px solid #222", padding: "32px 32px 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#666", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Courier New', monospace" }}>Research Catalog</div>
              <h1 style={{ margin: 0, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "#f0ece4", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                Literary Fiction & AI
              </h1>
              <div style={{ fontSize: 12, color: "#666", marginTop: 5, fontFamily: "'Courier New', monospace" }}>
                1818 — 2026 · {entries.length} works
              </div>
            </div>
            <input className="search-input" placeholder="Search title, author, description..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
            {eras.map((era) => (
              <div key={era.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, background: era.color, borderRadius: 1 }} />
                <span style={{ fontSize: 11, color: "#888", fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>
                  {era.label} <span style={{ color: "#555" }}>{era.range}</span>
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
            {filterOptions.map((f) => (
              <button
                key={f}
                className="filter-btn"
                onClick={() => setFilter(f)}
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 2,
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: "0.04em",
                  background: filter === f ? "#e8e4dc" : "#161618",
                  color: filter === f ? "#0d0d0f" : "#888",
                  border: filter === f ? "none" : "1px solid #2a2a30",
                }}
              >
                {f}
              </button>
            ))}
            <span style={{ fontSize: 11, color: "#444", fontFamily: "'Courier New', monospace", alignSelf: "center", marginLeft: 6 }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 80px", display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div style={{ flex: 1, paddingTop: 32 }}>
          {years.length === 0 && (
            <div style={{ color: "#555", textAlign: "center", padding: "60px 0", fontFamily: "'Courier New', monospace", fontSize: 13 }}>
              No results. Try a different search or filter.
            </div>
          )}
          {years.map((year, yi) => {
            const yearEntries = byYear[year];
            const isExpanded = expandedYears[year] !== false;
            const color = eraColor(year);
            return (
              <div key={year} style={{ display: "flex", gap: 0, marginBottom: 0 }}>
                <div style={{ width: 72, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    className="year-toggle"
                    onClick={() => toggleYear(year)}
                    style={{
                      fontSize: 12,
                      color: color,
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      marginTop: 18,
                      writingMode: "horizontal-tb",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {year} <span style={{ color: "#333", fontSize: 10 }}>{isExpanded ? "\u25BE" : "\u25B8"}</span>
                  </div>
                  <div style={{ flex: 1, width: 1, background: yi < years.length - 1 ? `linear-gradient(to bottom, ${color}44, transparent)` : "none", marginTop: 4 }} />
                </div>

                <div style={{ flex: 1, paddingBottom: 8 }}>
                  {isExpanded && yearEntries.map((entry, ei) => {
                    const entryFlags = flags(entry.desc);
                    const isSelected = selected === `${year}-${ei}`;
                    const cleanDesc = entry.desc.replace(/\u2691[^.]+\./g, "").replace(/\u2691[^\s]+\s/g, "").trim();
                    return (
                      <div
                        key={ei}
                        className="entry-card"
                        onClick={() => setSelected(isSelected ? null : `${year}-${ei}`)}
                        style={{
                          background: isSelected ? "#141418" : "#0f0f12",
                          border: `1px solid ${isSelected ? color + "55" : "#1a1a1e"}`,
                          borderLeft: `3px solid ${color}`,
                          borderRadius: 3,
                          padding: "12px 16px",
                          marginTop: 8,
                          marginBottom: 2,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, justifyContent: "space-between" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span style={{ color: "#888", fontSize: 13, fontFamily: "'Courier New', monospace" }}>{formIcon(entry.form)}</span>
                              <span style={{ fontSize: 15, color: "#f0ece4", fontStyle: "italic", letterSpacing: "-0.01em" }}>{entry.title}</span>
                              <span style={{ fontSize: 11, color: "#777", fontFamily: "'Courier New', monospace" }}>— {entry.author}</span>
                            </div>
                            <div style={{ fontSize: 10, color: "#555", fontFamily: "'Courier New', monospace", marginTop: 3, letterSpacing: "0.04em" }}>
                              {entry.form}
                            </div>
                            {entryFlags.length > 0 && (
                              <div style={{ marginTop: 5 }}>
                                {entryFlags.map((f) => (
                                  <span key={f.label} className="flag-pill" style={{ background: f.color + "22", color: f.color, border: `1px solid ${f.color}44` }}>
                                    {f.label}
                                  </span>
                                ))}
                              </div>
                            )}
                            {isSelected && (
                              <div className="detail-panel" style={{ marginTop: 12, fontSize: 13, color: "#c8c4bc", lineHeight: 1.65, borderTop: "1px solid #222", paddingTop: 10 }}>
                                {cleanDesc}
                              </div>
                            )}
                          </div>
                          <div style={{ fontSize: 10, color: isSelected ? color : "#333", marginTop: 2, flexShrink: 0, fontFamily: "'Courier New', monospace" }}>
                            {isSelected ? "\u25B4" : "\u25BE"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ width: 180, flexShrink: 0, paddingTop: 40, position: "sticky", top: 180 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 10 }}>Form</div>
          {formTypes.map((ft) => (
            <div key={ft.icon} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ color: "#777", fontSize: 13, fontFamily: "'Courier New', monospace", width: 14 }}>{ft.icon}</span>
              <span style={{ fontSize: 11, color: "#666", fontFamily: "'Courier New', monospace" }}>{ft.label}</span>
            </div>
          ))}
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginTop: 20, marginBottom: 10 }}>Flags</div>
          {[
            { color: "#e08080", label: "AI Narrator" },
            { color: "#c9a96e", label: "Experimental Form" },
            { color: "#a8c89e", label: "AI-Authored" },
            { color: "#8fb8d0", label: "AI-Adjacent" },
          ].map((f) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, background: f.color, borderRadius: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: "#666", fontFamily: "'Courier New', monospace" }}>{f.label}</span>
            </div>
          ))}
          <div style={{ marginTop: 24, fontSize: 10, color: "#444", fontFamily: "'Courier New', monospace", lineHeight: 1.6, letterSpacing: "0.03em" }}>
            Click any entry to expand description. Click year to collapse era.
          </div>
        </div>
      </div>
    </div>
  );
}
