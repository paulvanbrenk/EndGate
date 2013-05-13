/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="LoadMapHandler.ts" />
/// <reference path="RPG.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        rpg: RPG = null,
        resourceSheet: eg.Graphics.Assets.ImageSource = new eg.Graphics.Assets.ImageSource("images/wood_tileset_3.png", 512, 512),
        resources: eg.Graphics.Assets.ImageSource[] = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, 32, 32),
        scenery: eg.Map.SquareTileMap,
        loadMapHandler: LoadMapHandler;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    rpg = new RPG(canvas);
    loadMapHandler = new LoadMapHandler(rpg.Map.Scenery, new eg.Vector2d(canvas.width / 2, canvas.height / 2), 27, 47, new eg.Size2d(32, 32), "images/wood_tileset_3.png", [
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 6, 7, 0, 154, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 22, 22, 23, 0, 154, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 48, 49, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 22, 22, 23, 0, 154, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 65, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 22, 22, 23, 0, 154, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 81, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 38, 38, 38, 39, 0, 154, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 141, 142, 142, 142, 142, 142, 143, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 157, 158, 158, 158, 158, 158, 159, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 173, 174, 174, 174, 174, 174, 175, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
[155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
    ]);

})($, window);