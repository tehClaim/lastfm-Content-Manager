Ext.define('LfmTool.view.usertools.ArtistDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'artist-details',
    requires: [
        'LfmTool.view.usertools.ArtistDetailsViewModel',
        'Ext.layout.container.Accordion'
    ],
    cls: 'ArtistDetails',
    title: "Double click on artist to load additional information",
    layout: {
        type: 'hbox',
        align: 'begin',
        padding: 5
    },
    viewModel:{
        type: 'artists-details'
    },
    bind:{
      title: '{rec.name}'
    },
    firstRender: true,//custom config for imgReady function to hide elements after image ready (only for first load)
    initComponent: function() {
        var leftSide = {
            bodyStyle: 'background-color: transparent;',
            hidden: true,
            itemId: 'leftSide',
            width: 300,
            layout:{
                type: 'vbox',
                align: 'begin'
            },
            items:[{
                xtype: 'image',
                itemId: 'artistImage',
                reference: 'artistImage',
                imageReady: false,//custom config for syncing image ready event with loading data to artist details
                width: 252,
                minHeight: 200,
                border: 3,
                style: {
                    borderColor: 'black',
                    borderStyle: 'solid'
                },
                src: 'resources/images/nophoto.png',
                listeners : {
                    load : {
                        element : 'el',
                        fn : 'imgReady'
                    }
                },
                bind:{
                    src: '{rec.image}'
                }
            },{
                xtype: 'button',
                margin: '10 0 0 0',
                viewOnly: false, //custom config for stop firing click event when button toggled
                itemId: 'wishlistStatus',
                enableToggle: true,
                allowDepress: false,
                handler: 'onWishlistStatusClick'
            }]
        };

        var tagsTab = {
            xtype: 'fieldset',
            title: 'Tags',
            margin: '0 5 0 5',
            items:[{
                xtype: 'tabpanel',
                itemId: 'tagsTab',
                reference: 'tagsTab',
                activeTab: 1,
                minHeight: 160,
                maxHeight: 320,
                margin: '0 0 5 0',
                defaults:{
                    autoScroll: true
                },
                items:[{
                    bind:{
                        title: '{rec.tag0}'
                    }
                },{
                    bind:{
                        title: '{rec.tag1}'
                    }
                },{
                    bind:{
                        title: '{rec.tag2}'
                    }
                },{
                    bind:{
                        title: '{rec.tag3}'
                    }
                },{
                    bind:{
                        title: '{rec.tag4}'
                    }
                }]
            }]
        };


        var similarArtists = {
            title: 'Similar Artists',
            reference: 'similarArtists',
            itemId: 'similarArtists',
            xtype: 'grid',
            scrollable: true,
            bind:{
                store: '{similar}'
            },
            columns:[{
                text: 'Photo',
                renderer: function(value){
                    return '<img src="' + value + '" />';
                },
                dataIndex: 'imageVerySmall',
                width: 100,
                sortable: false
            },{
                text: 'Artist name',
                dataIndex: 'name',
                flex: 1
            },{
                text: 'Matching index',
                dataIndex: 'matchingIndex',
                renderer: Ext.util.Format.numberRenderer('0.00')
            }]
        };

        var artistAlbums = {
            title: 'Albums',
            reference: 'Albums',
            itemId: 'albums',
            xtype: 'grid',
            scrollable: true,
            bind:{
                store: '{albums}'
            },
            columns:[{
                text: 'Photo',
                renderer: function(value){
                    return '<img src="' + value + '" />';
                },
                dataIndex: 'image',
                width: 100,
                sortable: false
            },{
                text: 'Artist name',
                dataIndex: 'name',
                flex: 1
            },{
                text: 'Overall Listeners',
                width: 120,
                dataIndex: 'playcount',
                renderer: Ext.util.Format.numberRenderer('0,000')
            }]
        };

        var artistDetails = {
            title: 'Artist Details',
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults:{
                margin: '0 0 0 10',
                labelWidth: 70
            },
            items:[{
                xtype: 'displayfield',
                fieldLabel: 'Name',
                bind: '{rec.name}'
            },{
                xtype: 'displayfield',
                fieldLabel: 'Listeners',
                renderer: Ext.util.Format.numberRenderer('0,000'),
                bind: '{rec.listeners}'
            },{
                xtype: 'displayfield',
                fieldLabel: 'Playcount',
                renderer: Ext.util.Format.numberRenderer('0,000'),
                bind: '{rec.totalPlaycount}'
            },{
                xtype: 'checkbox',
                fieldLabel: 'On tour',
                readOnly: true,
                bind: '{rec.ontour}'
            },
            tagsTab,
            {
                xtype: 'fieldset',
                title: 'Biography summary',
                margin: '15 5 5 5',
                bind:{
                    html: '{rec.bio}'
                },
                minHeight: 200,
                maxHeight: 300,
                autoScroll: true
            }]
        };

        var artistTopTracks = {
            xtype: 'grid',
            title: 'Top Tracks',
            reference: 'topTracks',
            itemId: 'topTracks',
            bind:{
                store: '{tracks}'
            },
            scrollable: true,
            columns:[{
                text: 'Track name',
                dataIndex: 'name',
                flex: 1
            },{
                text: 'Playcount',
                dataIndex: 'playcount',
                renderer: Ext.util.Format.numberRenderer('0,00')
            }]
        };

        var rightSide ={
            flex: 1,
            hidden: true,
            itemId: 'rightSide',
            height: '100%',
            layout: {
                type: 'accordion',
                animate: true
            },
            defaults:{
                height: '100%'
            },
            items:[artistDetails, artistTopTracks, artistAlbums, similarArtists]
        };

        this.items = [leftSide, rightSide];

        this.callParent();
    },

    setWishlistStatus: function(status){
        var btn = this.down('#wishlistStatus');
        if(status){
            btn.setText('Already on wishlist');
            btn.viewOnly = true;
            btn.toggle(true);
        } else{
            btn.setText('Add to wishlist');
            btn.viewOnly = false;
            btn.toggle(false);
        }
    },

    showContent: function(show){
        var rightSide = this.down('#rightSide'),
            leftSide = this.down('#leftSide');
        if(show){
            rightSide.show();
            leftSide.show();
            this.updateLayout();
        } else{
            rightSide.hide();
            leftSide.hide();
            this.updateLayout();
        }
    }
});