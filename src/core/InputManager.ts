import Phaser from 'phaser';

/** Unifica teclado, joystick táctil y futuros controles. */
export class InputManager {
  private keys: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key> | null = null;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private touchVector = new Phaser.Math.Vector2(0, 0);

  constructor(scene: Phaser.Scene) {
    const keyboard = scene.input.keyboard;
    if (keyboard) {
      this.keys = {
        up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
      this.cursorKeys = keyboard.createCursorKeys();
    }
  }

  setTouchVector(x: number, y: number): void {
    this.touchVector.set(x, y);
  }

  getMovement(): Phaser.Math.Vector2 {
    const vector = new Phaser.Math.Vector2(0, 0);
    if (this.keys) {
      if (this.keys.left.isDown) vector.x -= 1;
      if (this.keys.right.isDown) vector.x += 1;
      if (this.keys.up.isDown) vector.y -= 1;
      if (this.keys.down.isDown) vector.y += 1;
    }
    if (this.cursorKeys) {
      if (this.cursorKeys.left.isDown) vector.x -= 1;
      if (this.cursorKeys.right.isDown) vector.x += 1;
      if (this.cursorKeys.up.isDown) vector.y -= 1;
      if (this.cursorKeys.down.isDown) vector.y += 1;
    }
    vector.add(this.touchVector);
    if (vector.lengthSq() > 1) vector.normalize();
    return vector;
  }
}
