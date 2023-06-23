import controls from '../../constants/controls';

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = Math.random() + 1;
    return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = Math.random() + 1;
    return defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    return Math.max(hitPower - blockPower, 0);
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const pressedKeys = new Map();
        const usedCombo = [0, 0];
        const currentHealth = [firstFighter.health, secondFighter.health];
        const healthBars = document.getElementsByClassName('arena___health-bar');
        const initialBarWidth = healthBars[0].clientWidth;

        document.addEventListener('keydown', event => {
            const { code } = event;
            if (code === controls.PlayerOneAttack) {
                pressedKeys.set(code, !pressedKeys.get(controls.PlayerOneBlock));
                if (pressedKeys.get(code)) {
                    const damage = pressedKeys.get(controls.PlayerTwoBlock)
                        ? getDamage(firstFighter, secondFighter)
                        : getHitPower(firstFighter);
                    currentHealth[1] -= damage;
                    healthBars[1].style.width = `${Math.max(
                        (currentHealth[1] * initialBarWidth) / secondFighter.health,
                        0
                    )}px`;
                }
            } else if (code === controls.PlayerTwoAttack) {
                pressedKeys.set(code, !pressedKeys.get(controls.PlayerTwoBlock));
                if (pressedKeys.get(code)) {
                    const damage = pressedKeys.get(controls.PlayerOneBlock)
                        ? getDamage(secondFighter, firstFighter)
                        : getHitPower(secondFighter);
                    currentHealth[0] -= damage;
                    healthBars[0].style.width = `${Math.max(
                        (currentHealth[0] * initialBarWidth) / firstFighter.health,
                        0
                    )}px`;
                }
            } else if (code === controls.PlayerOneBlock) {
                pressedKeys.set(code, true);
            } else if (code === controls.PlayerTwoBlock) {
                pressedKeys.set(code, true);
            } else if (controls.PlayerOneCriticalHitCombination.includes(code)) {
                pressedKeys.set(code, true);
                const isCombo = controls.PlayerOneCriticalHitCombination.reduce((prev, cur) => {
                    return prev && pressedKeys.get(cur);
                }, true);
                if (isCombo) {
                    if (!usedCombo[0]) {
                        const damage = 2 * firstFighter.attack;
                        usedCombo[0] = true;
                        setTimeout(() => {
                            usedCombo[0] = false;
                        }, 10000);
                        currentHealth[1] -= damage;
                        healthBars[1].style.width = `${Math.max(
                            (currentHealth[1] * initialBarWidth) / secondFighter.health,
                            0
                        )}px`;
                    }
                }
            } else if (controls.PlayerTwoCriticalHitCombination.includes(code)) {
                pressedKeys.set(code, true);
                const isCombo = controls.PlayerTwoCriticalHitCombination.reduce((prev, cur) => {
                    return prev && pressedKeys.get(cur);
                }, true);
                if (isCombo) {
                    const damage = 2 * secondFighter.attack;
                    if (!usedCombo[1]) {
                        usedCombo[1] = true;
                        setTimeout(() => {
                            usedCombo[1] = false;
                        }, 10000);
                        currentHealth[0] -= damage;
                        healthBars[0].style.width = `${Math.max(
                            (currentHealth[0] * initialBarWidth) / firstFighter.health,
                            0
                        )}px`;
                    }
                }
            }
            if (currentHealth[0] <= 0) {
                return resolve(secondFighter);
            }
            if (currentHealth[1] <= 0) {
                return resolve(firstFighter);
            }
            return false;
        });

        document.addEventListener('keyup', event => {
            const { code } = event;
            pressedKeys.set(code, false);
        });
    });
}
