// types.ts

export enum CardType {
    CAT,
    DEFUSE,
    SHUFFLE,
    EXPLODING_KITTEN,
  }
  
  export type Card = {
    type: CardType;
    label: string;
  };
  
  export type DeckType = Card[];
  