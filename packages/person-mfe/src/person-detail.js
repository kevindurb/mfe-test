import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { client, gql } from './graphql.js';

const personQuery = gql`
  query ($id: ID) {
    person(id: $id) {
      id
      name
    }
  }
`;

class PersonDetail extends LitElement {
  static properties = {
    personId: { type: Number },
  };

  #peopleListTask = new Task(this, {
    task: () => client.request(personQuery, { id: this.personId }),
    args: () => [],
  });

  render() {
    return this.#peopleListTask.render({
      complete: ({ person }) => html`<h2>${person.name}</h2>`,
    });
  }
}

customElements.define('person-detail', PersonDetail);
