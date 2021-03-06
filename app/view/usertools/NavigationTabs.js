Ext.define('LfmTool.view.usertools.NavigationTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'navigation-tabs',
    requires: [
        'LfmTool.view.usertools.UserLibrary',
        'LfmTool.view.usertools.Search',
        'LfmTool.view.usertools.Wishlist'
    ],
    layout:{
        type:' fit'
    },
    ui: 'navigation',
    tabBar: {
        layout: {
            pack: 'center'
        }
    },

    defaults: {
        iconAlign: 'top'
    },

    items: [{
        xtype: 'user-library',
        title: 'Library',
        glyph: 'xf022@FontAwesome'
    },{
        title: 'Search',
        xtype: 'search',
        glyph: 'xf002@FontAwesome'
    },{
        title: 'Wishlist',
        xtype: 'wishlist',
        glyph: 'xf0cb@FontAwesome'
    }]
});