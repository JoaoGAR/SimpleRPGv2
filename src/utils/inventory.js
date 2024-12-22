export const getWeapon = (inventory) => {
    const weapon = inventory.find(
        (inventoryItem) => inventoryItem?.item.categoryId == 7
    )?.item;

    return weapon ?? null;
};