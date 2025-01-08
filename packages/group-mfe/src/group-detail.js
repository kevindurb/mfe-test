import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { gql } from 'graphql-tag';
import { client } from '@mfe-test/common/client.js';
import './group-member-list.js';

const groupQuery = gql`
  query ($groupId: ID) {
    group(id: $groupId) {
      id
      name
    }
  }
`;

/**
 * @typedef GroupQueryResult
 * @property {{ id: number, name: string }} group
 */

class GroupDetail extends LitElement {
  static properties = {
    groupId: { type: Number },
  };

  constructor() {
    super();
    this.groupId = null;
  }

  /**
   * @type {Task<[number], GroupQueryResult>}
   */
  #groupDetailTask = new Task(this, {
    task: ([groupId], { signal }) =>
      client.request(groupQuery, { groupId }, { signal }),
    args: () => [this.groupId],
  });

  #renderDetails() {
    return this.#groupDetailTask.render({
      complete: ({ group }) => html` <h2>${group.name}</h2> `,
    });
  }

  render() {
    return html`
      ${this.#renderDetails()}
      <group-member-list .groupId=${this.groupId}></group-member-list>
    `;
  }
}

customElements.define('group-detail', GroupDetail);
