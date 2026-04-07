export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Egyptian palette
        'egypt-black':  '#080808',
        'egypt-dark':   '#0D0B05',
        'egypt-gold':   '#C9A84C',
        'egypt-light':  '#E8D5A0',
        'egypt-dim':    '#8A7A5A',
        'egypt-border': 'rgba(201,168,76,0.3)',

        // Legacy compat
        base:      '#080808',
        card:      '#0D0B05',
        elevated:  '#111111',
        accent:    '#C9A84C',
        cyan:      '#C9A84C',
        gold:      '#C9A84C',
        danger:    '#C0392B',
        success:   '#27AE60',
        'text-primary':   '#F5ECD0',
        'text-secondary': '#8A7A5A',
        'text-faint':     '#4A3D28',
        border:    'rgba(201,168,76,0.25)',
        'border-glow':    'rgba(201,168,76,0.5)',
      },
      fontFamily: {
        display: ['Cinzel Decorative', 'Cinzel', 'serif'],
        serif:   ['IM Fell English', 'Georgia', 'serif'],
        caps:    ['Cinzel', 'serif'],
        body:    ['IM Fell English', 'Georgia', 'serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'float':       'float 4s ease-in-out infinite',
        'gold-pulse':  'goldPulse 3s ease-in-out infinite',
        'shimmer':     'borderShimmer 2s ease-in-out infinite',
        'fade-in':     'fadeIn 0.4s ease-out',
        'shake':       'shake 0.35s ease-in-out',
        'spin-slow':   'spin 3s linear infinite',
        'title-reveal':'titleReveal 1.2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201,168,76,0.25)' },
          '50%': { boxShadow: '0 0 30px rgba(201,168,76,0.55), 0 0 60px rgba(201,168,76,0.15)' },
        },
        borderShimmer: {
          '0%':   { borderColor: 'rgba(201,168,76,0.25)' },
          '50%':  { borderColor: 'rgba(201,168,76,0.9)' },
          '100%': { borderColor: 'rgba(201,168,76,0.25)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        titleReveal: {
          '0%':   { opacity: '0', letterSpacing: '0.8em' },
          '100%': { opacity: '1', letterSpacing: '0.4em' },
        },
      },
      boxShadow: {
        'gold-glow':   '0 0 24px rgba(201,168,76,0.4)',
        'gold-strong': '0 0 40px rgba(201,168,76,0.6)',
        'card-egypt':  '0 8px 40px rgba(0,0,0,0.8), 0 0 30px rgba(201,168,76,0.15)',
      },
    },
  },
};
