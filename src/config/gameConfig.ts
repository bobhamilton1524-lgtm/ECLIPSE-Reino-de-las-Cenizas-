/** Configuración global del juego. */
export const GAME_CONFIG = {
  WIDTH: 480,
  HEIGHT: 270,
  MAX_SCALE: 6,
  PLAYER_SPEED: 90,
  SAVE_KEY: 'eclipse.save.v1',
} as const;

export const COLORS = {
  BG_DARK: 0x090909,
  BG_FLOOR: 0x17120f,
  ACCENT: 0x9b2d2d,
  TEXT: 0xe8e2d4,
  PLAYER: 0xc9a227,
} as const;
