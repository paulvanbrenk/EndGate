var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        var GameTime = (function () {
            function GameTime() {
                this._type = "GameTime";
                this.Now = new Date();
                this._start = this.Now.getTime();
            }
            GameTime.prototype.Update = function () {
                var now = new Date(), nowMs = now.getTime();
                this.Elapsed = nowMs - this.Now.getTime();
                this.ElapsedSecond = this.Elapsed / 1000;
                this.Total = nowMs - this._start;
                this.Now = now;
            };
            return GameTime;
        })();
        Core.GameTime = GameTime;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
            })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Loopers) {
            var LooperCallback = (function () {
                function LooperCallback(callback) {
                    this._type = "LooperCallback";
                    this.Callback = callback;
                    this.ID = LooperCallback._ids++;
                }
                LooperCallback._ids = 0;
                return LooperCallback;
            })();
            Loopers.LooperCallback = LooperCallback;            
        })(Core.Loopers || (Core.Loopers = {}));
        var Loopers = Core.Loopers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
            })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Loopers) {
            var TimedCallback = (function (_super) {
                __extends(TimedCallback, _super);
                function TimedCallback(fps, callback) {
                                _super.call(this, callback);
                    this._type = "TimedCallback";
                    this.Fps = fps;
                    this.TimeoutID = 0;
                    this.Active = false;
                }
                return TimedCallback;
            })(Loopers.LooperCallback);
            Loopers.TimedCallback = TimedCallback;            
        })(Core.Loopers || (Core.Loopers = {}));
        var Loopers = Core.Loopers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Loopers) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (timedCallback) {
                    var _this = this;
                    this._callbacks.push(timedCallback);
                    timedCallback.Active = true;
                    if(this._running) {
                        window.setTimeout(function () {
                            _this.Loop(timedCallback);
                        }, 0);
                    }
                };
                Looper.prototype.RemoveCallback = function (timedCallback) {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === timedCallback.ID) {
                            window.clearTimeout(timedCallback.TimeoutID);
                            timedCallback.Active = false;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };
                Looper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };
                Looper.prototype.Run = function () {
                    var _this = this;
                    for(var i = 0; i < this._callbacks.length; i++) {
                        window.setTimeout((function (index) {
                            return function () {
                                _this.Loop(_this._callbacks[index]);
                            };
                        })(i), 0);
                    }
                };
                Looper.prototype.Loop = function (timedCallback) {
                    var that = this, msTimer = 1000 / timedCallback.Fps;
                    timedCallback.Callback();
                    if(timedCallback.Active) {
                        timedCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(timedCallback);
                        }, msTimer);
                    }
                };
                Looper.prototype.Dispose = function () {
                    for(var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }
                    this._callbacks = [];
                    this._running = false;
                };
                return Looper;
            })();
            Loopers.Looper = Looper;            
        })(Core.Loopers || (Core.Loopers = {}));
        var Loopers = Core.Loopers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
window.OnRepaintCompleted = (function () {
    return (window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || (window).msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 0);
    });
})();
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Loopers) {
            var RepaintLooper = (function () {
                function RepaintLooper() {
                    this._type = "RepaintLooper";
                    this._running = false;
                    this._callbacksModified = false;
                    this._callbacks = [];
                }
                RepaintLooper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };
                RepaintLooper.prototype.Run = function () {
                    var _this = this;
                    if(this._running) {
                        this._callbacksModified = false;
                        for(var i = 0; i < this._callbacks.length; i++) {
                            this._callbacks[i].Callback();
                            if(this._callbacksModified) {
                                break;
                            }
                        }
                        window.OnRepaintCompleted(function () {
                            _this.Run();
                        });
                    }
                };
                RepaintLooper.prototype.AddCallback = function (looperCallback) {
                    this._callbacksModified = true;
                    this._callbacks.push(looperCallback);
                };
                RepaintLooper.prototype.RemoveCallback = function (looperCallback) {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === looperCallback.ID) {
                            this._callbacksModified = true;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };
                RepaintLooper.prototype.Dispose = function () {
                    this._callbacksModified = true;
                    this._callbacks = [];
                    this._running = false;
                };
                return RepaintLooper;
            })();
            Loopers.RepaintLooper = RepaintLooper;            
        })(Core.Loopers || (Core.Loopers = {}));
        var Loopers = Core.Loopers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        var GameConfiguration = (function () {
            function GameConfiguration(updateRateSetter) {
                this._defaultUpdateRate = 40;
                this._updateRateSetter = updateRateSetter;
                this.UpdateRate(this._defaultUpdateRate);
            }
            GameConfiguration.prototype.UpdateRate = function (updateRate) {
                if(typeof updateRate !== "undefined") {
                    this._updateRate = updateRate;
                    this._updateRateSetter(this._updateRate);
                } else {
                    return this._updateRate;
                }
            };
            return GameConfiguration;
        })();
        Core.GameConfiguration = GameConfiguration;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
Math.roundTo = function (val, decimals) {
    var multiplier = Math.pow(10, decimals);
    return Math.round(val * multiplier) / multiplier;
};
Math.twoPI = Math.PI * 2;
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
            var Vector2d = (function () {
                function Vector2d(x, y) {
                    this._type = "Vector2d";
                    this.X = x || 0;
                    this.Y = y || 0;
                }
                Vector2d.Zero = function Zero() {
                    return new Vector2d(0, 0);
                };
                Vector2d.One = function One() {
                    return new Vector2d(1, 1);
                };
                Vector2d.prototype.ProjectOnto = function (v) {
                    return v.Multiply(this.Dot(v) / v.Dot(v));
                };
                Vector2d.prototype.RotateAround = function (point, angle, precision) {
                    if (typeof precision === "undefined") { precision = 2; }
                    var ca = Math.cos(-angle);
                    var sa = Math.sin(-angle);
                    return new Vector2d(Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision), Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision));
                };
                Vector2d.prototype.Apply = function (action) {
                    this.X = action(this.X);
                    this.Y = action(this.Y);
                };
                Vector2d.prototype.Trigger = function (action) {
                    action(this.X);
                    action(this.Y);
                };
                Vector2d.prototype.Normalized = function () {
                    var magnitude = this.Magnitude();
                    return new Vector2d(this.X / magnitude, this.Y / magnitude);
                };
                Vector2d.prototype.Magnitude = function () {
                    return Math.sqrt(this.X * this.X + this.Y * this.Y);
                };
                Vector2d.prototype.Length = function () {
                    return this.Magnitude();
                };
                Vector2d.prototype.Dot = function (v1) {
                    return v1.X * this.X + v1.Y * this.Y;
                };
                Vector2d.prototype.Abs = function () {
                    return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
                };
                Vector2d.prototype.Sign = function () {
                    return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
                };
                Vector2d.prototype.Distance = function (v1) {
                    return new Vector2d(Math.abs(v1.X - this.X), Math.abs(v1.Y - this.Y));
                };
                Vector2d.prototype.Add = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X + val.X, this.Y + val.Y);
                    } else {
                        return new Vector2d(this.X + val, this.Y + val);
                    }
                };
                Vector2d.prototype.Multiply = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X * val.X, this.Y * val.Y);
                    } else {
                        return new Vector2d(this.X * val, this.Y * val);
                    }
                };
                Vector2d.prototype.Subtract = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X - val.X, this.Y - val.Y);
                    } else {
                        return new Vector2d(this.X - val, this.Y - val);
                    }
                };
                Vector2d.prototype.SubtractFrom = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(val.X - this.X, val.Y - this.Y);
                    } else {
                        return new Vector2d(val - this.X, val - this.Y);
                    }
                };
                Vector2d.prototype.Divide = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X / val.X, this.Y / val.Y);
                    } else {
                        return new Vector2d(this.X / val, this.Y / val);
                    }
                };
                Vector2d.prototype.DivideFrom = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(val.X / this.X, val.Y / this.Y);
                    } else {
                        return new Vector2d(val / this.X, val / this.Y);
                    }
                };
                Vector2d.prototype.Negate = function () {
                    return new Vector2d(this.X * -1, this.Y * -1);
                };
                Vector2d.prototype.Equivalent = function (v) {
                    return this.X === v.X && this.Y === v.Y;
                };
                Vector2d.prototype.Clone = function () {
                    return new Vector2d(this.X, this.Y);
                };
                Vector2d.prototype.toString = function () {
                    return "(" + this.X + ", " + this.Y + ")";
                };
                return Vector2d;
            })();
            Assets.Vector2d = Vector2d;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (BoundingObject) {
            var Bounds2d = (function () {
                function Bounds2d() {
                    this.Position = Core.Assets.Vector2d.Zero();
                    this.Rotation = 0;
                }
                Bounds2d.prototype.ContainsPoint = function (point) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.Intersects = function (obj) {
                    if(obj._type === "BoundingCircle") {
                        return this.IntersectsCircle(obj);
                    } else if(obj._type === "BoundingRectangle") {
                        return this.IntersectsRectangle(obj);
                    } else {
                        throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
                    }
                };
                Bounds2d.prototype.IntersectsCircle = function (circle) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.IntersectsRectangle = function (rectangle) {
                    throw new Error("This method is abstract!");
                };
                return Bounds2d;
            })();
            BoundingObject.Bounds2d = Bounds2d;            
        })(Core.BoundingObject || (Core.BoundingObject = {}));
        var BoundingObject = Core.BoundingObject;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var EventHandler = (function () {
                function EventHandler() {
                    this._type = "Event";
                    this._actions = [];
                }
                EventHandler.prototype.Bind = function (action) {
                    this._actions.push(action);
                };
                EventHandler.prototype.Unbind = function (action) {
                    for(var i = 0; i < this._actions.length; i++) {
                        if(this._actions[i] === action) {
                            this._actions.splice(i, 1);
                            return;
                        }
                    }
                };
                EventHandler.prototype.Trigger = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    for(var i = 0; i < this._actions.length; i++) {
                        this._actions[i].apply(this, args);
                    }
                };
                return EventHandler;
            })();
            Utilities.EventHandler = EventHandler;            
        })(Core.Utilities || (Core.Utilities = {}));
        var Utilities = Core.Utilities;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Collision) {
            var CollisionData = (function () {
                function CollisionData(at, w) {
                    this.At = at;
                    this.With = w;
                }
                return CollisionData;
            })();
            Collision.CollisionData = CollisionData;            
        })(Core.Collision || (Core.Collision = {}));
        var Collision = Core.Collision;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Collision) {
            var Collidable = (function () {
                function Collidable(bounds) {
                    this._type = "Collidable";
                    this._disposed = false;
                    this.Bounds = bounds;
                    this.ID = Collidable._collidableIDs++;
                    this.OnCollision = new Core.Utilities.EventHandler();
                    this.OnDisposed = new Core.Utilities.EventHandler();
                }
                Collidable._collidableIDs = 0;
                Collidable.prototype.IsCollidingWith = function (other) {
                    return this.Bounds.Intersects(other.Bounds);
                };
                Collidable.prototype.Collided = function (data) {
                    this.OnCollision.Trigger(data);
                };
                Collidable.prototype.Dispose = function () {
                    if(!this._disposed) {
                        this._disposed = true;
                        this.OnDisposed.Trigger(this);
                    } else {
                        throw new Error("Cannot dispose collidable twice.");
                    }
                };
                return Collidable;
            })();
            Collision.Collidable = Collidable;            
        })(Core.Collision || (Core.Collision = {}));
        var Collision = Core.Collision;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Collision) {
            var CollisionManager = (function () {
                function CollisionManager() {
                    this._type = "CollisionManager";
                    this._collidables = [];
                    this._enabled = false;
                    this.OnCollision = new Core.Utilities.EventHandler();
                }
                CollisionManager.prototype.Monitor = function (obj) {
                    var _this = this;
                    this._enabled = true;
                    obj.OnDisposed.Bind(function () {
                        _this.Unmonitor(obj);
                    });
                    this._collidables.push(obj);
                };
                CollisionManager.prototype.Unmonitor = function (obj) {
                    for(var i = 0; i < this._collidables.length; i++) {
                        if(this._collidables[i].ID === obj.ID) {
                            this._collidables.splice(i, 1);
                            break;
                        }
                    }
                };
                CollisionManager.prototype.Update = function (gameTime) {
                    var first, second;
                    if(this._enabled) {
                        for(var i = 0; i < this._collidables.length; i++) {
                            first = this._collidables[i];
                            for(var j = i + 1; j < this._collidables.length; j++) {
                                second = this._collidables[j];
                                if(first.IsCollidingWith(second)) {
                                    first.Collided(new Collision.CollisionData(first.Bounds.Position.Clone(), second));
                                    second.Collided(new Collision.CollisionData(second.Bounds.Position.Clone(), first));
                                    this.OnCollision.Trigger(first, second);
                                }
                            }
                        }
                    }
                };
                return CollisionManager;
            })();
            Collision.CollisionManager = CollisionManager;            
        })(Core.Collision || (Core.Collision = {}));
        var Collision = Core.Collision;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
            })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Rendering) {
            var Renderer2d = (function () {
                function Renderer2d(renderOnto) {
                    this._visibleCanvas = renderOnto;
                    this._visibleContext = renderOnto.getContext("2d");
                    this._bufferCanvas = document.createElement("canvas");
                    this._bufferContext = this._bufferCanvas.getContext("2d");
                    this.UpdateBufferSize();
                    this._disposed = false;
                }
                Renderer2d._zindexSort = function (a, b) {
                    return a.ZIndex - b.ZIndex;
                };
                Renderer2d.prototype.Render = function (renderables) {
                    if(this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                        this.UpdateBufferSize();
                    }
                    renderables.sort(Renderer2d._zindexSort);
                    this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
                    for(var i = 0; i < renderables.length; i++) {
                        renderables[i].Draw(this._bufferContext);
                    }
                    this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
                    this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
                };
                Renderer2d.prototype.Dispose = function () {
                    if(!this._disposed) {
                        this._disposed = true;
                        this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                    }
                };
                Renderer2d.prototype.UpdateBufferSize = function () {
                    this._bufferCanvas.width = this._visibleCanvas.width;
                    this._bufferCanvas.height = this._visibleCanvas.height;
                };
                return Renderer2d;
            })();
            Rendering.Renderer2d = Renderer2d;            
        })(Core.Rendering || (Core.Rendering = {}));
        var Rendering = Core.Rendering;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Rendering) {
            var Scene = (function () {
                function Scene(drawArea) {
                    this._type = "Scene";
                    this._actors = [];
                    if(typeof drawArea === "undefined") {
                        drawArea = this.CreateDefaultDrawArea();
                    }
                    this._renderer = new Rendering.Renderer2d(drawArea);
                    this._disposed = false;
                }
                Scene.prototype.Add = function (actor) {
                    this._actors.push(actor);
                };
                Scene.prototype.Remove = function (actor) {
                    for(var i = 0; i < this._actors.length; i++) {
                        if(this._actors[i] === actor) {
                            this._actors.splice(i, 1);
                            return;
                        }
                    }
                };
                Scene.prototype.Draw = function () {
                    this._renderer.Render(this._actors);
                };
                Scene.prototype.Dispose = function () {
                    if(!this._disposed) {
                        this._disposed = true;
                        this._actors = [];
                        this._renderer.Dispose();
                    }
                };
                Scene.prototype.CreateDefaultDrawArea = function () {
                    var drawArea = document.createElement("canvas");
                    drawArea.width = window.innerWidth;
                    drawArea.height = window.innerHeight;
                    document.getElementsByTagName('body')[0].appendChild(drawArea);
                    return drawArea;
                };
                return Scene;
            })();
            Rendering.Scene = Scene;            
        })(Core.Rendering || (Core.Rendering = {}));
        var Rendering = Core.Rendering;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        var Game = (function () {
            function Game(gameCanvas) {
                this._type = "Game";
                this._gameTime = new Core.GameTime();
                this.ZIndex = -1000;
                this.ID = Game._gameIds++;
                this.Scene = new Core.Rendering.Scene(gameCanvas);
                this.Scene.Add(this);
                this.CollisionManager = new Core.Collision.CollisionManager();
                this.Configuration = new Core.GameConfiguration(GameRunnerInstance.Register(this));
            }
            Game._gameIds = 0;
            Game.prototype.PrepareUpdate = function () {
                this._gameTime.Update();
                this.CollisionManager.Update(this._gameTime);
                this.Update(this._gameTime);
            };
            Game.prototype.Update = function (gameTime) {
            };
            Game.prototype.PrepareDraw = function () {
                this.Scene.Draw();
            };
            Game.prototype.Draw = function (context) {
            };
            Game.prototype.Dispose = function () {
                this.Scene.Dispose();
                GameRunnerInstance.Unregister(this);
            };
            return Game;
        })();
        Core.Game = Game;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        var GameRunner = (function () {
            function GameRunner() {
                this._type = "GameRunner";
                this._updateCallbacks = {
                };
                this._drawCallbacks = {
                };
                this._updateLoop = null;
                this._drawLoop = null;
                this._callbackCount = 0;
            }
            GameRunner.prototype.Register = function (game) {
                var updateCallback = this.CreateAndCacheUpdateCallback(game);
                var drawCallback = this.CreateAndCacheDrawCallback(game);
                this._callbackCount++;
                this.TryLoopStart();
                this._updateLoop.AddCallback(updateCallback);
                this._drawLoop.AddCallback(drawCallback);
                return this.CreateUpdateRateSetter(updateCallback);
            };
            GameRunner.prototype.Unregister = function (game) {
                var updateCallback, drawCallback;
                if(this._updateCallbacks[game.ID]) {
                    updateCallback = this._updateCallbacks[game.ID];
                    drawCallback = this._drawCallbacks[game.ID];
                    this._updateLoop.RemoveCallback(updateCallback);
                    this._drawLoop.RemoveCallback(drawCallback);
                    delete this._updateCallbacks[game.ID];
                    delete this._drawCallbacks[game.ID];
                    this._callbackCount--;
                    this.TryLoopStop();
                }
            };
            GameRunner.prototype.TryLoopStart = function () {
                if(this._callbackCount === 1) {
                    this._updateLoop = new Core.Loopers.Looper();
                    this._updateLoop.Start();
                    this._drawLoop = new Core.Loopers.RepaintLooper();
                    this._drawLoop.Start();
                }
            };
            GameRunner.prototype.TryLoopStop = function () {
                if(this._callbackCount === 0 && this._updateLoop != null) {
                    this._updateLoop.Dispose();
                    this._updateLoop = null;
                    this._drawLoop.Dispose();
                    this._drawLoop = null;
                }
            };
            GameRunner.prototype.CreateAndCacheUpdateCallback = function (game) {
                var updateCallback = new Core.Loopers.TimedCallback(0, function () {
                    game.PrepareUpdate();
                });
                this._updateCallbacks[game.ID] = updateCallback;
                return updateCallback;
            };
            GameRunner.prototype.CreateAndCacheDrawCallback = function (game) {
                var drawCallback = new Core.Loopers.LooperCallback(function () {
                    game.PrepareDraw();
                });
                this._drawCallbacks[game.ID] = drawCallback;
                return drawCallback;
            };
            GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
                return function (updateRate) {
                    callback.Fps = updateRate;
                };
            };
            return GameRunner;
        })();
        Core.GameRunner = GameRunner;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var GameRunnerInstance = new EndGate.Core.GameRunner();
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
            var Size2d = (function () {
                function Size2d(width, height) {
                    this._type = "Size2d";
                    this.Width = width || 0;
                    this.Height = typeof height !== "undefined" ? height : this.Width;
                }
                Size2d.Zero = function Zero() {
                    return new Size2d(0, 0);
                };
                Size2d.One = function One() {
                    return new Size2d(1, 1);
                };
                Size2d.prototype.Radius = function () {
                    return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
                };
                Size2d.prototype.HalfWidth = function () {
                    return this.Width / 2;
                };
                Size2d.prototype.HalfHeight = function () {
                    return this.Height / 2;
                };
                Size2d.prototype.Apply = function (action) {
                    this.Width = action(this.Width);
                    this.Height = action(this.Height);
                };
                Size2d.prototype.Trigger = function (action) {
                    action(this.Width);
                    action(this.Height);
                };
                Size2d.prototype.Add = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.Width + val.Width, this.Height + val.Height);
                    } else if(val._type === "Vector2d") {
                        return new Size2d(this.Width + val.X, this.Height + val.Y);
                    } else {
                        return new Size2d(this.Width + val, this.Height + val);
                    }
                };
                Size2d.prototype.Multiply = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.Width * val.Width, this.Height * val.Height);
                    } else if(val._type === "Vector2d") {
                        return new Size2d(this.Width * val.X, this.Height * val.Y);
                    } else {
                        return new Size2d(this.Width * val, this.Height * val);
                    }
                };
                Size2d.prototype.Subtract = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.Width - val.Width, this.Height - val.Height);
                    } else if(val._type === "Vector2d") {
                        return new Size2d(this.Width - val.X, this.Height - val.Y);
                    } else {
                        return new Size2d(this.Width - val, this.Height - val);
                    }
                };
                Size2d.prototype.SubtractFrom = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(val.Width - this.Width, val.Height - this.Height);
                    } else if(val._type === "Vector2d") {
                        return new Size2d(val.X - this.Width, val.Y - this.Height);
                    } else {
                        return new Size2d(val - this.Width, val - this.Height);
                    }
                };
                Size2d.prototype.Divide = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.Width / val.Width, this.Height / val.Height);
                    } else if(val._type === "Vector2d") {
                        return new Size2d(this.Width / val.X, this.Height / val.Y);
                    } else {
                        return new Size2d(this.Width / val, this.Height / val);
                    }
                };
                Size2d.prototype.DivideFrom = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(val.Width / this.Width, val.Height / this.Height);
                    } else if(val._type === "Vector2d") {
                        return new Size2d(val.X / this.Width, val.Y / this.Height);
                    } else {
                        return new Size2d(val / this.Width, val / this.Height);
                    }
                };
                Size2d.prototype.Negate = function () {
                    return new Size2d(this.Width * -1, this.Height * -1);
                };
                Size2d.prototype.Equivalent = function (v) {
                    return this.Width === v.Width && this.Height === v.Height;
                };
                Size2d.prototype.Clone = function () {
                    return new Size2d(this.Width, this.Height);
                };
                Size2d.prototype.toString = function () {
                    return "(" + this.Width + ", " + this.Height + ")";
                };
                return Size2d;
            })();
            Assets.Size2d = Size2d;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
            var MinMax = (function () {
                function MinMax(min, max) {
                    this.Min = min;
                    this.Max = max;
                }
                return MinMax;
            })();
            Assets.MinMax = MinMax;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
            var Vector2dHelpers = (function () {
                function Vector2dHelpers() { }
                Vector2dHelpers.GetMinMaxProjections = function GetMinMaxProjections(axis, vertices) {
                    var min = vertices[0].ProjectOnto(axis).Dot(axis);
                    var max = min;
                    for(var i = 1; i < vertices.length; i++) {
                        var vertex = vertices[i];
                        var value = vertex.ProjectOnto(axis).Dot(axis);
                        if(value < min) {
                            min = value;
                        } else if(value > max) {
                            max = value;
                        }
                    }
                    return new Assets.MinMax(min, max);
                };
                return Vector2dHelpers;
            })();
            Assets.Vector2dHelpers = Vector2dHelpers;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (BoundingObject) {
            var BoundingCircle = (function (_super) {
                __extends(BoundingCircle, _super);
                function BoundingCircle(radius) {
                                _super.call(this);
                    this._type = "BoundingCircle";
                    this.Radius = radius;
                }
                BoundingCircle.ClosestTo = function ClosestTo(val, topLeft, botRight) {
                    if(val < topLeft.X) {
                        return topLeft.X;
                    } else if(val > botRight.X) {
                        return botRight.X;
                    }
                    return val;
                };
                BoundingCircle.prototype.Area = function () {
                    return Math.PI * this.Radius * this.Radius;
                };
                BoundingCircle.prototype.Circumfrence = function () {
                    return 2 * Math.PI * this.Radius;
                };
                BoundingCircle.prototype.IntersectsCircle = function (circle) {
                    return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
                };
                BoundingCircle.prototype.IntersectsRectangle = function (rectangle) {
                    var translated = (rectangle.Rotation === 0) ? this.Position : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);
                    var unrotatedTopLeft = new Core.Assets.Vector2d(rectangle.Position.X - rectangle.Size.HalfWidth(), rectangle.Position.Y - rectangle.Size.HalfHeight()), unrotatedBotRight = new Core.Assets.Vector2d(rectangle.Position.X + rectangle.Size.HalfWidth(), rectangle.Position.Y + rectangle.Size.HalfHeight()), closest = new Core.Assets.Vector2d(BoundingCircle.ClosestTo(translated.X, unrotatedTopLeft, unrotatedBotRight), BoundingCircle.ClosestTo(translated.Y, unrotatedTopLeft, unrotatedBotRight));
                    return translated.Distance(closest).Magnitude() < this.Radius;
                };
                BoundingCircle.prototype.ContainsPoint = function (point) {
                    return this.Position.Distance(point).Magnitude() < this.Radius;
                };
                return BoundingCircle;
            })(BoundingObject.Bounds2d);
            BoundingObject.BoundingCircle = BoundingCircle;            
        })(Core.BoundingObject || (Core.BoundingObject = {}));
        var BoundingObject = Core.BoundingObject;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (BoundingObject) {
            var BoundingRectangle = (function (_super) {
                __extends(BoundingRectangle, _super);
                function BoundingRectangle(first, second) {
                                _super.call(this);
                    this._type = "BoundingRectangle";
                    if(typeof second !== "undefined") {
                        this.Size = new Core.Assets.Size2d(first, second);
                    } else {
                        this.Size = first;
                    }
                }
                BoundingRectangle.prototype.Vertices = function () {
                    return [
                        this.TopLeft(), 
                        this.TopRight(), 
                        this.BotLeft(), 
                        this.BotRight()
                    ];
                };
                BoundingRectangle.prototype.TopLeft = function () {
                    var v = new Core.Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.TopRight = function () {
                    var v = new Core.Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.BotLeft = function () {
                    var v = new Core.Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.BotRight = function () {
                    var v = new Core.Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                    return circle.IntersectsRectangle(this);
                };
                BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
                    if(this.Rotation === 0 && rectangle.Rotation === 0) {
                        var myTopLeft = this.TopLeft(), myBotRight = this.BotRight(), theirTopLeft = rectangle.TopLeft(), theirBotRight = rectangle.BotRight();
                        return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                    } else if(rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius() + this.Size.Radius()) {
                        var axisList = [
                            this.TopRight().Subtract(this.TopLeft()), 
                            this.TopRight().Subtract(this.BotRight()), 
                            rectangle.TopLeft().Subtract(rectangle.BotLeft()), 
                            rectangle.TopLeft().Subtract(rectangle.TopRight())
                        ];
                        var myVertices = this.Vertices();
                        var theirVertices = rectangle.Vertices();
                        for(var i = 0; i < axisList.length; i++) {
                            var axi = axisList[i];
                            var myProjections = Core.Assets.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                            var theirProjections = Core.Assets.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);
                            if(theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                };
                BoundingRectangle.prototype.ContainsPoint = function (point) {
                    var savedRotation = this.Rotation;
                    if(this.Rotation !== 0) {
                        this.Rotation = 0;
                        point = point.RotateAround(this.Position, -savedRotation);
                    }
                    var myTopLeft = this.TopLeft(), myBotRight = this.BotRight();
                    this.Rotation = savedRotation;
                    return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
                };
                return BoundingRectangle;
            })(BoundingObject.Bounds2d);
            BoundingObject.BoundingRectangle = BoundingRectangle;            
        })(Core.BoundingObject || (Core.BoundingObject = {}));
        var BoundingObject = Core.BoundingObject;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (LineCapType) {
                LineCapType._map = [];
                LineCapType._map[0] = "butt";
                LineCapType.butt = 0;
                LineCapType._map[1] = "round";
                LineCapType.round = 1;
                LineCapType._map[2] = "square";
                LineCapType.square = 2;
            })(Graphics.LineCapType || (Graphics.LineCapType = {}));
            var LineCapType = Graphics.LineCapType;
            ;
            (function (LineJoinType) {
                LineJoinType._map = [];
                LineJoinType._map[0] = "bevel";
                LineJoinType.bevel = 0;
                LineJoinType._map[1] = "round";
                LineJoinType.round = 1;
                LineJoinType._map[2] = "miter";
                LineJoinType.miter = 2;
            })(Graphics.LineJoinType || (Graphics.LineJoinType = {}));
            var LineJoinType = Graphics.LineJoinType;
            ;
            (function (TextAlignType) {
                TextAlignType._map = [];
                TextAlignType._map[0] = "center";
                TextAlignType.center = 0;
                TextAlignType._map[1] = "end";
                TextAlignType.end = 1;
                TextAlignType._map[2] = "left";
                TextAlignType.left = 2;
                TextAlignType._map[3] = "right";
                TextAlignType.right = 3;
                TextAlignType._map[4] = "start";
                TextAlignType.start = 4;
            })(Graphics.TextAlignType || (Graphics.TextAlignType = {}));
            var TextAlignType = Graphics.TextAlignType;
            ;
            (function (TextBaselineType) {
                TextBaselineType._map = [];
                TextBaselineType._map[0] = "alphabetic";
                TextBaselineType.alphabetic = 0;
                TextBaselineType._map[1] = "top";
                TextBaselineType.top = 1;
                TextBaselineType._map[2] = "hanging";
                TextBaselineType.hanging = 2;
                TextBaselineType._map[3] = "middle";
                TextBaselineType.middle = 3;
                TextBaselineType._map[4] = "ideographic";
                TextBaselineType.ideographic = 4;
                TextBaselineType._map[5] = "bottom";
                TextBaselineType.bottom = 5;
            })(Graphics.TextBaselineType || (Graphics.TextBaselineType = {}));
            var TextBaselineType = Graphics.TextBaselineType;
            ;
            var Graphic2dState = (function () {
                function Graphic2dState() {
                    this._type = "Graphic2dState";
                    this._cachedState = {
                    };
                }
                Graphic2dState.prototype.StrokeStyle = function (value) {
                    return this.GetOrSetCache("strokeStyle", value);
                };
                Graphic2dState.prototype.FillStyle = function (value) {
                    return this.GetOrSetCache("fillStyle", value);
                };
                Graphic2dState.prototype.GlobalAlpha = function (value) {
                    return this.GetOrSetCache("globalAlpha", value);
                };
                Graphic2dState.prototype.LineWidth = function (value) {
                    return this.GetOrSetCache("lineWidth", value);
                };
                Graphic2dState.prototype.LineCap = function (value) {
                    return this.GetOrSetCache("lineCap", value);
                };
                Graphic2dState.prototype.LineJoin = function (value) {
                    return this.GetOrSetCache("lineJoin", value);
                };
                Graphic2dState.prototype.MiterLimit = function (value) {
                    return this.GetOrSetCache("miterLimit", value);
                };
                Graphic2dState.prototype.ShadowOffsetX = function (value) {
                    return this.GetOrSetCache("shadowOffsetX", value);
                };
                Graphic2dState.prototype.ShadowOffsetY = function (value) {
                    return this.GetOrSetCache("shadowOffsetY", value);
                };
                Graphic2dState.prototype.ShadowBlur = function (value) {
                    return this.GetOrSetCache("shadowBlur", value);
                };
                Graphic2dState.prototype.ShadowColor = function (value) {
                    return this.GetOrSetCache("shadowColor", value);
                };
                Graphic2dState.prototype.GlobalCompositeOperation = function (value) {
                    return this.GetOrSetCache("globalCompositeOperation", value);
                };
                Graphic2dState.prototype.Font = function (value) {
                    return this.GetOrSetCache("font", value);
                };
                Graphic2dState.prototype.TextAlign = function (value) {
                    return this.GetOrSetCache("textAlign", value);
                };
                Graphic2dState.prototype.TextBaseline = function (value) {
                    return this.GetOrSetCache("textBaseline", value);
                };
                Graphic2dState.prototype.SetContextState = function (context) {
                    for(var key in this._cachedState) {
                        context[key] = this._cachedState[key];
                    }
                };
                Graphic2dState.prototype.GetOrSetCache = function (property, value) {
                    if(typeof value !== "undefined") {
                        this._cachedState[property] = value;
                    }
                    return this._cachedState[property];
                };
                return Graphic2dState;
            })();
            Graphics.Graphic2dState = Graphic2dState;            
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            var Graphic2d = (function () {
                function Graphic2d(position, size) {
                    this._type = "Graphic2d";
                    this.Position = position;
                    this.Size = size;
                    this.ZIndex = 0;
                    this.Rotation = 0;
                    this.State = new Graphics.Graphic2dState();
                }
                Graphic2d.prototype.StartDraw = function (context) {
                    context.save();
                    this.State.SetContextState(context);
                    if(this.Rotation !== 0) {
                        context.translate(this.Position.X, this.Position.Y);
                        context.rotate(this.Rotation);
                        context.translate(-this.Position.X, -this.Position.Y);
                    }
                };
                Graphic2d.prototype.EndDraw = function (context) {
                    context.restore();
                };
                Graphic2d.prototype.Draw = function (context) {
                };
                return Graphic2d;
            })();
            Graphics.Graphic2d = Graphic2d;            
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Shapes) {
                var Shape = (function (_super) {
                    __extends(Shape, _super);
                    function Shape(position, size, color) {
                                        _super.call(this, position, size);
                        this._type = "Shape";
                        this._fill = false;
                        this._stroke = false;
                        if(typeof color !== "undefined") {
                            this.Color(color);
                        }
                    }
                    Shape.prototype.Color = function (color) {
                        this._fill = true;
                        return this.State.FillStyle(color);
                    };
                    Shape.prototype.Border = function (thickness, color) {
                        return [
                            this.BorderThickness(thickness), 
                            this.BorderColor(color)
                        ];
                    };
                    Shape.prototype.BorderThickness = function (thickness) {
                        return this.State.LineWidth(thickness);
                    };
                    Shape.prototype.BorderColor = function (color) {
                        this._stroke = true;
                        return this.State.StrokeStyle(color);
                    };
                    Shape.prototype.Shadow = function (x, y, color, blur) {
                        return [
                            this.ShadowX(x), 
                            this.ShadowY(y), 
                            this.ShadowColor(color), 
                            this.ShadowBlur(blur)
                        ];
                    };
                    Shape.prototype.ShadowColor = function (color) {
                        this._fill = true;
                        return this.State.ShadowColor(color);
                    };
                    Shape.prototype.ShadowX = function (val) {
                        return this.State.ShadowOffsetX(val);
                    };
                    Shape.prototype.ShadowY = function (val) {
                        return this.State.ShadowOffsetY(val);
                    };
                    Shape.prototype.ShadowBlur = function (val) {
                        return this.State.ShadowBlur(val);
                    };
                    Shape.prototype.Opacity = function (alpha) {
                        return this.State.GlobalAlpha(alpha);
                    };
                    Shape.prototype.StartDraw = function (context) {
                        context.beginPath();
                        _super.prototype.StartDraw.call(this, context);
                    };
                    Shape.prototype.EndDraw = function (context) {
                        if(this._fill) {
                            context.fill();
                        }
                        if(this._stroke) {
                            context.stroke();
                        } else {
                            context.closePath();
                        }
                        _super.prototype.EndDraw.call(this, context);
                    };
                    Shape.prototype.BuildPath = function (context) {
                    };
                    Shape.prototype.Draw = function (context) {
                        this.StartDraw(context);
                        this.BuildPath(context);
                        this.EndDraw(context);
                    };
                    return Shape;
                })(Graphics.Graphic2d);
                Shapes.Shape = Shape;                
            })(Graphics.Shapes || (Graphics.Shapes = {}));
            var Shapes = Graphics.Shapes;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Shapes) {
                var Circle = (function (_super) {
                    __extends(Circle, _super);
                    function Circle(x, y, radius, color) {
                                        _super.call(this, new Core.Assets.Vector2d(x, y), new Core.Assets.Size2d(radius * 2, radius * 2), color);
                        this._type = "Circle";
                        this._radius = radius;
                    }
                    Circle.prototype.Radius = function (val) {
                        if(typeof val !== "undefined") {
                            this._radius = val;
                            this.Size.Width = this.Size.Height = val * 2;
                        }
                        return this._radius;
                    };
                    Circle.prototype.Draw = function (context) {
                        this.SyncSize();
                        _super.prototype.Draw.call(this, context);
                    };
                    Circle.prototype.BuildPath = function (context) {
                        context.arc(this.Position.X, this.Position.Y, this._radius, 0, Math.twoPI);
                    };
                    Circle.prototype.SyncSize = function () {
                        var circumfrence = this._radius * 2;
                        if(circumfrence !== this.Size.Width) {
                            this.Radius(this.Size.Width / 2);
                        } else if(circumfrence !== this.Size.Height) {
                            this.Radius(this.Size.Height / 2);
                        }
                    };
                    return Circle;
                })(Shapes.Shape);
                Shapes.Circle = Circle;                
            })(Graphics.Shapes || (Graphics.Shapes = {}));
            var Shapes = Graphics.Shapes;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Shapes) {
                var Rectangle = (function (_super) {
                    __extends(Rectangle, _super);
                    function Rectangle(x, y, width, height, color) {
                                        _super.call(this, new Core.Assets.Vector2d(x, y), new Core.Assets.Size2d(width, height), color);
                        this._type = "Rectangle";
                    }
                    Rectangle.prototype.BuildPath = function (context) {
                        context.rect(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
                    };
                    return Rectangle;
                })(Shapes.Shape);
                Shapes.Rectangle = Rectangle;                
            })(Graphics.Shapes || (Graphics.Shapes = {}));
            var Shapes = Graphics.Shapes;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=endGate.core.client.js.map