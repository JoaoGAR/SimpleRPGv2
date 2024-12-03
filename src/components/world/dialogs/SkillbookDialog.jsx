import "./dialogs.css";
import "./skillBookDialog.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";

const SkillbookDialog = ({ character, isOpen, onClose, setCharacter }) => {
    const [listSkills, setListSkills] = useState([]);
    const [listCharacterSkills, setListCharacterSkills] = useState(character.skill);
    const [listCharacterAttributes, setListCharacterAttributes] = useState(character.attributes);
    const [classPoints, setClassPoints] = useState(character.classPoints);
    const [skillPoints, setSkillPoints] = useState(character.skillPoints);
    const [skillInfoImage, setskillInfoImage] = useState('url("attributes/strenght.jfif")');
    const [skillInfoName, setskillInfoName] = useState('Força');
    const [skillInfoResume, setSkillInfoResume] = useState('Representa o poder físico do personagem, sua capacidade de levantar, empurrar e quebrar coisas. Personagens com alta Força são mestres em combate corpo a corpo, utilizando espadas, machados, martelos e outras armas pesadas com grande eficácia. Além disso, eles são mais resistentes a condições que envolvem esforço físico extremo.');

    useEffect(() => {
        const fetchSkillsData = async () => {
            const [skillsData] = await Promise.all([
                Axios.get("http://localhost:3001/api/skill/get"),
            ]);
            setListSkills(skillsData.data);
        };
        fetchSkillsData();
    }, [character]);

    const addClassPoint = (attributeId) => {
        if (classPoints > 0) {
            setClassPoints((prev) => prev - 1);
            setListCharacterAttributes((prevClasses) => {
                const updatedClasses = prevClasses.map((item) =>
                    item.attributeId === attributeId
                        ? { ...item, level: item.level + 1 }
                        : item
                );
                if (!updatedClasses.some((item) => item.attributeId === attributeId)) {
                    updatedClasses.push({ attributeId, characterId: character.id, level: 1 });
                }
                return updatedClasses;
            });
            const classSkills = listSkills.find(item => item.id === attributeId)?.skill || [];

            setListCharacterSkills(prevSkills => {
                const updatedSkills = [...prevSkills];
                classSkills.forEach((skill) => {
                    const skillIndex = updatedSkills.findIndex(item => item.skillId === skill.id);
                    if (skillIndex !== -1) {
                        updatedSkills[skillIndex] = {
                            ...updatedSkills[skillIndex],
                            level: updatedSkills[skillIndex].level + 1
                        };
                    } else {
                        updatedSkills.push({
                            skillId: skill.id,
                            characterId: character.id,
                            level: 1
                        });
                    }
                });
                return updatedSkills;
            });
        }
    };

    const removeClassPoint = (attributeId) => {
        if (classPoints < character.classPoints) {
            setClassPoints((prev) => prev + 1);
            setListCharacterAttributes((prevClasses) => {
                const updatedClasses = prevClasses.map((item) =>
                    item.attributeId === attributeId && item.level > 0
                        ? { ...item, level: item.level - 1 }
                        : item
                );
                return updatedClasses;
            });
            const classSkills = listSkills.find(item => item.id === attributeId)?.skill || [];
            setListCharacterSkills((prevSkills) => {
                return prevSkills.map((skill) => {
                    if (classSkills.some(classSkill => classSkill.id === skill.skillId) && skill.level > 0) {
                        return { ...skill, level: skill.level - 1 };
                    }
                    return skill;
                });
            });
        }
    };

    const addSkillPoint = (skillId) => {
        if (skillPoints > 0) {
            setSkillPoints((prev) => prev - 1);
            setListCharacterSkills((prevSkills) => {
                const updatedSkills = prevSkills.map((skill) =>
                    skill.skillId === skillId ? { ...skill, level: skill.level + 1 } : skill
                );
                if (!updatedSkills.some((skill) => skill.skillId === skillId)) {
                    updatedSkills.push({ skillId, characterId: character.id, level: 1 });
                }
                return updatedSkills;
            });
        }
    };

    const removeSkillPoint = (skillId) => {
        if (skillPoints < character.skillPoints) {
            setSkillPoints((prev) => prev + 1);
            setListCharacterSkills((prevSkills) =>
                prevSkills.map((skill) =>
                    skill.skillId === skillId ? { ...skill, level: skill.level - 1 } : skill
                )
            );
        }
    };

    const savePoints = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/api/skill/save", {
                listCharacterSkills,
                listCharacterAttributes,
                skillPoints,
                classPoints,
            });
            
            setCharacter(response.data.character);
            const message = response.data.msg;
            toast[response.data.status === 200 ? "success" : "warning"](message, {
                position: "top-right",
                autoClose: 400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        } catch {
            toast.error("Falha ao salvar atributos.", {
                position: "top-right",
                autoClose: 400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
    };

    if (!isOpen) return null;

    const skillInfo = (skillName, skillImage, skillResume) => {
        setskillInfoName(skillName);
        setskillInfoImage(`url("${skillImage}")`);
        setSkillInfoResume(skillResume);
    }

    return (
        <>
            <div className="row row-cols-3 dialog-header align-items-center">
                <div className="col-2">
                    <i className="bi bi-book"></i>
                </div>
                <div className="col-8 inventory-title text-center">
                    <h6 className="text-uppercase fw-bold">Atributos</h6>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-end">
                    <button className="btn btn-sm btn-danger" onClick={onClose}><i className="bi bi-x"></i></button>
                </div>
            </div>
            <div className="dialog-body">
                <div className="row row-cols-2 px-3 skill-info" style={{ maxHeight: '190px' }}>
                    <div className="col-3">
                        <div className="skill-image" style={{ backgroundImage: skillInfoImage }}></div>
                    </div>

                    <div className="col-9">
                        <p style={{ maxHeight: '180px', overflow: 'auto' }}>
                            {skillInfoName}
                            <br />
                            {skillInfoResume}
                        </p>
                    </div>
                </div>
                <div className="row row-cols-2 my-1 px-3">
                    <p>Pontos disponíveis: {classPoints} / {skillPoints}</p>
                    <button className="btn btn-success" onClick={savePoints}>Salvar</button>
                </div>

                <div className="row row-cols-1 px-3 mb-2 text-center justify-content-center">
                    {listSkills.map((attribute) => (
                        <div key={attribute.id} className="row row-cols-2 justify-content-center attribute-row" style={{ backgroundColor: attribute.color }}>
                            <div className="col-3 attribute-box" onMouseEnter={() => skillInfo(attribute.name, attribute.icon, attribute.description)}>
                                <div className="col">
                                    <small>{attribute.name}</small>
                                    <span className="badge text-bg-secondary">{listCharacterAttributes.find((item) => item.attributeId === attribute.id)?.level || 0}</span>
                                </div>
                                <div className="col row row-cols-3 justify-content-center align-items-center">
                                    <button type="button" className="btn btn-outline-dark attribute-button" onClick={() => removeClassPoint(attribute.id)}><i className="bi bi-dash-circle"></i></button>
                                    <div className="attribute-img mx-1" style={{ backgroundImage: `url("${attribute.icon}")` }}></div>
                                    <button type="button" className="btn btn-dark attribute-button" onClick={() => addClassPoint(attribute.id)}><i className="bi bi-plus-circle"></i></button>
                                </div>
                            </div>
                            <div className="col-9 row row-cols-4">
                                {attribute.skill.map((skill) => (
                                    <div key={skill.id} className="col skill-box" onMouseEnter={() => skillInfo(skill.name, skill.icon, skill.description)}>
                                        <div className="col">
                                            <small>{skill.name}</small>
                                            <span className="badge text-bg-secondary">{listCharacterSkills.find((item) => item.skillId === skill.id)?.level || 0}</span>
                                        </div>
                                        <div className="col row row-cols-3 justify-content-center align-items-center">
                                            <button type="button" className="btn btn-outline-dark skill-button" onClick={() => removeSkillPoint(skill.id)}><i className="bi bi-dash-circle"></i></button>
                                            <div className="skill-img mx-1" style={{ backgroundImage: `url("${skill.icon}")` }}></div>
                                            <button type="button" className="btn btn-dark skill-button" onClick={() => addSkillPoint(skill.id)}><i className="bi bi-plus-circle"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="row row-cols-3 d-flex justify-content-end align-items-end dialog-footer">
            </div>
        </>
    );
};

export default SkillbookDialog;
