import React from 'react';
import { createRoot } from 'react-dom/client';
import '../postcss/style.pcss';

createRoot(document.getElementsByClassName('js-root')[0]).render(
  <div>Hello</div>,
);
