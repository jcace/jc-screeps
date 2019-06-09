import { assert } from "chai";
import { decrementResource, findBestResourceId, incrementResource } from "../../src/creeps/resourceTracker";
import { Game, Memory } from "./mock";

describe("resourceTracker", () => {
  beforeEach(() => {
    // @ts-ignore : allow adding Game to global
    global.Game = _.clone(Game);
    // @ts-ignore : allow adding Memory to global
    global.Memory = _.clone(Memory);
  });

  it("increments/decrements resource counter", () => {
    Memory.sources.push({ id: "1", num: 55 });
    Memory.sources.push({ id: "2", num: 65 });

    decrementResource("1");
    incrementResource("2");
    assert.equal(Memory.sources[0].num, 54);
    assert.equal(Memory.sources[1].num, 66);
  });

  it("gets the lowest resource id", () => {
    const testId = findBestResourceId({} as Creep);
    assert.equal(testId, "1");
  });
});
