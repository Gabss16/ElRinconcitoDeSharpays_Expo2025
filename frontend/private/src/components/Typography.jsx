// components/Typography.js
import React from 'react';

const styles = {
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#222',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 500,
    color: '#666',
    marginBottom: '0.4rem',
  },
  subsubtitle: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#666',
    marginBottom: '0.3rem',
  },
  paragraph: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#222',
    marginBottom: '1rem',
  },
};

export const Title = ({ children, style = {}, ...props }) => (
  <h1 style={{ ...styles.title, ...style }} {...props}>
    {children}
  </h1>
);

export const Subtitle = ({ children, style = {}, ...props }) => (
  <h2 style={{ ...styles.subtitle, ...style }} {...props}>
    {children}
  </h2>
);

export const Subsubtitle = ({ children, style = {}, ...props }) => (
  <h3 style={{ ...styles.subsubtitle, ...style }} {...props}>
    {children}
  </h3>
);

export const Paragraph = ({ children, style = {}, ...props }) => (
  <p style={{ ...styles.paragraph, ...style }} {...props}>
    {children}
  </p>
);
