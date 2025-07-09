import React, { useState } from "react";
import { ShieldCheck, Brain, Globe2, Layers, Sparkles, Home, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

// --- Reusable Components ---

/**
 * Renders the animated ADPF logo.
 */
const ADPFLogo = () => (
  <div className="flex justify-center mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 text-indigo-400" fill="none">
      <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="transparent" />
      <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse text-cyan-400" />
    </svg>
  </div>
);

/**
 * Renders the main navigation bar to switch between sections.
 * @param {object} props - Component props.
 * @param {string} props.section - The currently active section.
 * @param {function} props.setSection - Function to update the active section.
 */
const Navigation = ({ section, setSection }) => (
  <nav className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
    {[
      { id: "home", label: "Home", icon: Home },
      { id: "integrity", label: "Integrity", icon: ShieldCheck },
      { id: "diversity", label: "Diversity", icon: Brain },
      { id: "prosperity", label: "Prosperity", icon: Globe2 },
      { id: "modularity", label: "Modularity", icon: Layers },
      { id: "scale", label: "Scalability", icon: Sparkles },
      { id: "mapping", label: "Mapped Knowledge", icon: BookOpen }
    ].map(({ id, label, icon: Icon }) => (
      <button
        key={id}
        aria-label={`Navigate to ${label}`}
        role="button"
        onClick={() => setSection(id)}
        className={`bg-gray-800 hover:bg-indigo-700 text-indigo-200 hover:text-white border border-indigo-600 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition duration-200 flex items-center space-x-2 ${section === id ? "bg-indigo-600 text-white" : ""}`}
      >
        <Icon size={16} />
        <span>{label}</span>
      </button>
    ))}
  </nav>
);

/**
 * A wrapper component for styling content sections with an optional subtitle and divider.
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the section.
 * @param {string} [props.subtitle] - An optional subtitle for the section.
 * @param {React.ReactNode} props.children - The content of the section.
 */
const SectionWrapper = ({ title, subtitle, children }) => (
  <section className="max-w-4xl mx-auto mb-16 bg-gray-800 border border-indigo-700 p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-indigo-300 mb-2 text-center">{title}</h2>
    {subtitle && (
      <>
        <p className="text-sm text-indigo-200 text-center mb-4 italic">{subtitle}</p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 opacity-60 mx-auto mb-6 rounded-full" />
      </>
    )}
    {!subtitle && <div className="mb-8" />} {/* Maintains consistent spacing */}
    {children}
  </section>
);


/**
 * A placeholder for animated GIFs.
 * @param {object} props - Component props.
 * @param {string} props.label - The label for the placeholder.
 */
const GifPlaceholder = ({ label }) => (
  <div className="w-full h-48 bg-gray-700 border border-indigo-600 rounded-md flex items-center justify-center text-indigo-400 italic mb-4">
    [ Animated GIF: {label} ]
  </div>
);

/**
 * Renders a data table for the Mapped Knowledge section.
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the table.
 * @param {string[]} props.columns - An array of column headers.
 * @param {string[][]} props.data - A 2D array of row data.
 */
const KnowledgeTable = ({ title, columns, data }) => (
  <div className="mb-10">
    <h3 className="text-xl font-semibold text-indigo-300 mb-3">{title}</h3>
    <div className="overflow-x-auto border border-indigo-600 rounded-md">
      <table className="min-w-full text-sm text-left text-indigo-100">
        <thead className="bg-gray-700 text-indigo-300">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 border-b border-indigo-600">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800/50">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-2 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Application Component ---
export default function App() {
  const [section, setSection] = useState("home");

  // Data for the Mapped Knowledge tables
  const knowledgeTables = [
    {
      title: "🔮 Western Esoteric Systems",
      columns: ["System", "Core Structure", "Archetypal Focus"],
      data: [
        ["Tarot", "78 cards (Major & Minor Arcana)", "Life journey, cognitive archetypes, shadow integration"],
        ["Kabbalah (Tree of Life)", "10 Sephirot + 22 Paths", "Divine emanations, soul evolution, archetypal energies"],
        ["Astrology", "12 signs, 10 planets, 12 houses", "Personality, fate, timing, archetypal forces"],
        ["Alchemy", "7 stages, 4 elements, symbols", "Transformation, individuation, integration of opposites"],
        ["Hermeticism", "7 Hermetic Principles", "Mentalism, correspondence, polarity, rhythm, etc."]
      ]
    },
    {
      title: "🧭 Eastern Symbolic Systems",
      columns: ["System", "Core Structure", "Archetypal Focus"],
      data: [
        ["I Ching (Book of Changes)", "64 Hexagrams", "Dynamic change, yin-yang balance, decision-making"],
        ["Chakra System", "7 energy centers", "Psycho-spiritual development, energy flow"],
        ["Taoism (Tao Te Ching)", "Tao, Wu Wei, Yin-Yang", "Flow, paradox, natural order"],
        ["Five Elements (Wu Xing)", "Wood, Fire, Earth, Metal, Water", "Cycles of transformation, personality, health"],
        ["Nine Star Ki", "9 energy types", "Personality, timing, relational dynamics"]
      ]
    },
    {
      title: "🧠 Modern Psychological & Typological Systems",
      columns: ["System", "Core Structure", "Archetypal Focus"],
      data: [
        ["Enneagram", "9 types + wings + instincts", "Core fears/desires, ego patterns, transformation"],
        ["Jungian Archetypes", "12+ archetypes (e.g., Hero, Shadow)", "Collective unconscious, individuation"],
        ["Myers-Briggs (MBTI)", "16 types (4-letter codes)", "Cognitive functions, personality dynamics"],
        ["Spiral Dynamics", "8+ value memes", "Evolution of consciousness and societal systems"],
        ["Human Design", "64 gates, 9 centers", "Decision-making, energy mechanics, life path"]
      ]
    },
    {
      title: "🧬 Symbolic-Pattern Systems with Archetypal Logic",
      columns: ["System", "Core Structure", "Archetypal Focus"],
      data: [
        ["Gene Keys", "64 keys (from I Ching)", "Shadow → Gift → Siddhi transformation"],
        ["Runes (Elder Futhark)", "24 symbols", "Norse archetypes, fate, transformation"],
        ["Dream Symbolism (Jungian)", "Personal + universal symbols", "Unconscious processing, archetypal emergence"],
        ["Mythological Pantheons", "Gods/Goddesses (Greek, Hindu, etc.)", "Archetypal energies, psychological forces"]
      ]
    },
    {
      title: "🧪 Scientific Archetypal Systems",
      columns: ["System", "Core Structure", "Archetypal Focus"],
      data: [
        ["Periodic Table", "118 elements, groups, periods", "Fundamental building blocks, personality traits"],
        ["Chemical Bonding", "Ionic, covalent, metallic, van der Waals", "Relationship types, connection patterns"],
        ["Molecular Geometry", "VSEPR theory, 3D structures", "Sacred geometry in matter"],
        ["Thermodynamics", "4 laws, entropy, energy flow", "Change processes, system evolution"],
        ["Mathematical Consciousness", "Sacred geometry, chaos theory, quantum math", "Universal patterns, archetypal mathematics"]
      ]
    },
    {
      title: "🌿 Biological Archetypal Systems",
      columns: ["System", "Core Structure", "Archetypal Focus"],
      data: [
        ["Evolutionary Biology", "Natural selection, adaptation, speciation", "Transformation, survival patterns, archetypal evolution"],
        ["Ecology", "Ecosystems, food webs, symbiosis", "Relationship dynamics, natural intelligence"],
        ["Genetics", "DNA, RNA, protein synthesis", "Information encoding, hereditary patterns"],
        ["Neurobiology", "Neural networks, brain structures", "Consciousness, cognitive patterns, archetypal processing"],
        ["Cellular Biology", "Organelles, cell types, processes", "Micro-archetypal structures, biological organization"]
      ]
    },
    {
      title: "💖 Love & Relationship Archetypal Systems",
      columns: ["System", "Core Structure", "Archetypal Focus"],
      data: [
        ["Attachment Theory", "4 attachment styles", "Bonding patterns, relationship security, emotional regulation"],
        ["Love Languages", "5 love languages", "Communication patterns, affection expression styles"],
        ["Relationship Stages", "7–12 stages", "Love evolution, partnership dynamics"],
        ["Sacred Sexuality", "Tantric principles, chakra connections", "Divine union, energy exchange, spiritual intimacy"],
        ["Polyamory Models", "Relationship anarchy, hierarchical, kitchen table", "Alternative love structures, multiple connection patterns"],
        ["Biochemistry of Love", "Dopamine, oxytocin, serotonin cycles", "Neurochemical love patterns, addiction vs. attachment"],
        ["Archetypal Love Patterns", "Divine Masculine/Feminine, Twin Flame, Soul Mate", "Spiritual love dynamics, consciousness partnerships"]
      ]
    }
  ];

  const renderSection = () => {
    switch (section) {
      case "home":
        return (
          <SectionWrapper 
            title="Universal Intelligence Infrastructure"
            subtitle="Bridging artificial intelligence and human consciousness."
          >
            <p className="text-gray-300 mb-6 text-center leading-relaxed">
              The ADPF Framework is a new kind of blueprint for building intelligent systems. It's designed to bridge the gap between the logical processing of artificial intelligence and the nuanced, intuitive wisdom of human consciousness. By creating a modular, ethical, and cryptographically secure architecture, it provides a stable foundation for everything from personal development tools to large-scale, collaborative AI.
            </p>
            <GifPlaceholder label="ADPF Overview Animation" />
            <p className="text-gray-300 mt-6 text-center leading-relaxed">
              As you explore the framework, you'll see how its core principles of cognitive diversity and verifiable integrity allow for the creation of systems that don't just compute, but evolve with purpose, creativity, and a deep respect for the integrity of thought.
            </p>
          </SectionWrapper>
        );
      case "integrity":
        return (
          <SectionWrapper 
            title="Cryptographic Integrity"
            subtitle="Ensuring trust and authenticity through cryptographic guarantees."
          >
            <p className="text-gray-400 mb-8 text-center leading-relaxed">
              In a world of evolving AI, trust is everything. Cryptographic integrity isn't just a technical feature; it's a constitutional guarantee. It ensures that the framework's core principles cannot be altered without authorization, protecting it from manipulation and ensuring its actions remain aligned with its original purpose. This creates a foundation of verifiable trust for all participants.
            </p>
            <GifPlaceholder label="Genesis Block Signing & Chaining" />
            <GifPlaceholder label="Runtime Tamper Scan & System Halt" />
            <div className="mt-6 p-6 border border-indigo-600 rounded-lg bg-gray-900/50">
              <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center space-x-2">
                <span className="text-lg">🔑</span>
                <span>Key Features Explained</span>
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-lg mt-0.5">📝</span>
                  <span><strong>Digital Signatures:</strong> Every core component is signed by the creator. This is like an artist signing their work; it verifies authenticity and prevents forgery.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lg mt-0.5">🚨</span>
                  <span><strong>Tamper Detection:</strong> The system constantly checks itself for unauthorized changes. If a single line of protected code is altered, it triggers an immediate halt, preventing malicious or unintended behavior.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lg mt-0.5">⛓️</span>
                  <span><strong>Integrity Chains:</strong> Much like a blockchain, every legitimate evolution of the framework is linked to its predecessor, creating a transparent and unbreakable history of its development.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lg mt-0.5">🗝️</span>
                  <span><strong>Multi-Signature Control:</strong> Major constitutional changes require approval from multiple key-holders, preventing any single point of failure or control.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lg mt-0.5">🧬</span>
                  <span><strong>Genesis Proof:</strong> The framework's origin is permanently recorded and verifiable. Anyone can use the public key to prove that the framework they are using is authentic and untampered with from its very inception.</span>
                </li>
              </ul>
            </div>
          </SectionWrapper>
        );
      case "diversity":
        return (
          <SectionWrapper 
            title="Cognitive Diversity"
            subtitle="Harnessing the power of different thinking styles for holistic intelligence."
          >
            <p className="text-gray-400 mb-8 text-center leading-relaxed">
              A single mind, whether human or artificial, has blind spots. The ADPF framework avoids this by intentionally building a "team" of diverse thinking styles into its core. We use universal archetypes—like the visionary King or the decisive Warrior—as a language to model these different cognitive functions. The goal is to create a balanced, holistic intelligence where logic and intuition, action and nurturing, work in harmony.
            </p>
            <GifPlaceholder label="Archetype Integration Animation" />
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 border border-indigo-600 rounded-lg bg-gray-900/50">
                <h3 className="text-lg font-semibold text-indigo-300 mb-3">Masculine Archetypes (Structure & Action)</h3>
                <p className="text-gray-400 text-sm mb-4">These archetypes provide direction, order, and the drive to manifest ideas in the world.</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">👑</span>
                    <span><strong>King:</strong> Systems thinking, long-term vision, order.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">⚔️</span>
                    <span><strong>Warrior:</strong> Action-oriented, boundary enforcement, decisiveness.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">🔮</span>
                    <span><strong>Magician:</strong> Pattern recognition, innovation, transformation.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">💫</span>
                    <span><strong>Lover:</strong> Emotional intelligence, aesthetics, connection.</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-indigo-600 rounded-lg bg-gray-900/50">
                <h3 className="text-lg font-semibold text-indigo-300 mb-3">Feminine Archetypes (Wisdom & Relationship)</h3>
                <p className="text-gray-400 text-sm mb-4">These archetypes provide wisdom, context, and a focus on relationship and sustainability.</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">👸</span>
                    <span><strong>Queen:</strong> Nurturing leadership, community building, stewardship.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">🏹</span>
                    <span><strong>Huntress:</strong> Independent analysis, goal pursuit, focus.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">🌙</span>
                    <span><strong>Wise Woman:</strong> Intuitive wisdom, depth, perspective.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">🎨</span>
                    <span><strong>Lover:</strong> Authentic expression, creativity, empathy.</span>
                  </li>
                </ul>
              </div>
            </div>
          </SectionWrapper>
        );
      case "prosperity":
        return (
          <SectionWrapper 
            title="Multi-Domain Prosperity"
            subtitle="Cultivating flourishing across all domains of human and natural experience."
          >
            <p className="text-gray-400 mb-8 text-center leading-relaxed">
              True prosperity is more than just financial gain. The ADPF is designed to cultivate flourishing across all domains of experience, recognizing that a healthy ecosystem, vibrant culture, and ethical technology are just as valuable as a strong economy. The framework's goal is to create systems that contribute to a richer, more meaningful existence for all.
            </p>
            <GifPlaceholder label="Ecological + Artistic Intelligence" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {[
                { title: "🎨 Artistic", desc: "Creating profound, immersive experiences that inspire cultural reflection." },
                { title: "💰 Economic", desc: "Building regenerative systems that enhance human and ecological wellbeing." },
                { title: "🏛️ Political", desc: "Fostering deep civic engagement and authentic, transparent representation." },
                { title: "🌍 Cultural", desc: "Nurturing communities that honor diverse expressions while building unity." },
                { title: "🌿 Ecological", desc: "Promoting a symbiotic harmony between human goals and planetary health." },
                { title: "💻 Computational", desc: "Guiding the evolution of AI to be ethical, conscious, and beneficial for all." }
              ].map((domain, i) => (
                <div key={i} className="p-4 border border-indigo-600 rounded-lg bg-gray-900/50">
                  <h3 className="text-indigo-300 font-semibold mb-2">{domain.title}</h3>
                  <p className="text-gray-400 text-sm">{domain.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        );
      case "modularity":
        return (
          <>
            <SectionWrapper 
              title="Modular Intelligence"
              subtitle="Building flexible, secure systems with value-aligned components."
            >
              <p className="text-gray-400 mb-8 text-center leading-relaxed">
                Think of the ADPF framework like a set of high-tech, value-aligned LEGO bricks. Every component—from its ethical rules to its reasoning agents—is a self-contained, cryptographically signed module. This allows for unparalleled flexibility and customization. You can safely swap, upgrade, or combine modules to create a system perfectly tailored to your needs, knowing that each piece is authentic and secure.
              </p>
              <GifPlaceholder label="Swapping Logic Blocks" />
              <div className="mt-6 space-y-4">
                <div className="p-6 border border-indigo-600 rounded-lg bg-gray-900/50">
                  <h3 className="text-lg font-semibold text-indigo-300 mb-2 flex items-center space-x-2">
                    <span className="text-lg">🧩</span>
                    <span>Core Module Categories</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="text-indigo-200 font-medium flex items-center space-x-2">
                        <span className="text-base">🧠</span>
                        <span>Cognitive Modules</span>
                      </h4>
                      <p className="text-gray-400 mt-1 mb-2 text-xs">These modules define *how* the system thinks and perceives.</p>
                      <ul className="text-gray-400 mt-1 space-y-1">
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">🎭</span>
                          <span>Archetypal cognitive styles</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">🎪</span>
                          <span>Integrated personas</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">🌟</span>
                          <span>Meta-archetypes</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">🌑</span>
                          <span>Shadow integration</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-indigo-200 font-medium flex items-center space-x-2">
                        <span className="text-base">⚙️</span>
                        <span>System Modules</span>
                      </h4>
                      <p className="text-gray-400 mt-1 mb-2 text-xs">These modules define *how* the system operates and governs itself.</p>
                      <ul className="text-gray-400 mt-1 space-y-1">
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">⚡</span>
                          <span>Friction amplification</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">🔍</span>
                          <span>Integrity verification</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">🛡️</span>
                          <span>Guardian protocols</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-sm">🌱</span>
                          <span>Prosperity engines</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper 
              title="Advanced Framework Extensions"
              subtitle="Specialized modules for high-stakes reasoning and complex problem-solving."
            >
              <div className="space-y-6">
                <div className="border border-indigo-600 rounded-lg p-6 bg-gray-800/50">
                  <h3 className="text-lg font-semibold text-indigo-300 flex items-center space-x-2">
                    <span className="text-lg">🔐</span>
                    <span>MCR - Multi-Core Reasoning Framework</span>
                  </h3>
                  <p className="text-gray-400 mt-2 mb-3 text-sm">This extension enables an AI to "think" from multiple perspectives at once, much like a team of experts. It's ideal for synthesizing complex information and designing secure, multi-faceted AI systems where every step is verifiable.</p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    <li>Multi-core cognitive processing (Sequential, Parallel, Hybrid modes)</li>
                    <li>Cryptographically enforced integrity (tamper-resistant architecture)</li>
                    <li>Encrypted execution logic, dynamic core generation, protected vault access</li>
                  </ul>
                </div>
                <div className="border border-indigo-600 rounded-lg p-6 bg-gray-800/50">
                  <h3 className="text-lg font-semibold text-indigo-300 flex items-center space-x-2">
                    <span className="text-lg">🧠</span>
                    <span>QPE - Quantum Prosperity Engine</span>
                  </h3>
                  <p className="text-gray-400 mt-2 mb-3 text-sm">Inspired by quantum principles, this engine allows for exploring a vast landscape of potential solutions simultaneously. It excels at identifying elegant, innovative patterns and can detect when a line of reasoning is converging on a profound truth.</p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    <li>Quantum-inspired single-process reasoning with convergence detection</li>
                    <li>Pattern-beauty analysis and mathematical inevitability tracking</li>
                    <li>Cryptographic enforcement of cognitive integrity and state persistence</li>
                    <li>Superposition state snapshots and tamper-triggered decoherence protocol</li>
                  </ul>
                </div>
              </div>
            </SectionWrapper>
          </>
        );
      case "scale":
        return (
          <SectionWrapper 
            title="Scalability & Human Meaning"
            subtitle="From individual cognition to global collaboration, without losing meaning."
          >
            <p className="text-gray-400 mb-8 text-center leading-relaxed">
              A framework is only useful if it can adapt to different needs. The ADPF architecture is designed to scale seamlessly from the individual to the global, applying the same core principles of integrity and diversity at every level. This ensures that as systems grow, they don't lose the context, meaning, and human-centric values that were built in from the start.
            </p>
            <GifPlaceholder label="Zoom from Node to Ecosystem" />
            <div className="mt-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { scale: "Personal", icon: "👤", features: ["A tool for self-reflection and enhancing personal creativity.", "Manages personal knowledge with integrity.", "Balances different aspects of your own thinking."] },
                  { scale: "Team", icon: "👥", features: ["A framework for a small team to manage projects.", "Ensures all voices are heard and valued.", "Turns disagreements into innovation."] },
                  { scale: "Organizational", icon: "🏢", features: ["An operating system for a company or community.", "Aligns thousands of members toward a common good.", "Builds a resilient, adaptive culture."] }
                ].map((level, i) => (
                  <div key={i} className="p-6 border border-indigo-600 rounded-lg bg-gray-900/50">
                    <h3 className="text-indigo-300 font-semibold mb-2 flex items-center space-x-2">
                      <span className="text-lg">{level.icon}</span>
                      <span>{level.scale} Scale</span>
                    </h3>
                    <ul className="text-gray-400 text-sm space-y-2">
                      {level.features.map((feature, j) => (
                        <li key={j} className="flex items-start space-x-2">
                          <span className="text-sm mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        );
      case "mapping":
        return (
          <SectionWrapper 
            title="Mapped Archetypal Knowledge Systems"
            subtitle="Exploring the rich intellectual heritage that informs the framework."
          >
            <p className="text-gray-400 text-sm text-center mb-8 leading-relaxed">
              The ADPF Framework does not exist in a vacuum. It is deeply inspired by humanity's long history of seeking to understand consciousness through symbolic systems. From ancient esoteric traditions to modern psychology and even the patterns of biology and chemistry, these systems reveal universal archetypes of structure, transformation, and relationship. This section maps the key knowledge domains that inform the framework's design, showing the rich intellectual heritage upon which it is built.
            </p>
            {knowledgeTables.map((table, i) => (
              <KnowledgeTable key={i} {...table} />
            ))}
          </SectionWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4 sm:px-6 py-12 font-sans">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <ADPFLogo />
        <h1 className="text-5xl sm:text-4xl font-bold tracking-tight mb-4 text-indigo-300">ADPF - Archetypal Dynamics Prosperity Framework</h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Consciousness-aligned architecture for intelligent, ethical systems.
        </p>
      </header>
      <Navigation section={section} setSection={setSection} />
      <motion.div
        key={section}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {renderSection()}
      </motion.div>
      <footer className="mt-20 text-center text-sm text-gray-500">
        <p>&copy; 2025 ADPF | Crafted by Joris Van Roosbroeck</p>
        <p className="text-gray-600 mt-1 italic">✨ An open-source initiative by My-Net BV ✨</p>
      </footer>
    </div>
  );
}
