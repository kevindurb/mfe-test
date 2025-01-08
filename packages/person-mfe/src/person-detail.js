import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { gql } from 'graphql-tag';
import { client } from '@mfe-test/common/client.js';
import '@mfe-test/group-mfe/person-group-list.js';

const personQuery = gql`
  query ($personId: ID) {
    person(id: $personId) {
      id
      name
    }
  }
`;

/**
 * @typedef PersonQueryResult
 * @property {{ id: number, name: string }} person
 */

class PersonDetail extends LitElement {
  static properties = {
    personId: { type: Number },
  };

  constructor() {
    super();
    this.personId = null;
  }

  /**
   * @type {Task<[number], PersonQueryResult>}
   */
  #personDetailTask = new Task(this, {
    task: ([personId], { signal }) =>
      client.request(personQuery, { personId }, { signal }),
    args: () => [this.personId],
  });

  #renderDetail() {
    return this.#personDetailTask.render({
      complete: ({ person }) => html` <h2>${person.name}</h2> `,
    });
  }

  render() {
    return html`
      ${this.#renderDetail()}
      <person-group-list .personId=${this.personId}></person-group-list>
    `;
  }
}

customElements.define('person-detail', PersonDetail);
