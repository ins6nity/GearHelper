'use client';

import React from 'react';
import { EquippedItem, getItemStats, GearSlotType } from '@/data/items';
import {
    formatCost,
    formatSilverPerStat,
    calculateUpgradeOptions,
    UpgradeOption
} from '@/data/enhancement';

interface StatsPanelProps {
    gear: Map<GearSlotType, EquippedItem>;
}

export default function StatsPanel({ gear }: StatsPanelProps) {
    // Calculate total stats
    let totalAP = 0;
    let totalAAP = 0;
    let totalDP = 0;

    gear.forEach((equipped) => {
        const stats = getItemStats(equipped);
        totalAP += stats.ap;
        totalAAP += stats.aap;
        totalDP += stats.dp;
    });

    const gearscore = totalAP + totalAAP + totalDP;

    // Get upgrade recommendations
    const top3Upgrades = calculateUpgradeOptions(gear).slice(0, 3);

    return (
        <div className="stats-panel">
            <div className="stats-panel-header">
                <span className="stats-icon">📊</span>
                <h2 className="stats-panel-title">Estatísticas</h2>
            </div>

            {/* Gearscore Display */}
            <div className="gearscore-display">
                <div className="gearscore-value">{gearscore}</div>
                <div className="gearscore-label">Gearscore</div>
            </div>

            {/* Main Stats */}
            <div className="main-stats">
                <div className="main-stat ap">
                    <div className="main-stat-value">{totalAP}</div>
                    <div className="main-stat-label">AP</div>
                </div>
                <div className="main-stat aap">
                    <div className="main-stat-value">{totalAAP}</div>
                    <div className="main-stat-label">AAP</div>
                </div>
                <div className="main-stat dp">
                    <div className="main-stat-value">{totalDP}</div>
                    <div className="main-stat-label">DP</div>
                </div>
                <div className="main-stat gs">
                    <div className="main-stat-value">{Math.round(gearscore / 3)}</div>
                    <div className="main-stat-label">Média</div>
                </div>
            </div>

            {/* Upgrade Recommendations */}
            {top3Upgrades.length > 0 && (
                <div className="recommendation-section">
                    <h3 className="section-title">
                        <span className="title-icon">🤖</span>
                        Próximos Upgrades Recomendados
                    </h3>

                    {top3Upgrades.map((upgrade, index) => (
                        <UpgradeCard key={upgrade.slot} upgrade={upgrade} rank={index + 1} />
                    ))}
                </div>
            )}

            {top3Upgrades.length === 0 && gear.size > 0 && (
                <div className="no-upgrades">
                    <span className="emoji">🎉</span>
                    <p>Todos os itens estão no nível máximo!</p>
                </div>
            )}

            {gear.size === 0 && (
                <div className="empty-gear-message">
                    <span className="emoji">👆</span>
                    <p>Clica nos slots para adicionar o teu gear!</p>
                </div>
            )}

            <style jsx>{`
        .stats-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          position: sticky;
          top: var(--spacing-lg);
        }
        
        .stats-panel-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border-subtle);
        }
        
        .stats-icon {
          font-size: 1.25rem;
        }
        
        .stats-panel-title {
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .gearscore-display {
          background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
          border: 1px solid var(--accent-gold);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          text-align: center;
          margin-bottom: var(--spacing-lg);
          box-shadow: 0 0 30px rgba(212, 168, 83, 0.15);
        }
        
        .gearscore-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-gold), #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gearscore-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .main-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }
        
        .main-stat {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
          transition: all 0.2s ease;
        }
        
        .main-stat:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }
        
        .main-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .main-stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: var(--spacing-xs);
        }
        
        .main-stat.ap .main-stat-value { color: var(--enhance-red); }
        .main-stat.aap .main-stat-value { color: var(--enhance-orange); }
        .main-stat.dp .main-stat-value { color: var(--enhance-blue); }
        .main-stat.gs .main-stat-value { color: var(--accent-gold); }
        
        .recommendation-section {
          margin-top: var(--spacing-lg);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border-subtle);
        }
        
        .section-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent-purple);
          margin-bottom: var(--spacing-md);
        }
        
        .title-icon {
          font-size: 1rem;
        }
        
        .no-upgrades, .empty-gear-message {
          text-align: center;
          padding: var(--spacing-xl);
          color: var(--text-secondary);
        }
        
        .emoji {
          font-size: 2rem;
          display: block;
          margin-bottom: var(--spacing-sm);
        }
      `}</style>
        </div>
    );
}

// Upgrade Card sub-component
function UpgradeCard({ upgrade, rank }: { upgrade: UpgradeOption; rank: number }) {
    const isFirst = rank === 1;

    return (
        <div className={`upgrade-card ${isFirst ? 'best' : ''}`}>
            <div className="upgrade-rank">#{rank}</div>
            <div className="upgrade-content">
                <div className="upgrade-item">
                    <span className="item-icon">{upgrade.currentItem?.item.icon}</span>
                    <span className="item-name">{upgrade.currentItem?.item.name}</span>
                </div>
                <div className="upgrade-details">
                    <span className="upgrade-level">
                        Nível {upgrade.currentItem?.enhanceLevel} → {upgrade.newEnhanceLevel}
                    </span>
                    <div className="upgrade-gains">
                        {upgrade.apGain > 0 && <span className="gain ap">+{upgrade.apGain} AP</span>}
                        {upgrade.aapGain > 0 && <span className="gain aap">+{upgrade.aapGain} AAP</span>}
                        {upgrade.dpGain !== 0 && (
                            <span className={`gain dp ${upgrade.dpGain < 0 ? 'negative' : ''}`}>
                                {upgrade.dpGain > 0 ? '+' : ''}{upgrade.dpGain} DP
                            </span>
                        )}
                    </div>
                </div>
                <div className="upgrade-cost">
                    <span className="cost-value">{formatCost(upgrade.estimatedCost)}</span>
                    <span className="cost-efficiency">{formatSilverPerStat(upgrade.silverPerStat)}</span>
                </div>
            </div>

            <style jsx>{`
        .upgrade-card {
          display: flex;
          align-items: stretch;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-sm);
          transition: all 0.2s ease;
        }
        
        .upgrade-card:hover {
          border-color: var(--border-medium);
          transform: translateX(4px);
        }
        
        .upgrade-card.best {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
          border-color: var(--accent-purple);
        }
        
        .upgrade-rank {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        
        .upgrade-card.best .upgrade-rank {
          color: var(--accent-purple);
        }
        
        .upgrade-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        .upgrade-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .item-icon {
          font-size: 1rem;
        }
        
        .item-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .upgrade-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }
        
        .upgrade-level {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .upgrade-gains {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .gain {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
        }
        
        .gain.ap { color: var(--enhance-red); }
        .gain.aap { color: var(--enhance-orange); }
        .gain.dp { color: var(--enhance-blue); }
        .gain.negative { color: var(--enhance-red); }
        
        .upgrade-cost {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-top: var(--spacing-xs);
        }
        
        .cost-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent-gold);
        }
        
        .cost-efficiency {
          font-size: 0.65rem;
          color: var(--text-muted);
        }
      `}</style>
        </div>
    );
}
