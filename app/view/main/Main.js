/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('LfmTool.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
        'LfmTool.view.main.MainController',
        'LfmTool.view.main.MainModel',
        'LfmTool.view.Header',
        'LfmTool.view.usertools.ContentPanel',
        'Ext.layout.container.Border'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'app-header'
    },{
        xtype: 'content-panel',
        flex: 1
    }]
});
