import Phaser from 'phaser';
import { COLORS, GAME_CONFIG } from '@/config/gameConfig';
import { InputManager } from '@/core/InputManager';
import { SaveManager } from '@/core/SaveManager';
import { Player } from '@/entities/Player';
import { TouchControls } from '@/ui/TouchControls';

export class WorldScene extends Phaser.Scene {
  private player!: Player;
  private inputManager!: InputManager;
  private saveTimer = 0;

  constructor() { super('World'); }

  create(): void {
    const { WIDTH, HEIGHT } = GAME_CONFIG;
    this.cameras.main.setBackgroundColor(COLORS.BG_FLOOR);
    const graphics = this.add.graphics();
    graphics.fillStyle(COLORS.BG_FLOOR, 1).fillRect(0, 0, WIDTH, HEIGHT);
    graphics.lineStyle(1, 0x33251d, 0.55);
    for (let x = 0; x <= WIDTH; x += 32) graphics.lineBetween(x, 0, x, HEIGHT);
    for (let y = 0; y <= HEIGHT; y += 32) graphics.lineBetween(0, y, WIDTH, y);
    // Ruinas y braseros decorativos provisionales.
    graphics.fillStyle(0x0d0b0a, 1).fillRect(20, 35, 55, 18).fillRect(405, 205, 55, 18);
    graphics.fillStyle(0x642525, 0.8).fillCircle(48, 44, 4).fillCircle(432, 214, 4);
    graphics.lineStyle(2, 0x4b3326, 0.8).strokeRect(12, 12, WIDTH - 24, HEIGHT - 24);

    this.inputManager = new InputManager(this);
    const saved = SaveManager.load();
    this.player = new Player(
      this,
      saved?.player.x ?? WIDTH / 2,
      saved?.player.y ?? HEIGHT / 2,
      this.inputManager,
    );
    new TouchControls(this, this.inputManager);

    this.add.text(7, 7, 'WASD / FLECHAS  ·  MOVER', {
      fontFamily: 'monospace', fontSize: '8px', color: '#b9aa98',
      backgroundColor: '#090909aa', padding: { x: 4, y: 3 },
    }).setScrollFactor(0).setDepth(2000);
    const hud = this.add.text(7, HEIGHT - 8, '', {
      fontFamily: 'monospace', fontSize: '8px', color: '#e8e2d4',
      backgroundColor: '#090909aa', padding: { x: 4, y: 3 },
    }).setOrigin(0, 1).setScrollFactor(0).setDepth(2000);
    this.events.on('update', () => hud.setText(`X:${this.player.x.toFixed(0)} Y:${this.player.y.toFixed(0)}  ·  HECHICERO  NV.1`));
    this.input.keyboard?.on('keydown-ESC', () => this.scene.start('MainMenu'));
    this.add.text(WIDTH - 7, 7, 'ESC: MENÚ', {
      fontFamily: 'monospace', fontSize: '7px', color: '#8e8175',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(2000);
  }

  update(time: number, delta: number): void {
    this.player.update(time, delta);
    this.saveTimer += delta;
    if (this.saveTimer >= 3000) {
      this.saveTimer = 0;
      SaveManager.save({ player: { x: this.player.x, y: this.player.y } });
    }
  }
}
