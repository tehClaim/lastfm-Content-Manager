/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.Loader.setConfig({
    enabled: true,
    //disableCaching: false,
    paths: {
        'Ext': 'ext/src',
        'LfmTool': 'app'

    }
});

Ext.require([
    'LfmTool.Utilities'
]);

Ext.require('LfmTool.view.Header');
Ext.require('LfmTool.view.Login');

Ext.define('LfmTool.Application', {
    extend: 'Ext.app.Application',
    
    name: 'LfmTool',

    stores: [
        // TODO: add global / shared stores here
        'usertools.Artists',
        'usertools.Search',
        'usertools.ArtistTags',
        'usertools.Wishlist',
        'usertools.SimilarArtists',
        'usertools.Albums',
        'usertools.Tracks'
    ],
    
    launch: function () {
        // TODO - Launch the application
        Ext.define('SharedData', {
            singleton: true,
            id: '',
            userName: '',
            imageSmall: ''
        });
    }
});
