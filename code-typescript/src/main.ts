import { ErrorMapper } from "utils/ErrorMapper";
import * as builder from "./creeps/builder";
import * as mem from "./creeps/mem";
import * as miner from "./creeps/miner";
import * as upgrader from "./creeps/upgrader";
import { spawnCreepsToQuota } from "./spawn";

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

  _.each(Game.creeps, (creep: Creep) => {
    if (creep.memory.role === mem.CreepRoles.ROLE_MINER) {
      miner.run(creep);
    }
    if (creep.memory.role === mem.CreepRoles.ROLE_UPGRADER) {
      upgrader.run(creep);
    }
    if (creep.memory.role === mem.CreepRoles.ROLE_BUILDER) {
      builder.run(creep);
    }
  });

  spawnCreepsToQuota();
};
