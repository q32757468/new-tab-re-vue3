export enum SuggestionType {
  remote,
  history,
}

class Suggestion {
  type: SuggestionType;
  content: string | JSX.Element;
  text: string;

  constructor(
    type: SuggestionType,
    text: string,
    content?: string | JSX.Element
  ) {
    this.type = type;
    this.text = text;
    this.content = content || text;
  }
}

export default Suggestion;
