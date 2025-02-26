import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="section-header">
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeader;