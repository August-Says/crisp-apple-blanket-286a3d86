
import React from 'react';

// Component for different heading levels
export const MarkdownHeading = ({ level, text, lineIndex }: { level: number; text: string; lineIndex: number }) => {
  if (level === 1) {
    return <h2 key={lineIndex} className="text-xl font-bold text-navy mt-6 mb-4 text-left">{text}</h2>;
  } else if (level === 2) {
    return <h3 key={lineIndex} className="text-lg font-semibold text-navy mt-5 mb-3 text-left">{text}</h3>;
  } else if (level === 3) {
    return <h4 key={lineIndex} className="text-base font-medium text-navy mt-4 mb-2 text-left">{text}</h4>;
  } else {
    return <h5 key={lineIndex} className="text-sm font-medium text-navy mt-3 mb-2 text-left">{text}</h5>;
  }
};

// Component for bullet points
export const BulletPoint = ({ content, lineIndex }: { content: string; lineIndex: number }) => (
  <div key={lineIndex} className="flex items-start space-x-2 my-1 ml-4 text-left">
    <span className="text-navy">•</span>
    <p className="text-navy/90">{content}</p>
  </div>
);

// Component for numbered lists
export const NumberedItem = ({ 
  number, 
  content, 
  lineIndex 
}: { 
  number: string; 
  content: string; 
  lineIndex: number 
}) => (
  <div key={lineIndex} className="flex items-start space-x-2 my-1 ml-4 text-left">
    <span className="text-navy min-w-[20px]">{number}.</span>
    <p className="text-navy/90">{content}</p>
  </div>
);

// Component for question formatting
export const QuestionItem = ({ 
  parts, 
  lineIndex 
}: { 
  parts: string[]; 
  lineIndex: number 
}) => (
  <div key={lineIndex} className="mt-4 mb-2 text-left">
    <strong className="text-navy">{parts[0]}:</strong>
    <span className="text-navy/90">{parts.slice(1).join(':')}</span>
  </div>
);

// Component for plain text
export const PlainText = ({ content, lineIndex }: { content: string; lineIndex: number }) => (
  <p key={lineIndex} className="my-1 text-navy/90 text-left">{content}</p>
);

// Component for options header
export const OptionsHeader = ({ lineIndex }: { lineIndex: number }) => (
  <div key={lineIndex} className="text-sm font-medium mt-2 mb-1 text-navy/70 text-left">Options:</div>
);

// Component for horizontal rule
export const HorizontalRule = ({ lineIndex }: { lineIndex: number }) => (
  <hr key={lineIndex} className="my-4 border-navy/20" />
);

// Component for empty space
export const EmptySpace = ({ lineIndex }: { lineIndex: number }) => (
  <div key={lineIndex} className="h-4"></div>
);
