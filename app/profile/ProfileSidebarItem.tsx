import {GiPotato} from 'react-icons/gi';
import {AiFillCaretRight} from 'react-icons/ai';

export default function ProfileSidebarItem() {
    return (
        <div className="group flex gap-3 items-center hover:bg-content-secondary/50 rounded-l pl-4 pr-8 py-3 transition duration-150">
            {/* TODO: icon */}
            <GiPotato className="text-4xl" />
            <div>
                <h5 className="uppercase font-light">Ultimate tic-tac-toe</h5>
                <p className="flex gap-2 text-sm text-secondary items-center">
                    <strong className="text-lg">1537</strong>
                    177 games
                </p>
            </div>
            <AiFillCaretRight className="text-lg text-secondary group-hover:text-blue-500" />
        </div>
    )
}
