import {
  VISUAL_PANEL_ADD,
  VISUAL_PANEL_REMOVE,
  VISUAL_PANEL_REORDER,
} from "../constants";
import { createReducer } from "./utils";

const initialState = {
  entities: {
    data: [],
  },
}

const visualPanelAdding = (state, action) => {
  const { payload } = action;
  const { newVisualPanel } = payload;
  const data = [...state.data].push(newVisualPanel);

  return Object.assign({}, state, {
    entities: {
      data
    }
  });
}

const visualPanelRemoving = (state, action) => {
  const { visualPanel } = action.payload;
  const { id } = visualPanel;
  const { data } = state.entities;
  const index = data.findIndex((item) => item.id === id);

  return Object.assign({}, state, {
    entities: {
      data: data.slice(index, 1)
    }
  });
}

const visualPanelReordering = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true
  });
}

export default createReducer(initialState, {
  [VISUAL_PANEL_ADD]: visualPanelAdding,
  [VISUAL_PANEL_REMOVE]: visualPanelRemoving,
  [VISUAL_PANEL_REORDER]: visualPanelReordering,
});
