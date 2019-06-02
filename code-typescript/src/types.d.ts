import * as mem from "./creeps/mem";

// memory extension samples
declare global {
  interface CreepMemory {
    role: mem.CreepRoles;
  }
}
