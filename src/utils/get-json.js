/**
 * Get JSON data from HTML (script) element
 *
 * @param string selector CSS selector for tag containing raw JSON data
 * @example
 * getJsonDataFromScript('#page-id script[type=\'application/json\']')
 */
export const getJsonDataFromScript = (selector) => {
    const dkwp = document.querySelector(selector);

    if (!dkwp || !dkwp.textContent) {
        return {};
    }

    return JSON.parse(dkwp.textContent) || {};
};
