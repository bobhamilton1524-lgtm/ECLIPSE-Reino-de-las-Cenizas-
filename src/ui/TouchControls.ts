import Phaser from 'phaser';
import type { InputManager } from '@/core/InputManager';

/** Joystick virtual anclado al tocar la mitad izquierda de la pantalla. */
export class TouchControls {
  private scene: Phaser.Scene;
  private input: InputManager;
  private base: Phaser.GameObjects.Arc;
  private thumb: Phaser.GameObjects.Arc;
  private pointerId: number | null = null;
  private readonly maxDistance = 28;

  constructor(scene: Phaser.Scene, input: InputManager) {
    this.scene = scene;
    this.input = input;
    const x = 60;
    const y = scene.cameras.main.height - 60;
    this.base = scene.add.circle(x, y, 36, 0xffffff, 0.12).setScrollFactor(0).setDepth(1000).setVisible(false);
    this.thumb = scene.add.circle(x, y, 16, 0xffffff, 0.3).setScrollFactor(0).setDepth(1001).setVisible(false);
    this.bindEvents();
  }

  private bindEvents(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.pointerId !== null || pointer.x > this.scene.scale.width / 2) return;
      this.pointerId = pointer.id;
      this.base.setPosition(pointer.x, pointer.y).setVisible(true);
      this.thumb.setPosition(pointer.x, pointer.y).setVisible(true);
      this.updateJoystick(pointer);
    });
    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.id === this.pointerId) this.updateJoystick(pointer);
    });
    const end = (pointer: Phaser.Input.Pointer): void => {
      if (pointer.id !== this.pointerId) return;
      this.pointerId = null;
      this.input.setTouchVector(0, 0);
      this.base.setVisible(false);
      this.thumb.setVisible(false);
    };
    this.scene.input.on('pointerup', end);
    this.scene.input.on('pointerupoutside', end);
  }

  private updateJoystick(pointer: Phaser.Input.Pointer): void {
    const dx = pointer.x - this.base.x;
    const dy = pointer.y - this.base.y;
    const distance = Math.hypot(dx, dy);
    const clamped = Math.min(distance, this.maxDistance);
    const angle = Math.atan2(dy, dx);
    this.thumb.setPosition(this.base.x + Math.cos(angle) * clamped, this.base.y + Math.sin(angle) * clamped);
    this.input.setTouchVector(
      distance === 0 ? 0 : (Math.cos(angle) * clamped) / this.maxDistance,
      distance === 0 ? 0 : (Math.sin(angle) * clamped) / this.maxDistance,
    );
  }
}
