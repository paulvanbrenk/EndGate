/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="BoundingRectangle.ts" />
/// <reference path="Bounds2d.ts" />

module EndGate.Core.BoundingObject {

    export class BoundingCircle implements ITyped extends Bounds2d {
        public _type: string = "BoundingCircle";
        public _boundsType: string = "BoundingCircle";

        public Radius: number;

        constructor(position: Assets.Vector2d, radius: number) {
            super(position);

            this.Radius = radius;
        }

        private static ClosestTo(val: number, topLeft: Assets.Vector2d, botRight: Assets.Vector2d): number
        {
            if (val < topLeft.X) {
                return topLeft.X;
            }
            else if (val > botRight.X) {
                return botRight.X;
            }

            return val;
        }

        public Area(): number {
            return Math.PI * this.Radius * this.Radius;
        }

        public Circumfrence(): number {
            return 2 * Math.PI * this.Radius;
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsCircle(circle: EndGate.Core.BoundingObject.BoundingCircle): bool {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsRectangle(rectangle: EndGate.Core.BoundingObject.BoundingRectangle): bool {
            var translated = (rectangle.Rotation === 0)
                                  ? this.Position
                                  : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

            var unrotatedTopLeft: Assets.Vector2d = new Assets.Vector2d(rectangle.Position.X - rectangle.Size.HalfWidth(), rectangle.Position.Y - rectangle.Size.HalfHeight()),
                unrotatedBotRight = new Assets.Vector2d(rectangle.Position.X + rectangle.Size.HalfWidth(), rectangle.Position.Y + rectangle.Size.HalfHeight()),
                closest = new Assets.Vector2d(BoundingCircle.ClosestTo(translated.X, unrotatedTopLeft, unrotatedBotRight), BoundingCircle.ClosestTo(translated.Y, unrotatedTopLeft, unrotatedBotRight));

            return translated.Distance(closest).Magnitude() < this.Radius;
        }

        public ContainsPoint(point: Assets.Vector2d): bool {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }
    }

}