export class GraphQLErrors extends Error {
  errors = [];
  constructor(errors) {
    super('GraphQL Errors');
    this.errors = errors;
  }
}

class GraphQLClient {
  #url = '';

  constructor(url) {
    this.#url = url;
  }

  async request(query = '', variables = {}) {
    const response = await fetch(this.#url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();

    if (result?.errors?.length > 0) {
      throw new GraphQLErrors(result.errors);
    }

    return result.data;
  }
}

export const client = new GraphQLClient('http://localhost:8001/graphql');

export const gql = (template, ...substitutions) =>
  String.raw(template, ...substitutions);
