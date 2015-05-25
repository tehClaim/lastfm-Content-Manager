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
        type: 'artists-details',
        data:{
            image: '{rec.image}'
        }
    },
    bind:{
      title: '{rec.name}'
    },
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
                xtype: 'container',
                minWidth: 252,
                minHeight: 200,
                items: [{
                    xtype: 'image',
                    itemId: 'artistImage',
                    border: 3,
                    style: {
                        borderColor: 'black',
                        borderStyle: 'solid'
                    },
                    src: 'resources/images/nophoto.png',
                    bind:{
                        src: '{rec.image}'
                    }
                }]
            },{
                xtype: 'button',
                viewOnly: false, //custom config for stop firing click event when button toggled
                itemId: 'wishlistStatus',
                //hidden: true,
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
            store: 'usertools.SimilarArtists',
            xtype: 'grid',
            scrollable: true,
            columns:[{
                text: 'Photo',
                renderer: function(value){
                    return '<img src="' + value + '" />';
                },
                dataIndex: 'imageVerySmall',
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
            store: 'usertools.Albums',
            xtype: 'grid',
            scrollable: true,
            columns:[{
                text: 'Photo',
                renderer: function(value){
                    return '<img src="' + value + '" />';
                },
                dataIndex: 'image',
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
            //height: 482,
            //bodyStyle: 'background-color: transparent;',
            frame: true,
            layout: {
                type: 'vbox',
                align: 'stretch'


            },
            defaults:{
                margin: '0 0 0 10',
                labelWidth: 70
                //width: '100%'
            },
            //flex: 1,
            items:[{
                xtype: 'displayfield',
                fieldLabel: 'Name',
                //labelWidth: 70,
                bind: '{rec.name}'
            },{
                xtype: 'displayfield',
                //labelWidth: 70,
                fieldLabel: 'Listeners',
                renderer: Ext.util.Format.numberRenderer('0,000'),
                bind: '{rec.listeners}'
            },{
                xtype: 'displayfield',
                //labelWidth: 70,
                fieldLabel: 'Playcount',
                renderer: Ext.util.Format.numberRenderer('0,000'),
                bind: '{rec.totalPlaycount}'
            },{
                xtype: 'checkbox',
                //labelWidth: 70,
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
                //bodyPadding: 5,
                //collapsible: true,
                //collapsed: true,
                minHeight: 200,
                maxHeight: 300,

                autoScroll: true
            }]
        };

        var artistTopTracks = {
            title: 'Top Tracks',
            reference: 'topTracks',
            store: 'usertools.Tracks',
            xtype: 'grid',
            //flex: 1,
            scrollable: true,
            //height: '100%',
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
                animate: true,
                fill: true
                //padding: 10
            },
            defaults:{
                //width: '100%'
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
            artistImage = this.down('#artistImage'),
            leftSide = this.down('#leftSide'),
            wishlistStatus = this.down('#wishlistStatus');
        if(show){
            rightSide.show();
            //artistImage.show();
            leftSide.show();
            //wishlistStatus.show();
        } else{
            rightSide.hide();
            //artistImage.hide();
            leftSide.hide();
            //wishlistStatus.hide();
        }
    }
});