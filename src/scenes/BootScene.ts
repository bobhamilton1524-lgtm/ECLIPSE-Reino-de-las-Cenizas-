import Phaser from 'phaser';
import { COLORS } from '@/config/gameConfig';

export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  create(): void {
    this.cameras.main.setBackgroundColor(COLORS.BG_DARK);
    this.scene.start('Preload');
  }
}
