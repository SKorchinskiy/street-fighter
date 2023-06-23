import { createFighterPreview } from '../fighterPreview';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    const bodyElement = createFighterPreview(fighter);
    showModal({ title: `The winner: ${fighter.name}`, bodyElement });
}
