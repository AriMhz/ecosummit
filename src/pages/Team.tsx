import React, { useEffect } from 'react';
import { TeamHeroLeadership } from '../components/team';

export const Team: React.FC = () => {
  useEffect(() => {
    document.title = 'Our Team — Local Experts & Mountain Masters | EcoSummit Nepal';
  }, []);

  return (
    <div className="w-full bg-[#F2F5F8] text-[#17201D] overflow-x-hidden">
      {/* Team Section: Mountain Backdrop + 5 Team Member Cards */}
      <TeamHeroLeadership />
    </div>
  );
};
