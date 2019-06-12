import { ErrorMapper } from "utils/ErrorMapper";
import * as builder from "./creeps/builder";
import * as miner from "./creeps/miner";
import * as upgrader from "./creeps/upgrader";
import { spawnCreepsToQuota } from "./spawn";
import { Worker } from "./creeps/Worker";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  mainLoop();
});

const cleanMemory: () => void = () => {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
};

const mainLoop: () => void = () => {
  cleanMemory();

  _.each(Game.creeps, (creep: Worker) => {
    const thisCreep = new Worker(creep);

    thisCreep.doWork();
    // TODO: How do we get the class instance worker doWork called?
    // Game.creeps[creepName].doWork();
  });

  spawnCreepsToQuota();
};
