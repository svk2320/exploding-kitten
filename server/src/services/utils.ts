import { CardType, DeckType } from "./types";

export const shuffleDeck = (): DeckType => {
  const cards = [
    { type: CardType.CAT, label: "😼" },
    { type: CardType.DEFUSE, label: "🙅‍♂️" },
    { type: CardType.SHUFFLE, label: "🔀" },
    { type: CardType.EXPLODING_KITTEN, label: "💣" },
    { type: CardType.CAT, label: "😼" },
  ];
  const deck = [];

  while (cards.length) {
    const index = Math.floor(Math.random() * cards.length);
    deck.push(cards.splice(index, 1)[0]);
  }

  return deck;
};
