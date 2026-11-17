import Phaser from 'phaser';
import { COLORS, GAME_CONFIG } from '@/config/gameConfig';

export class MainMenuScene extends Phaser.Scene {
  constructor() { super('MainMenu'); }

  create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(COLORS.BG_DARK);
    const backdrop = this.add.graphics();
    backdrop.fillGradientStyle(0x090909, 0x090909, 0x211313, 0x090909, 1);
    backdrop.fillRect(0, 0, width, height);
    backdrop.lineStyle(1, 0x5d2929, 0.25);
    for (let i = 0; i < 9; i += 1) backdrop.lineBetween(width / 2 - 120 + i * 30, height, width / 2, 70);
    this.add.circle(width / 2, 80, 34, 0x8e2828, 0.12).setStrokeStyle(1, 0x9b2d2d, 0.5);
    this.add.text(width / 2, height / 2 - 43, 'ECLIPSE', {
      fontFamily: 'monospace', fontSize: '34px', color: '#e8e2d4',
      stroke: '#260d0d', strokeThickness: 4,
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 - 10, 'REINO DE LAS CENIZAS', {
      fontFamily: 'monospace', fontSize: '10px', color: '#b94b4b', letterSpacing: 3,
    }).setOrigin(0.5);
    const hint = this.add.text(width / 2, height / 2 + 45, 'TOCA O PULSA PARA COMENZAR', {
      fontFamily: 'monospace', fontSize: '9px', color: '#d5cbbb',
    }).setOrigin(0.5);
    this.tweens.add({ targets: hint, alpha: 0.35, duration: 850, yoyo: true, repeat: -1 });
    const start = (): void => this.scene.start('World');
    this.input.once('pointerdown', start);
    this.input.keyboard?.once('keydown-SPACE', start);
    this.input.keyboard?.once('keydown-ENTER', start);
    this.add.text(5, GAME_CONFIG.HEIGHT - 9, 'PROTOTIPO 0.1  |  SPRINT 0', {
      fontFamily: 'monospace', fontSize: '7px', color: '#655c54',
    }).setOrigin(0, 0.5);
  }
}
