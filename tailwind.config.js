/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
      fontWeight: {
        // figma:portafolio (etXO98CZ) — start
        "figma-light": "300",
        "figma-normal": "400",
        "figma-medium": "500",
        "figma-semibold": "600",
        "figma-bold": "700",
        "figma-black": "900",
        // figma:portafolio (etXO98CZ) — end
      },
      lineHeight: {
        // figma:portafolio (etXO98CZ) — start
        "figma-14": "14px",
        "figma-15": "15px",
        "figma-16": "16px",
        "figma-18": "18px",
        "figma-20": "20px",
        "figma-21": "21px",
        "figma-23": "23px",
        "figma-24": "24px",
        "figma-28": "28px",
        "figma-32": "32px",
        "figma-36": "36px",
        "figma-60": "60px",
        "figma-72": "72px",
        "figma-96": "96px",
        "figma-288": "288px",
        "figma-320": "320px",
        // figma:portafolio (etXO98CZ) — end
      },
      fontSize: {
        // figma:portafolio (etXO98CZ) — start
        "figma-9": "9px",
        "figma-10": "10px",
        "figma-11": "11px",
        "figma-12": "12px",
        "figma-14": "14px",
        "figma-15": "15px",
        "figma-16": "16px",
        "figma-18": "18px",
        "figma-20": "20px",
        "figma-24": "24px",
        "figma-30": "30px",
        "figma-60": "60px",
        "figma-72": "72px",
        "figma-96": "96px",
        "figma-288": "288px",
        "figma-320": "320px",
        // figma:portafolio (etXO98CZ) — end
      },
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			sm: '6px',
  			md: '10px',
  			lg: '16px',
  			xl: '24px',
  			pill: '999px'
  		},
  		colors: {
        // figma:portafolio (etXO98CZ) — start
        "figma-primary": "hsl(var(--figma-primary))",
        "figma-secondary": "hsl(var(--figma-secondary))",
        "figma-accent": "hsl(var(--figma-accent))",
        "figma-muted": "hsl(var(--figma-muted))",
        "figma-surface": "hsl(var(--figma-surface))",
        "figma-border": "hsl(var(--figma-border))",
        "figma-highlight": "hsl(var(--figma-highlight))",
        "figma-subtle": "hsl(var(--figma-subtle))",
        "figma-color-9": "hsl(var(--figma-color-9))",
        "figma-color-10": "hsl(var(--figma-color-10))",
        "figma-color-11": "hsl(var(--figma-color-11))",
        "figma-color-12": "hsl(var(--figma-color-12))",
        "figma-color-13": "hsl(var(--figma-color-13))",
        "figma-color-14": "hsl(var(--figma-color-14))",
        "figma-color-15": "hsl(var(--figma-color-15))",
        "figma-color-16": "hsl(var(--figma-color-16))",
        "figma-color-17": "hsl(var(--figma-color-17))",
        "figma-color-18": "hsl(var(--figma-color-18))",
        "figma-color-19": "hsl(var(--figma-color-19))",
        "figma-color-20": "hsl(var(--figma-color-20))",
        "figma-text-1": "hsl(var(--figma-text-1))",
        "figma-text-2": "hsl(var(--figma-text-2))",
        "figma-text-3": "hsl(var(--figma-text-3))",
        "figma-text-4": "hsl(var(--figma-text-4))",
        "figma-text-5": "hsl(var(--figma-text-5))",
        "figma-text-6": "hsl(var(--figma-text-6))",
        // figma:portafolio (etXO98CZ) — end
      
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				ink: 'hsl(var(--accent-ink))'
  			},
  			surfaceDark: {
  				DEFAULT: 'hsl(var(--surface-dark))',
  				foreground: 'hsl(var(--surface-dark-foreground))',
  				muted: 'hsl(var(--surface-dark-muted))',
  				border: 'hsl(var(--surface-dark-border))',
  				card: 'hsl(var(--surface-dark-card))'
  			},
  			surfaceDeep: 'hsl(var(--surface-deep))',
  			surface1: 'hsl(var(--surface-1))',
  			surface2: 'hsl(var(--surface-2))',
  			surface3: 'hsl(var(--surface-3))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: {
  				DEFAULT: 'hsl(var(--border))',
  				strong: 'hsl(var(--border-strong))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			link: {
  				DEFAULT: 'hsl(var(--link))',
  				hover: 'hsl(var(--link-hover))'
  			},
  			lightSection: {
  				DEFAULT: 'hsl(var(--bg-light))',
  				foreground: 'hsl(var(--text-on-light))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
        // figma:portafolio (etXO98CZ) — start
        "figma-poppins": ['"Poppins"', 'sans-serif'],
        "paragraph": ['"Menlo"', 'sans-serif'],
        // figma:portafolio (etXO98CZ) — end
      
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  			display: ['var(--font-display)'],
  			mono: ['var(--font-mono)'],
  			editorial: ['var(--font-editorial)']
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'marquee': {
  				from: { transform: 'translateX(0)' },
  				to: { transform: 'translateX(-50%)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'marquee': 'marquee 25s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
