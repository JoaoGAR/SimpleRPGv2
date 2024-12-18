export const mergeSkills = (character) => {
    const skillMap = new Map();

    character.skills.forEach(({ skill, level }) => {
        if (skill) {
            skillMap.set(skill.id, { ...skill, level });
        }
    });

    character.inventory.forEach(({ item }) => {
        item.skills.forEach(({ skill, level }) => {
            if (skill) {
                if (skillMap.has(skill.id)) {
                    skillMap.get(skill.id).level += level;
                } else {
                    skillMap.set(skill.id, { ...skill, level });
                }
            }
        });
    });

    return Array.from(skillMap.values());
};
