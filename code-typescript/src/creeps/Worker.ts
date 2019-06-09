import BaseCreep from "./BaseCreep";
import { decrementResource, findBestResourceId, incrementResource } from "./resourceTracker";

export class Worker extends BaseCreep {
  public doWork() {
    this.updateWorkingStatus();

    if (this.creep.memory.working) {
      const target: Source = Game.getObjectById(this.creep.memory.minerSource);
      if (this.creep.harvest(target) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      var targets = this.creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity
          );
        }
      });
      if (targets.length > 0) {
        if (this.creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    }
  }

  protected updateWorkingStatus() {
    if (this.creep.carry.energy === 0 && !this.creep.memory.working) {
      this.creep.memory.working = true;
      this.creep.memory.minerSource = findBestResourceId(this.creep);
      incrementResource(this.creep.memory.minerSource);
    }
    if (this.creep.carry.energy === this.creep.carryCapacity && this.creep.memory.working) {
      this.creep.memory.working = false;
      decrementResource(this.creep.memory.minerSource);
    }
  }
}
