import {createContext, Dispatch, SetStateAction} from 'react';
import type {GameNameInfo, Player, TimeControl} from '../app/game/[id]/page';
import type {Side} from '../util/game';


export type Challenge = {
    user: Player,
    id: string,
    rated: boolean,
    game: GameNameInfo,
    timeControl: TimeControl,
    side: Side,
    createdAt: string
}

type ChallengesContext = {
    challenges: Challenge[],
    setChallenges: Dispatch<SetStateAction<Challenge[]>>
};
const ChallengesContext = createContext<ChallengesContext>({
    challenges: [],
    setChallenges: () => {}
});
export default ChallengesContext;
