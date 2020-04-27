export const loadState = () => {
  try {
    const state = localStorage.getItem('local-state');
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('local-state', serialized);
  } catch (err) {
    console.error('Error guardando state al localStorage.');
  }
};
