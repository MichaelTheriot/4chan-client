import { Integer } from "./types/primitives.d.ts";
import { Thread } from "./types/thread.ts";
import timer from "https://raw.githubusercontent.com/MichaelTheriot/ts-timer/master/mod.ts";

interface ClientOptions {
  baseUri?: string;
  backoff?: number;
}

interface RequestOptions {
  since?: Integer;
  signal?: AbortSignal;
}

interface Response<T> {
  payload?: T;
  lastModified: Integer;
}

class Client {
  #baseUri: string;
  #backoff: number;
  #called: number;
  #lock = Promise.resolve();

  constructor({ baseUri = 'https://a.4cdn.org/', backoff = 1000 }: ClientOptions = {}) {
    this.#baseUri = baseUri;
    this.#backoff = backoff;
    this.#called = Date.now() - backoff;
  }

  async #acquire(): Promise<Parameters<ConstructorParameters<typeof Promise<void>>[0]>[0]> {
    const oldLock = this.#lock;

    const {
      promise: newLock,
      resolve: unlock,
      reject: _reject
    } = Promise.withResolvers<void>();

    this.#lock = newLock;

    await oldLock;

    return unlock;
  }

  async #throttle(): Promise<void> {
    const timeout = this.#backoff - (Date.now() - this.#called);

    if (timeout > 0) {
      await timer(timeout);
    }
  }

  #buildRequestInit(options: RequestOptions): RequestInit {
    const init: RequestInit = {};

    if (options.since !== undefined) {
      const headers = new Headers();
      headers.append('If-Modified-Since', new Date(options.since).toUTCString());

      init.headers = headers;
    }

    if (options.signal !== undefined) {
      if (options.signal.aborted) {
        throw options.signal.reason;
      }

      init.signal = options.signal;
    }    

    return init;
  }

  async getResource<T>(resource: string, options: RequestOptions | undefined = undefined): Promise<Response<T>> {
    const unlock = await this.#acquire();
    await this.#throttle();

    try {
      const promiseResponse = options === undefined
        ? fetch(resource)
        : fetch(resource, this.#buildRequestInit(options));

      this.#called = Date.now();

      const response = await promiseResponse;

      const lastModifiedHeader = response.headers.get('Last-Modified');

      const data: Response<T> = {
        lastModified: lastModifiedHeader ? new Date(lastModifiedHeader).getTime() : -1
      };

      if (response.status !== 304) {
        data.payload = await response.json();
      }

      return data;
    } finally {
      unlock();
    }
  }

  async getThread(board: string, id: Integer, options: RequestOptions | undefined = undefined): Promise<Response<Thread>> {
    return await this.getResource(`${this.#baseUri}${board}/thread/${id}.json`, options);
  }
}

export default Client;
