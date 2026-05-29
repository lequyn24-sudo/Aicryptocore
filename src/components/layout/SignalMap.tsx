'use client'

import { Info, TrendingUp } from 'lucide-react'

// ── Sparkline data (10 points, normalised 0-100) ──
const SPARKLINES = {
  momentum:     [45, 52, 48, 60, 58, 70, 65, 72, 78, 82],
  infra:        [50, 55, 58, 54, 62, 60, 66, 68, 72, 75],
  reliability:  [70, 68, 72, 65, 60, 58, 62, 60, 64, 63],
  narrative:    [55, 62, 68, 72, 75, 78, 82, 80, 85, 88],
  capital:      [58, 60, 62, 58, 65, 63, 66, 68, 67, 70],
}

function Sparkline({
  values,
  color,
  fillColor,
}: {
  values: number[]
  color: string
  fillColor: string
}) {
  const W = 90; const H = 36
  const min = Math.min(...values); const max = Math.max(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W
    const y = H - ((v - min) / range) * H * 0.85 - 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const area = `M${pts[0]} ${pts.join(' L')} L${W},${H} L0,${H} Z`
  const line = `M${pts.join(' L')}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-9" preserveAspectRatio="none">
      <path d={area} fill={fillColor} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  strong:   { label: 'Strong',   bg: 'rgba(34,197,94,0.15)',  text: '#16a34a' },
  moderate: { label: 'Moderate', bg: 'rgba(245,158,11,0.15)', text: '#d97706' },
  very_hot: { label: 'Very Hot', bg: 'rgba(239,68,68,0.15)',  text: '#dc2626' },
}

const SIGNALS = [
  {
    key: 'momentum',
    icon: '🚀',
    iconBg: 'rgba(20,184,166,0.15)',
    label: 'Agent Momentum',
    value: 78,
    change: '+12.4%',
    status: 'strong',
    color: '#14B8A6',
    fillColor: 'rgba(20,184,166,0.12)',
  },
  {
    key: 'infra',
    icon: '📦',
    iconBg: 'rgba(147,197,253,0.15)',
    label: 'Infra Expansion',
    value: 72,
    change: '+8.7%',
    status: 'strong',
    color: '#60a5fa',
    fillColor: 'rgba(96,165,250,0.12)',
  },
  {
    key: 'reliability',
    icon: '🗄️',
    iconBg: 'rgba(245,158,11,0.15)',
    label: 'Data Reliability',
    value: 64,
    change: '+5.1%',
    status: 'moderate',
    color: '#f59e0b',
    fillColor: 'rgba(245,158,11,0.10)',
  },
  {
    key: 'narrative',
    icon: '🔥',
    iconBg: 'rgba(239,68,68,0.15)',
    label: 'Narrative Heat',
    value: 81,
    change: '+15.6%',
    status: 'very_hot',
    color: '#ef4444',
    fillColor: 'rgba(239,68,68,0.10)',
  },
  {
    key: 'capital',
    icon: '⏱️',
    iconBg: 'rgba(196,181,253,0.15)',
    label: 'Capital Activity',
    value: 69,
    change: '+6.3%',
    status: 'strong',
    color: '#a78bfa',
    fillColor: 'rgba(167,139,250,0.10)',
  },
]

const BOTTOM_STATS = [
  { label: 'Active Projects',         value: '2,847', change: '+18.3%' },
  { label: 'On-chain AI Txns (7D)',    value: '1.24M', change: '+22.7%' },
  { label: 'AI Protocols Tracked',    value: '468',   change: '+14.1%' },
  { label: 'Funding (30D)',            value: '$412M', change: '+31.4%' },
  { label: 'Partnerships (30D)',       value: '147',   change: '+27.6%' },
]

export function SignalMap() {
  return (
    <section className="mb-8 rounded-2xl border border-glass overflow-hidden bg-surface">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-glass">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}>
            AI × Crypto Signal Map
          </span>
          <Info size={14} className="text-[var(--color-text-muted)]" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          Updated just now
        </div>
      </div>

      {/* Signal cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-glass">
        {SIGNALS.map((sig) => {
          const status = STATUS_STYLES[sig.status]
          const data = SPARKLINES[sig.key as keyof typeof SPARKLINES]
          return (
            <div key={sig.key} className="p-4 flex flex-col gap-2.5">
              {/* Icon + label */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                  style={{ background: sig.iconBg }}
                >
                  {sig.icon}
                </div>
                <span className="text-xs font-medium text-[var(--color-text-secondary)] leading-tight">
                  {sig.label}
                </span>
              </div>

              {/* Value */}
              <div>
                <span className="text-3xl font-bold text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {sig.value}
                </span>
              </div>

              {/* Change */}
              <div className="flex items-center gap-1 text-xs font-semibold text-[#22c55e]">
                <TrendingUp size={12} />
                {sig.change}
              </div>

              {/* Sparkline */}
              <Sparkline values={data} color={sig.color} fillColor={sig.fillColor} />

              {/* Status badge */}
              <div>
                <span
                  className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: status.bg, color: status.text }}
                >
                  {status.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-glass border-t border-glass">
        {BOTTOM_STATS.map((stat) => (
          <div key={stat.label} className="px-4 py-3 flex flex-col gap-0.5">
            <span className="text-xs text-[var(--color-text-muted)]">{stat.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-[#22c55e] flex items-center gap-0.5">
                <TrendingUp size={10} /> {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
