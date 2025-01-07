import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { gql } from 'graphql-tag';
import { client } from 'app-shell/client.js';

const groupMemberListQuery = gql`
  query ($groupId: ID) {
    group(id: $groupId) {
      members {
        id
        name
      }
    }
  }
`;

class GroupMemberList extends LitElement {
  static properties = {
    groupId: { type: Number },
  };

  #groupMemberListTask = new Task(this, {
    task: ([groupId], { signal }) =>
      client.request(groupMemberListQuery, { groupId }, { signal }),
    args: () => [this.groupId],
  });

  render() {
    return html`
      <h3>Members</h3>
      ${this.#groupMemberListTask.render({
        complete: ({ group }) =>
          group.members.map(
            (person) =>
              html`<li><a href="/people/${person.id}">${person.name}</a></li>`,
          ),
      })}
    `;
  }
}

customElements.define('group-member-list', GroupMemberList);
