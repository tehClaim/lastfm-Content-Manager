Ext.define('LfmTool.view.usertools.ContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'content-panel',
    controller: 'content-panel',
    requires: [
        'LfmTool.view.usertools.ContentPanelViewController',
        'LfmTool.view.usertools.NavigationTabs',
        'LfmTool.view.usertools.ArtistDetails'
    ],

    layout: 'border',
    defaults: {
        collapsible: true,
        split: true
    },
    items: [{
        xtype: 'navigation-tabs',
        region: 'center',
        collapsible: false
    },{
        xtype: 'artist-details',
        region: 'east',
        reference: 'artistDetails',
        minWidth: 500,
        maxWidth: 1000,
        width: 800
    }]
});