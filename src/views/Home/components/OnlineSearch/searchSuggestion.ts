export enum SuggestionType {
  remote,
  history,
}

class Suggestion {
  type: SuggestionType;
  content: string;
  text: string;

  constructor(type: SuggestionType, text: string, content?: string) {
    this.type = type;
    this.text = text;
    this.content = content || text;
  }
}

export default Suggestion;
