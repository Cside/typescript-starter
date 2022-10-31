import React from 'react';
import { createRoot } from 'react-dom/client';

window.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementsByClassName('js-root')[0]).render(
    <div>Hello</div>,
  );
});
