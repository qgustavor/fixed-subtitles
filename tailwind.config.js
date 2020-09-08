/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.ts',
    ],
    options: {
      whitelist: [
        'schema-dark',
      ],
    },
  },
  theme: {
    darkSelector: '.schema-dark',
    extend: {
      opacity: {
        10: '0.1',
        85: '0.85',
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
    },
  },
  variants: {
    cursor: ['responsive', 'disabled'],
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'hover', 'disabled'],
    borderColor: ['dark', 'dark-disabled', 'dark-focus', 'dark-active', 'active', 'focus', 'disabled'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'active', 'disabled'],
    opacity: ['dark', 'hover', 'active', 'focus', 'disabled'],
    aspectRatio: ['responsive']
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('tailwindcss-aspect-ratio')
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    applyComplexClasses: true,
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true,
  },
}
