import Phaser from 'phaser';
import { COLORS } from '@/config/gameConfig';

export class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload'); }
  preload(): void { /* Los recursos externos se incorporarán en el sprint de arte. */ }
  create(): void {
    this.cameras.main.setBackgroundColor(COLORS.BG_DARK);
    this.scene.start('MainMenu');
  }
}
