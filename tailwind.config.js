module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      opacity: {
        10: '0.1',
        85: '0.85'
      },
      colors: {
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121'
        }
      }
    },
    aspectRatio: {
      'none': 0,
      'square': [1, 1],
      '16-9': [16, 9],
      '9-14': [9, 14]
    }
  },
  plugins: [
    require('tailwindcss-aspect-ratio')
  ]
}
