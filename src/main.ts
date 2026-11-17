import Phaser from 'phaser';
import { COLORS, GAME_CONFIG } from '@/config/gameConfig';
import { BootScene } from '@/scenes/BootScene';
import { PreloadScene } from '@/scenes/PreloadScene';
import { MainMenuScene } from '@/scenes/MainMenuScene';
import { WorldScene } from '@/scenes/WorldScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: COLORS.BG_DARK,
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
  },
  physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
  scene: [BootScene, PreloadScene, MainMenuScene, WorldScene],
};

new Phaser.Game(config);
