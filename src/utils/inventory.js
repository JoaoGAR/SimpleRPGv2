export const getWeapon = (inventory) => {
    const weapon = inventory.find(
        (inventoryItem) => inventoryItem?.item.categoryId == 7
    )?.item;

    return weapon ?? null;
};

export const getInventoryFullness = (character, inventory) => {
    let isFull = false
    if (character?.inventorySize) {
        isFull = inventory.length >= character.inventorySize;
    }
    return isFull;
}

export const getInitiative = (equipment) => {
    if (!Array.isArray(equipment) || equipment.length === 0) {
        return 0;
    }

    return equipment.reduce((minInitiative, currentItem) => {
        const currentInitiative = currentItem.item.initiative || 0;
        return currentInitiative < minInitiative ? currentInitiative : minInitiative;
    }, Infinity);
};