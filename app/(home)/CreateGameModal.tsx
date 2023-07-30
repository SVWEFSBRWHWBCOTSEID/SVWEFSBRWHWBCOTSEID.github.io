'use client'

import {ReactNode, useContext, useState} from 'react';
import {Listbox} from '@headlessui/react';
import UserContext from '../../contexts/UserContext';

// Components
import CenteredModal from '../../components/CenteredModal';
import AnimatedListbox from '../../components/AnimatedListbox';
import SecondarySlider from '../../components/SecondarySlider';
import CloseButton from '../../components/CloseButton';

// Icons
import {IoDice} from 'react-icons/io5';
import {PiNumberCircleOneFill, PiNumberCircleTwoFill} from 'react-icons/pi';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';

// Util
import {games} from './QuickPairing';
import {createGame, Side} from '../../util/game';
import {keyToIcon} from '../profile/ProfileSidebarItem';
import type {GameNameInfo} from '../game/[id]/page';


type CreateGameModalProps = {isOpen: boolean, setIsOpen: (open: boolean) => void, game?: GameNameInfo};
export default function CreateGameModal(props: CreateGameModalProps) {
    const {user} = useContext(UserContext);

    const [game, setGame] = useState(props.game ?? games[0]);
    const [rated, setRated] = useState(true);

    const [timed, setTimed] = useState(true);
    const [minutesSlider, setMinutesSlider] = useState(9);
    const [incrementSlider, setIncrementSlider] = useState(5);
    const invalidTime = minutesSlider == 0 && incrementSlider == 0;

    const [ratingOffsetMin, setRatingOffsetMin] = useState(-500);
    const [ratingOffsetMax, setRatingOffsetMax] = useState(500);

    const Icon = keyToIcon(game.key);
    const rating = user?.perfs[game.key].rating ?? 1500;
    const prov = user?.perfs[game.key].prov ?? true;

    function setTimeControl(timed: boolean) {
        setTimed(timed);
        if (!timed) setRated(false);
    }

    function submitModal(side: Side) {
        void createGame(
            game.key,
            rating,
            parseMinutes(minutesSlider),
            parseIncrement(incrementSlider),
            rated,
            timed,
            side,
            ratingOffsetMin,
            ratingOffsetMax
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
                <h1 className="text-2xl text-center font-light mb-6">Create a game</h1>

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

            <section className="bg-content-secondary border-y border-tertiary px-8 py-3 text-secondary text-sm text-center">
                <p className="mb-0.5">Rating range</p>

                <div className="flex items-center gap-2.5">
                    <SecondarySlider
                        value={ratingOffsetMin}
                        onChange={setRatingOffsetMin}
                        min={-500}
                        max={-50}
                        step={50}
                        className="h-3.5 slider-thumb:w-6 slider-thumb:h-3.5"
                    />
                    <span className="flex-none w-24">{ratingOffsetMin} / +{ratingOffsetMax}</span>
                    <SecondarySlider
                        value={ratingOffsetMax}
                        onChange={setRatingOffsetMax}
                        min={50}
                        max={500}
                        step={50}
                        className="h-3.5 slider-thumb:w-6 slider-thumb:h-3.5"
                    />
                </div>
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
                    <Icon className="inline text-lg" /> {rating}{prov && '?'}
                </strong>
                {game.name}
            </section>
        </CenteredModal>
    )
}

type ModalDropdownProps<T> = {title: string, selected: string, value: T, onChange: (value: T) => void, children: ReactNode}
function ModalDropdown<T>(props: ModalDropdownProps<T>) {
    return (
        <Listbox value={props.value} onChange={props.onChange} as="div" className="flex gap-3 text-secondary items-center justify-center">
            <Listbox.Label className="w-24 text-right">{props.title}</Listbox.Label>

            <div className="relative">
                <Listbox.Button className="relative font-semibold text-left w-56 px-4 py-2 bg-content-tertiary rounded border border-tertiary">
                    {props.selected}
                    <MdOutlineKeyboardArrowDown className="absolute right-2.5 inset-y-0 my-auto text-xl" />
                </Listbox.Button>
                <AnimatedListbox className="absolute top-[calc(100%_+_6px)] w-48 flex flex-col py-1.5 bg-content-tertiary rounded shadow-lg z-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25">
                    {props.children}
                </AnimatedListbox>
            </div>
        </Listbox>
    )
}

function ModalDropdownItem<T>(props: {value: T, children: ReactNode}) {
    return (
        <Listbox.Option value={props.value} className="cursor-pointer px-4 py-1 hover:!bg-blue-500 hover:text-white ui-selected:bg-background">
            {props.children}
        </Listbox.Option>
    )
}

/**
 * Converts slider ticks to the actual game time.
 *
 * Between [0, 4], each tick increases the game time by 0.25 minutes. (i : [0, 1])
 * Between (4, 6], each tick increases the game time by 0.5 minutes. (i : (1, 2]
 * Between (6, 24], each tick increases the game time by 1 minute. (i : (2, 20])
 * Between (24, 29], each tick increases the game time by 5 minutes. (i : (20, 45])
 * Between (29, 38], each tick increases the game time by 15 minutes. (i : (45, 180])
 *
 * @param ticks The value of the game time slider.
 * @returns The game time, in minutes.
 */
function parseMinutes(ticks: number) {
    if (ticks <= 4) return ticks * 0.25;
    if (ticks <= 6) return 1 + (ticks - 4) * 0.5;
    if (ticks <= 24) return ticks - 4;

    if (ticks <= 29) return 20 + (ticks - 24) * 5;
    return 45 + (ticks - 29) * 15;
}

/**
 * Converts slider ticks to the actual game increment.
 *
 * Between [0, 20], each tick increases the increment by 1 second. (i : [0, 20])
 * Between (20, 25], each tick increases the increment by 5 seconds. (i : (20, 45]
 * Between (25, 26], each tick increases the increment by 15 seconds. (i = 60)
 * Between (26, 30], each tick increases the increment by 30 seconds. (i : (60, 180])
 *
 * @param ticks The value of the increment slider.
 * @returns The increment, in seconds.
 */
function parseIncrement(ticks: number) {
    if (ticks <= 20) return ticks;
    if (ticks <= 25) return 20 + (ticks - 20) * 5;
    if (ticks == 26) return 45 + (ticks - 25) * 15;
    return 60 + (ticks - 26) * 30;
}
