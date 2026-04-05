export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base:      '#08080E',
        card:      '#111119',
        elevated:  '#17171F',
        accent:    '#7B6EF6',
        cyan:      '#1BE0D4',
        gold:      '#F5C542',
        danger:    '#F04A57',
        success:   '#22D77B',
        'text-primary':   '#EEEEF8',
        'text-secondary': '#9494B8',
        'text-faint':     '#4A4A6A',
        border:    '#222236',
        'border-glow':    '#3A3A60',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'accent-glow':   '0 0 20px rgba(123,110,246,0.35)',
        'card-spades':   '0 0 24px rgba(123,110,246,0.2)',
        'card-hearts':   '0 0 24px rgba(240,74,87,0.2)',
        'card-diamonds': '0 0 24px rgba(245,197,66,0.2)',
        'card-clubs':    '0 0 24px rgba(27,224,212,0.2)',
      },
      animation: {
        'shake':          'shake 0.3s ease-in-out',
        'pulse-glow':     'pulse-glow 0.6s ease-out',
        'float':          'float 6s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'fade-in':        'fade-in 0.4s ease-out',
        'tick-up':        'tick-up 0.3s ease-out',
        'spin-slow':      'spin 3s linear infinite',
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-8px)' },
          '40%':     { transform: 'translateX(8px)' },
          '60%':     { transform: 'translateX(-6px)' },
          '80%':     { transform: 'translateX(6px)' },
        },
        'pulse-glow': {
          '0%':   { boxShadow: '0 0 0 0 rgba(34,215,123,0.6)' },
          '70%':  { boxShadow: '0 0 0 20px rgba(34,215,123,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34,215,123,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(40px)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'tick-up': {
          '0%':   { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',   opacity: '1' },
        },
      },
    },
  },
};
