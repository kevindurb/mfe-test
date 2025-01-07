import { print } from 'graphql';

export class GraphQLErrors extends Error {
  /** @type {unknown[]} */
  errors = [];

  /**
   * @param {unknown[]} errors
   */
  constructor(errors) {
    super('GraphQL Errors');
    this.errors = errors;
  }
}

/**
 * @typedef RequestOptions
 * @property {AbortSignal=} signal
 */

export class GraphQLClient {
  #url = '';

  /**
   * @param {string} url
   */
  constructor(url) {
    this.#url = url;
  }

  /**
   * @param {import("graphql").DocumentNode} query
   * @param {RequestOptions} options
   */
  async request(query, variables = {}, options = {}) {
    const response = await fetch(this.#url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
      signal: options.signal,
    });

    const result = await response.json();

    if (result?.errors?.length > 0) {
      throw new GraphQLErrors(result.errors);
    }

    return result.data;
  }
}
