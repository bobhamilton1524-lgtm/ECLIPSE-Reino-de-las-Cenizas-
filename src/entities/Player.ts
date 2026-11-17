import Phaser from 'phaser';
import { COLORS, GAME_CONFIG } from '@/config/gameConfig';
import type { InputManager } from '@/core/InputManager';

/** Personaje provisional del Sprint 0; se sustituirá por sprites animados. */
export class Player extends Phaser.GameObjects.Container {
  private input: InputManager;
  private bodyRect: Phaser.GameObjects.Rectangle;
  private shadow: Phaser.GameObjects.Ellipse;
  private physicsBody!: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number, input: InputManager) {
    super(scene, x, y);
    this.input = input;
    this.shadow = scene.add.ellipse(0, 7, 15, 6, 0x000000, 0.45);
    const cloak = scene.add.rectangle(0, 0, 12, 14, 0x292329).setStrokeStyle(1, 0x6e3434);
    this.bodyRect = scene.add.rectangle(0, -2, 7, 8, COLORS.PLAYER);
    const head = scene.add.rectangle(0, -9, 7, 6, 0xd6b98b);
    const hood = scene.add.triangle(0, -13, -5, 4, 5, 4, 0, -5, 0x4b2528);
    this.add([this.shadow, cloak, this.bodyRect, head, hood]);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.physicsBody = (this as Phaser.GameObjects.Container & { body: Phaser.Physics.Arcade.Body }).body;
    this.physicsBody.setCollideWorldBounds(true);
    this.physicsBody.setSize(10, 12).setOffset(-5, -8);
    this.setDepth(y);
  }

  update(_time: number, _delta: number): void {
    const direction = this.input.getMovement();
    this.physicsBody.setVelocity(direction.x * GAME_CONFIG.PLAYER_SPEED, direction.y * GAME_CONFIG.PLAYER_SPEED);
    this.setDepth(this.y);
    if (direction.x !== 0) this.bodyRect.setScale(direction.x < 0 ? -1 : 1, 1);
  }
}
