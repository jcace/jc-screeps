// https://github.com/gdborton/screeps/blob/master/src/roles/Base.js
export default class BaseCreep extends Creep {
  protected creep: Creep;
  constructor(creep) {
    super(creep.id);
  }

  // determineWorking: {
  //   if (this.creep.carry.energy === 0 && !creep.memory.working) {
  //     creep.memory.working = true;
  //     creep.memory.minerSource = findBestResourceId(creep);
  //     incrementResource(creep.memory.minerSource);
  //   }
  //   if (creep.carry.energy === creep.carryCapacity && creep.memory.working) {
  //     creep.memory.working = false;
  //     decrementResource(creep.memory.minerSource);
  //   }
  // }
}
