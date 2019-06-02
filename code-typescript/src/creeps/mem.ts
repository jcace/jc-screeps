export const enum CreepRoles {
  ROLE_BUILDER = "builder",
  ROLE_MINER = "miner"
}

export const enum MinerState {
  STATE_MINING = 0,
  STATE_MOVING = 1,
  STATE_XFER = 2
}

declare global {
  interface CreepMemory {
    role: CreepRoles;
    target: Source;
    state: MinerState;
  }
}
