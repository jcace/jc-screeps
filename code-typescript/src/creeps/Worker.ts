import BaseCreep from "./BaseCreep";
import { decrementResource, findBestResourceId, incrementResource } from "./resourceTracker";

export class Worker extends BaseCreep {
  constructor(creep) {
    super(creep);
  }

  public doWork() {
    const { task, working, minerSource } = this.creep.memory;

    this.updateWorkingStatus();

    if (working) {
      const target: Source = Game.getObjectById(minerSource);
      if (this.creep.harvest(target) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      switch (task) {
        case "mine":
          this.minerDuties();
          break;
        case "build":
          this.builderDuties();
          break;
        case "upgrade":
          this.upgraderDuties();
          break;
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

  protected minerDuties() {
    const targets = this.creep.room.find(FIND_STRUCTURES, {
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

  protected builderDuties() {
    var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      if (this.creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }

  protected upgraderDuties() {
    if (this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.creep.room.controller, {
        visualizePathStyle: { stroke: "#ffffff" }
      });
    }
  }
}
