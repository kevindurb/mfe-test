import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { gql } from 'graphql-tag';
import { client } from '@mfe-test/common/client.js';

const personGroupListQuery = gql`
  query ($personId: ID) {
    person(id: $personId) {
      groups {
        id
        name
      }
    }
  }
`;

/**
 * @typedef Group
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef PersonGroupListQueryResult
 * @property {{ groups: Group[] }} person
 */

class PersonGroupList extends LitElement {
  static properties = {
    personId: { type: Number },
  };

  constructor() {
    super();
    /** @type {number | null} */
    this.personId = null;
  }

  /**
   * @type {Task<[number], PersonGroupListQueryResult>}
   */
  #personGroupListTask = new Task(this, {
    task: ([personId], { signal }) =>
      client.request(personGroupListQuery, { personId }, { signal }),
    args: () => [this.personId],
  });

  render() {
    return html`
      <h3>Groups</h3>
      ${this.#personGroupListTask.render({
        complete: ({ person }) =>
          person.groups.map(
            (group) =>
              html`<li><a href="/groups/${group.id}">${group.name}</a></li>`,
          ),
      })}
    `;
  }
}

customElements.define('person-group-list', PersonGroupList);
