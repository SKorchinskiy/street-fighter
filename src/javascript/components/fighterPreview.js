import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

function createFighterElement(fighter) {
    const imageElement = createFighterImage(fighter);
    const nameElement = createElement({ tagName: 'p' });
    nameElement.innerText = `name: ${fighter.name}`;
    const healthElement = createElement({ tagName: 'p' });
    healthElement.innerText = `health: ${fighter.health}`;
    const attackElement = createElement({ tagName: 'p' });
    attackElement.innerText = `attack: ${fighter.attack}`;
    const defenseElement = createElement({ tagName: 'p' });
    defenseElement.innerText = `defense: ${fighter.defense}`;
    return [nameElement, healthElement, attackElement, defenseElement, imageElement];
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    const detailedInfoElement = createFighterElement(fighter);
    fighterElement.append(...detailedInfoElement);

    return fighterElement;
}
