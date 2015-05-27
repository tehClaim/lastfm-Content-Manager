/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.require([
    'LfmTool.Utilities',
    'LfmTool.view.Login'
]);

Ext.define('LfmTool.Application', {
    extend: 'Ext.app.Application',
    
    name: 'LfmTool',

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        //TODO tmp solution for user data
        Ext.define('SharedData', {
            singleton: true,
            id: '',
            userName: '',
            imageSmall: ''
        });
        Ext.widget('login').show();
    }
});
