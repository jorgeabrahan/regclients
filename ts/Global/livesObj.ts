import livesObjI from '../Interfaces/livesObj';

let livesObj: livesObjI = { lives: [] };
const setLivesObj = (newLivesObj: any) => (livesObj = newLivesObj);
const getLives = () => livesObj.lives;
const getLiveIndex = (ID: string): number => getLives().findIndex(live => live.ID === ID);
const removeLive = (index: number) => livesObj.lives.splice(index, 1);


export { livesObj, setLivesObj, getLives, getLiveIndex, removeLive };
