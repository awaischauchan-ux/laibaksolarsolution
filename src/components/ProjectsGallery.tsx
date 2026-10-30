import React, { useState } from 'react';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Language, ProjectItem } from '../types';
import { translations } from '../translations';
import { PROJECTS_GALLERY } from '../data/electricalData';

interface ProjectsGalleryProps {
  language: Language;
  onBookClick: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  language,
  onBookClick,
}) => {
  const t = translations[language];
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'solar'>('all');

  const filteredProjects = PROJECTS_GALLERY.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              {language === 'ur' ? 'حالیہ کام کا نمونہ' : language === 'ur_roman' ? 'Portfolio aur Gallery' : 'Proven Workmanship'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {t.projects.title}
            </h2>
            <p className="mt-3 text-base text-neutral-400">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Interactive filter tabs (clean segmented buttons with functional state) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.projects.all}
            </button>
            <button
              type="button"
              onClick={() => setFilter('residential')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filter === 'residential'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.projects.residential}
            </button>
            <button
              type="button"
              onClick={() => setFilter('commercial')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filter === 'commercial'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.projects.commercial}
            </button>
            <button
              type="button"
              onClick={() => setFilter('solar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filter === 'solar'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.projects.solar}
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-neutral-900/60 rounded-xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-72 sm:h-80 w-full overflow-hidden relative bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: project.imagePosition || 'center' }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-neutral-950/80 backdrop-blur-md rounded-md border border-neutral-700">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-wrap gap-2">
                    {project.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-neutral-300 bg-neutral-800/80 px-2.5 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Request Similar Work</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
