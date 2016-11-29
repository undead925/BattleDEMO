// import H3Unit from '../h3unit'
import H3Unit from '../h3unit'

H3Unit.Component = function () {};
H3Unit.Component.install = function (components) {

    // Always install 'Core' first
    // Phaser.Utils.mixinPrototype(this, Phaser.Component.Core.prototype);

    this.unitComponents = {};

    for (var i = 0; i < components.length; i++)
    {
        var id = components[i];
        var replace = false;

        // if (id === 'Destroy')
        // {
        //     replace = true;
        // }

        Phaser.Utils.mixinPrototype(this, H3Unit.Component[id].prototype, replace);

        this.unitComponents[id] = true;
    }

};