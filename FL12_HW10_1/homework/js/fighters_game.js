function Fighter(parametersObj) {
    let parameters = parametersObj;
    parameters.totalHP = parameters.hp;
    parameters.wins = 0;
    parameters.losses = 0;

    return {
        getName: () => parameters.name,
        getDamage: () => parameters.damage,
        getStrength: () => parameters.strength,
        getAgility: () => parameters.agility,
        getHealth: () => parameters.hp,
        heal: (value) => {
            value + parameters.hp <= parameters.totalHP ?
            parameters.hp += value :
            parameters.hp = parameters.totalHP;
        },
        dealDamage: (value) => {
            parameters.hp - value >= 0 ?
            parameters.hp -= value :
            parameters.hp = 0;
        },
        attack: (fighter) => {
            const MAX_SUCCESS_LEVEL = 1;
            const SUCCESS_COEF = 100;
            let success = MAX_SUCCESS_LEVEL - (parameters.agility + parameters.strength) / SUCCESS_COEF;
            if (Math.random() <= success) {
                fighter.dealDamage(parameters.damage);
                console.log(`${parameters.name} makes ${parameters.damage} damage to ${fighter.getName()}`);
            } else {
                console.log(`${parameters.name} attack missed`);
            }
        },
        logCombatHistory: () => console.log(`Name: ${parameters.name}, ` +
                                            `Wins: ${parameters.wins}, ` +
                                            `Losses: ${parameters.losses}`),

        addWin: () => parameters.wins++,
        addLoss: () => parameters.losses++
    };
}

function battle(firstFighter, secondFighter) {
    if (firstFighter.getHealth() === 0 || secondFighter.getHealth() === 0) {
        firstFighter.getHealth() === 0 ?
        console.log(`${firstFighter.getName()} is dead and can't fight.`) :
        console.log(`${secondFighter.getName()} is dead and can't fight.`);

        return;
    }

    while (firstFighter.getHealth() > 0 && secondFighter.getHealth() > 0) {
        firstFighter.attack(secondFighter);
        if (secondFighter.getHealth() > 0) {
            secondFighter.attack(firstFighter);
            if (firstFighter.getHealth() === 0) {
                secondFighter.addWin();
                firstFighter.addLoss();
                console.log(`${secondFighter.getName()} has won!`);
            }
        } else {
            firstFighter.addWin();
            secondFighter.addLoss();
            console.log(`${firstFighter.getName()} has won!`);
        }
    }
}