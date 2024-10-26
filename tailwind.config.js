module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('rtl', '&[dir="rtl"]'); // يضيف الفئة rtl
    },
  ],
};

