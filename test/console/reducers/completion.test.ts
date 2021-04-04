import reducer, { State } from "../../../src/console/reducers/completion";
import { expect } from "chai";
import {
  COMPLETION_COMPLETION_NEXT,
  COMPLETION_COMPLETION_PREV,
  COMPLETION_SET_COMPLETIONS,
  CompletionAction,
} from "../../../src/console/actions/completion";

describe("completion reducer", () => {
  it("return next state for CONSOLE_SET_COMPLETIONS", () => {
    const initialState = reducer(undefined, {} as any);
    let state: State = {
      ...initialState,
      select: 0,
      completions: [],
    };
    const action: CompletionAction = {
      type: COMPLETION_SET_COMPLETIONS,
      completions: [
        {
          name: "Apple",
          items: [{}, {}, {}],
        },
        {
          name: "Banana",
          items: [{}, {}, {}],
        },
      ],
      completionSource: "",
    };
    state = reducer(state, action);
    expect(state).to.have.property("completions", action.completions);
    expect(state).to.have.property("select", -1);
  });

  it("return next state for CONSOLE_COMPLETION_NEXT", () => {
    const initialState = reducer(undefined, {} as any);
    const action: CompletionAction = {
      type: COMPLETION_COMPLETION_NEXT,
    };
    let state = {
      ...initialState,
      select: -1,
      completions: [
        {
          name: "Apple",
          items: [{}, {}],
        },
        {
          name: "Banana",
          items: [{}],
        },
      ],
    };

    state = reducer(state, action);
    expect(state).to.have.property("select", 0);

    state = reducer(state, action);
    expect(state).to.have.property("select", 1);

    state = reducer(state, action);
    expect(state).to.have.property("select", 2);

    state = reducer(state, action);
    expect(state).to.have.property("select", -1);
  });

  it("return next state for CONSOLE_COMPLETION_PREV", () => {
    const initialState = reducer(undefined, {} as any);
    const action: CompletionAction = {
      type: COMPLETION_COMPLETION_PREV,
    };
    let state = {
      ...initialState,
      select: -1,
      completions: [
        {
          name: "Apple",
          items: [{}, {}],
        },
        {
          name: "Banana",
          items: [{}],
        },
      ],
    };

    state = reducer(state, action);
    expect(state).to.have.property("select", 2);

    state = reducer(state, action);
    expect(state).to.have.property("select", 1);

    state = reducer(state, action);
    expect(state).to.have.property("select", 0);

    state = reducer(state, action);
    expect(state).to.have.property("select", -1);
  });
});
