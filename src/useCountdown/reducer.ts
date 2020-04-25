import { ONE_SECOND } from ".";

export interface State {
  offset: number;
}

export const initialState: State = {
  offset: 0
};

export enum Actions {
  TICK = "TICK",
  SET_OFFSET = "SET_OFFSET"
}

export interface Action {
  type: Actions;
  [key: string]: any;
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SET_OFFSET:
      return { ...state, offset: action.offset };
    case Actions.TICK:
      return { ...state, offset: state.offset - ONE_SECOND };
    default:
      throw Error(`reducer called with invalid action - ${action.type}`);
  }
}
