'use client'

import {useContext, useState} from 'react';
import UserContext from '../../contexts/UserContext';

// Components
import CenteredModal from '../../components/CenteredModal';
import SecondarySlider from '../../components/SecondarySlider';
import CloseButton from '../../components/CloseButton';
import {ModalDropdown, ModalDropdownItem, parseIncrement, parseMinutes} from './CreateGameModal';

// Icons
import {IoDice} from 'react-icons/io5';
import {PiNumberCircleOneFill, PiNumberCircleTwoFill} from 'react-icons/pi';

// Util
import {games} from './QuickPairing';
import {createChallenge, Side} from '../../util/game';
import {keyToIcon} from '../profile/ProfileSidebarItem';


type CreateGameModalProps = {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    username: string,
};
export default function CreateChallengeModal(props: CreateGameModalProps) {
    const {user} = useContext(UserContext);

    const [game, setGame] = useState(games[0]);
    const [rated, setRated] = useState(true);

    const [timed, setTimed] = useState(true);
    const [minutesSlider, setMinutesSlider] = useState(9);
    const [incrementSlider, setIncrementSlider] = useState(5);
    const invalidTime = minutesSlider == 0 && incrementSlider == 0;

    const Icon = keyToIcon(game.key);
    const rating = user?.perfs[game.key].rating ?? 1500;
    const prov = user?.perfs[game.key].prov ?? true;

    function setTimeControl(timed: boolean) {
        setTimed(timed);
        if (!timed) setRated(false);
    }

    function submitModal(side: Side) {
        void createChallenge( // TODO: handle if username is null
            props.username,
            game.key,
            parseMinutes(minutesSlider),
            parseIncrement(incrementSlider),
            rated,
            timed,
            side
        );
        props.setIsOpen(false);
    }

    return (
        <CenteredModal
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
            className="relative flex flex-col bg-content rounded-md w-[26rem] max-h-[90%] mx-2 shadow-xl"
        >
            <CloseButton
                className="absolute -top-3 -right-3 bg-[#3c3934] rounded-full shadow-sm"
                onClick={() => props.setIsOpen(false)}
            />

            <section className="px-8 pt-6 pb-4">
                <h1 className="text-2xl text-center font-light mb-4">Play with a friend</h1>

                <p className="text-secondary text-center mb-1">
                    {props.username}
                </p>
                <ModalDropdown title="Game" selected={game.name} value={game} onChange={setGame}>
                    {games.map((game) => (
                        <ModalDropdownItem value={game} key={game.key}>{game.name}</ModalDropdownItem>
                    ))}
                </ModalDropdown>
            </section>

            <section className="bg-content-secondary border-y border-tertiary px-8 py-3">
                <ModalDropdown title="Time control" selected={timed ? 'Real time' : 'Unlimited'} value={timed} onChange={setTimeControl}>
                    <ModalDropdownItem value={true}>Real time</ModalDropdownItem>
                    <ModalDropdownItem value={false}>Unlimited</ModalDropdownItem>
                </ModalDropdown>

                {timed && (
                    <div className="mt-2.5 text-center text-secondary">
                        {/* TODO: monospace */}
                        <p className="mb-1.5 text-sm">Minutes per side: <strong>{parseMinutes(minutesSlider)}</strong></p>
                        <SecondarySlider
                            value={minutesSlider}
                            onChange={setMinutesSlider}
                            min={0}
                            max={38}
                            className={'h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200' + (invalidTime ? ' ring ring-red-500/20' : '')}
                        />

                        {/* TODO: monospace */}
                        <p className="mt-1.5 mb-1.5 text-sm">Increment in seconds: <strong>{parseIncrement(incrementSlider)}</strong></p>
                        <SecondarySlider
                            value={incrementSlider}
                            onChange={setIncrementSlider}
                            min={0}
                            max={30}
                            className={'h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200' + (invalidTime ? ' ring ring-red-500/20' : '')}
                        />
                    </div>
                )}
            </section>

            <section className="px-8 py-6 flex justify-center">
                <button onClick={() => setRated(false)} className={'px-12 py-2 rounded-l shadow-lg ' + (!rated ? 'bg-theme-green' : 'bg-content-secondary text-secondary')}>
                    Casual
                </button>
                <button
                    onClick={() => setRated(true)}
                    className={'px-12 py-2 rounded-r shadow-lg ' + (rated ? 'bg-theme-green' : 'bg-content-secondary text-secondary disabled:opacity-50 transition-opacity duration-150')}
                    disabled={!timed}
                >
                    Rated
                </button>
            </section>

            <section className="px-8 py-2 text-secondary flex items-center justify-center gap-1.5">
                <button
                    className="p-2 text-4xl hover:text-primary disabled:opacity-50 disabled:text-inherit transition-opacity duration-150"
                    title="Move first"
                    disabled={invalidTime}
                    onClick={() => submitModal('FIRST')}
                >
                    <PiNumberCircleOneFill />
                </button>

                <button
                    className="p-2 text-6xl hover:text-primary disabled:opacity-50 disabled:text-inherit transition-opacity duration-150"
                    title="Random side"
                    disabled={invalidTime}
                    onClick={() => submitModal('RANDOM')}
                >
                    <IoDice />
                </button>

                <button
                    className="p-2 text-4xl hover:text-primary disabled:opacity-50 disabled:text-inherit transition-opacity duration-150"
                    title="Move second"
                    disabled={invalidTime}
                    onClick={() => submitModal('SECOND')}
                >
                    <PiNumberCircleTwoFill />
                </button>
            </section>

            <section className="px-8 py-3.5 text-sm text-secondary flex justify-center gap-1 border-t border-tertiary bg-[rgb(48_46_44)] rounded-b-lg">
                Rating:
                <strong className="flex items-center gap-0.5">
                    <Icon className="inline text-lg" /> {Math.floor(rating)}{prov && '?'}
                </strong>
                {game.name}
            </section>
        </CenteredModal>
    )
}
