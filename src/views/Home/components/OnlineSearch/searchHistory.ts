class SearchHistory {
  content: string;
  timestamp: number | string;

  constructor(content: string, timestamp: number | string) {
    this.content = content;
    this.timestamp = timestamp;
  }
}

export default SearchHistory;
