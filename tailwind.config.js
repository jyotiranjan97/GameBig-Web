module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['active'],
      backgroundColor: ['active'],
      textColor: ['visited'],
    },
  },
};
