// AI Bot Decision Engine for SDGs Board Game: MC THE GREEN CHOICE

export const BOT_AVATARS = [
  { name: 'บอทช้างส้ม 🐘', avatar: '🐘', color: 'amber' },
  { name: 'บอทนกฟ้า 🦅', avatar: '🦅', color: 'sky' },
  { name: 'บอทกวางชมพู 🦌', avatar: '🦌', color: 'pink' },
  { name: 'บอทเสือทอง 🐯', avatar: '🐯', color: 'amber' },
  { name: 'บอทแพนด้า 🐼', avatar: '🐼', color: 'emerald' },
  { name: 'บอทหมาป่า 🐺', avatar: '🐺', color: 'sky' }
];

/**
 * Evaluates whether the bot should purchase an unowned property
 */
export function botShouldBuyProperty(bot, deed) {
  if (!bot || !deed) return false;
  // Bot maintains a safety buffer of cash so it doesn't bankrupt easily
  const safetyBuffer = 800;
  return bot.balance >= deed.price + safetyBuffer;
}

/**
 * Chooses which owned deed the bot should place a Hazard card on
 */
export function botChooseHazardDeed(bot, ownedDeeds) {
  if (!ownedDeeds || ownedDeeds.length === 0) return null;
  // Bot prefers placing hazard on deeds with fewest factories/lowest price
  const sorted = [...ownedDeeds].sort((a, b) => {
    if (a.factories !== b.factories) return a.factories - b.factories;
    return a.price - b.price;
  });
  return sorted[0];
}

/**
 * Checks if the bot holds any solution card that can cure an active hazard on the board
 */
export function botFindCurableHazard(bot, deeds, sdgCards) {
  if (!bot.cards || bot.cards.length === 0) return null;

  for (const cardId of bot.cards) {
    const card = sdgCards.find(c => c.id === cardId);
    if (card && card.type === 'solution' && card.cures) {
      // Find if any deed is contaminated with this hazard
      // Prioritize bot's own deeds first, then other deeds
      const matchingDeeds = deeds.filter(d => d.hazard === card.cures);
      if (matchingDeeds.length > 0) {
        const ownMatching = matchingDeeds.find(d => d.owner === bot.id);
        const targetDeed = ownMatching || matchingDeeds[0];
        return {
          deed: targetDeed,
          solutionCardId: card.id,
          hazardId: card.cures
        };
      }
    }
  }
  return null;
}

/**
 * Decides whether the bot should upgrade/build a factory on an owned deed
 */
export function botFindFactoryToBuild(bot, ownedDeeds) {
  // Only build if bot has plenty of cash (> 2,500)
  if (bot.balance < 2500 || !ownedDeeds || ownedDeeds.length === 0) return null;

  // Find deeds with < 4 factories where bot can afford the factoryCost
  const upgradeable = ownedDeeds.filter(d => d.factories < 4 && bot.balance >= d.factoryCost + 1200);
  if (upgradeable.length === 0) return null;

  // Prioritize highest return deed
  upgradeable.sort((a, b) => b.rent[b.factories + 1] - a.rent[a.factories + 1]);
  return upgradeable[0];
}

/**
 * Chooses steal target
 */
export function botChooseStealTarget(bot, allPlayers) {
  const opponents = allPlayers.filter(p => p.id !== bot.id && p.balance > 0);
  if (opponents.length === 0) return null;

  // Prioritize opponent with cards
  const withCards = opponents.filter(p => p.cards && p.cards.length > 0);
  if (withCards.length > 0) {
    // Steal from opponent with most cards
    withCards.sort((a, b) => b.cards.length - a.cards.length);
    return { targetId: withCards[0].id, type: 'card' };
  }

  // Otherwise steal money from richest opponent
  opponents.sort((a, b) => b.balance - a.balance);
  return { targetId: opponents[0].id, type: 'money' };
}
