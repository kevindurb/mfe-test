/**
 * @param {string} from
 * @param {string} to
 */
export const redirect = (from, to) => ({
  path: from,
  enter: () => {
    window.location.href = to;
    return true;
  },
});
