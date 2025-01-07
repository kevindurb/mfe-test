import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { client, gql } from './graphql.js';

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

class PersonGroupList extends LitElement {
  static properties = {
    personId: { type: Array },
  };

  #personGroupListTask = new Task(this, {
    task: () =>
      client.request(personGroupListQuery, { personId: this.personId }),
    args: () => [this.personId],
  });

  render() {
    return html`
      <h3>Groups</h3>
      ${this.#personGroupListTask.render({
        complete: ({ person }) =>
          person.groups.map((group) => html`<li>${group.name}</li>`),
      })}
    `;
  }
}

customElements.define('person-group-list', PersonGroupList);
