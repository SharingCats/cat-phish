import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ocean: {
					deep: 'hsl(var(--ocean-deep))',
					mid: 'hsl(var(--ocean-mid))',
					light: 'hsl(var(--ocean-light))',
					surface: 'hsl(var(--ocean-surface))'
				},
				fish: {
					orange: 'hsl(var(--fish-orange))',
					yellow: 'hsl(var(--fish-yellow))',
					purple: 'hsl(var(--fish-purple))',
					green: 'hsl(var(--fish-green))',
					coral: 'hsl(var(--fish-coral))'
				},
				catfish: {
					orange: 'hsl(var(--catfish-orange))',
					stripe: 'hsl(var(--catfish-stripe))',
					belly: 'hsl(var(--catfish-belly))'
				},
				bubble: 'hsl(var(--bubble))',
				glow: 'hsl(var(--glow))',
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'swim': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(-2deg)'
					},
					'50%': {
						transform: 'translateY(-10px) rotate(2deg)'
					}
				},
				'bubble-float': {
					'0%': {
						transform: 'translateY(0px) scale(0.8)',
						opacity: '0.7'
					},
					'50%': {
						transform: 'translateY(-50px) scale(1)',
						opacity: '0.9'
					},
					'100%': {
						transform: 'translateY(-100px) scale(0.8)',
						opacity: '0'
					}
				},
				'fish-swim': {
					'0%': {
						transform: 'translateX(100vw) translateY(0px)'
					},
					'100%': {
						transform: 'translateX(-200px) translateY(20px)'
					}
				},
				'tail-wiggle': {
					'0%, 100%': {
						transform: 'rotate(-5deg)'
					},
					'50%': {
						transform: 'rotate(5deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'swim': 'swim 3s ease-in-out infinite',
				'bubble-float': 'bubble-float 4s linear infinite',
				'fish-swim': 'fish-swim 8s linear infinite',
				'tail-wiggle': 'tail-wiggle 0.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
