import React from 'react';

export const CinematicStory: React.FC = () => {
  const words = ['Arrive.', 'Breathe.', 'Walk.', 'Discover.', 'Remember.'];

  return (
    <section className="relative w-full py-32 md:py-48 bg-[#0E1412] text-white overflow-hidden flex items-center justify-center">
      {/* Background Cinematic Himalaya Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=2400&q=85"
          alt="Atmospheric clouds floating across sacred Himalayan peaks"
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-45 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1412] via-transparent to-[#0E1412]" />
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Foreground Narrative Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#C6B59A] block mb-6">
          The Himalayan Essence
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8">
          Some Journeys <br />
          <span className="italic font-normal text-[#F7F6F1]">Stay With You.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-14">
          Beyond the physical summit lies a quiet clarity known only to those who have walked the high paths.
        </p>

        {/* Word Sequence */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
          {words.map((word, index) => (
            <div key={index} className="flex items-center gap-4 sm:gap-8 md:gap-12">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-[#C6B59A] hover:text-white transition-colors duration-300">
                {word}
              </span>
              {index < words.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
