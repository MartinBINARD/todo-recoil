import { atom, selector, selectorFamily } from 'recoil';

export const todosState = atom({
  key: 'todosState',
  default: [],
  effects: [
    (options) => {
      console.log(options);
      const { getLoadable, node, onSet, resetSelf, setSelf } = options;
      const { contents } = getLoadable(filterState);
      console.log(contents);
      console.log(node);
      console.log(getLoadable(node));
      onSet((newValue, oldValue) => {
        console.log('new value : ', newValue);
        console.log('old value : ', oldValue);
        if (newValue.length > 2) {
          resetSelf();
        }
        if (newValue.length === 1) {
          setSelf([
            ...newValue,
            {
              content: 'salut',
              _id: crypto.randomUUID(),
              edit: false,
              done: true,
            },
          ]);
        }
      });
    },
  ],
});

export const filterState = atom({
  key: 'filterState',
  default: 'all',
});

export const selectFilteredTodos = selector({
  key: 'selectFilteredTodos',
  get: ({ get }) => {
    const filter = get(filterState);
    const todos = get(todosState);
    switch (filter) {
      case 'done': {
        return todos.filter((t) => t.done);
      }
      case 'ongoing': {
        return todos.filter((t) => !t.done);
      }
      default: {
        return todos;
      }
    }
  },
});

export const selectTodosData = selector({
  key: 'selectTodosData',
  get: ({ get }) => {
    const todos = get(todosState);
    const total = todos.length;
    const totalDone = todos.filter((t) => t.done).length;
    const totalOngoing = todos.filter((t) => !t.done).length;
    const totalDonePourcentage =
      total > 0 ? Math.floor((totalDone / total) * 100) : 0;
    return {
      total,
      totalDone,
      totalOngoing,
      totalDonePourcentage,
    };
  },
});

export const selectTodoDetails = selectorFamily({
  key: 'selectTodoDetails',
  get:
    (_id) =>
    ({ get }) => {
      const todos = get(todosState);
      return _id ? todos.find((t) => t._id === _id) : null;
    },
});
