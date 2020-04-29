export class HttpError extends Error {
  public response?: Response;
  public url: string;

  constructor(data: Response | string) {
    super(`Request to ${typeof data === "string" ? data : data.url} failed.`);

    if (typeof data === "string") {
      this.url = data;
    } else {
      this.response = data;
      this.url = this.response.url;
    }
  }
}

export class ParseError extends Error {
  constructor() {
    super("Unable to parse aliases.");
  }
}
