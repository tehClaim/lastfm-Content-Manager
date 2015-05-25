Ext.define('LfmTool.view.usertools.ContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'content-panel',
    controller: 'content-panel',
    requires: [
        'LfmTool.view.usertools.ContentPanelViewController',
        'LfmTool.view.usertools.NavigationTabs',
        'LfmTool.view.usertools.ArtistDetails'
    ],

    //bodyBorder: false,
    //controller: 'main',
    /*viewModel: {
        type: 'main'
    },*/
    /*layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },*/
    layout: 'border',
    defaults: {
        collapsible: true,
        split: true
        //bodyPadding: 10
    },
    /*layout:{
        type: 'hbox',
        align: 'stretch'
    },*/

    items: [{
        xtype: 'NavigationTabs',
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