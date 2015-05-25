Ext.define('LfmTool.view.usertools.ContentPanelViewController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.content-panel',

    onLoadTagInfo: function(button){
        var tagInfo = this.lookupReference('tagInfo'),
            segmentedBtn = this.lookupReference('segmentedBtnPanel'),
            store = segmentedBtn.store,
            value = button.text;
        Ext.Ajax.request({
            url: 'php/getArtistTags.php',
            params:{
                tagName: value
            },
            success: function(response){
                var output = Ext.JSON.decode(response.responseText);
                tagInfo.update(output.description);
                tagInfo.setTitle(button.text);
            },
            failure: function(){
                LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
            }
        });
    },

    onWishlistStatusClick: function(button){
        if(!button.viewOnly) {
            var artistDetails = button.up('artist-details'),
                record = artistDetails.getViewModel().data.rec,
                wishlist = button.up('content-panel').down('wishlist grid'),
                store = wishlist.getStore();
            var model = store.getModel().create({
                name: record.get('name'),
                tag0: record.get('tag0'),
                imageSmall: record.get('imageSmall'),
                mbid: record.get('mbid')
            });
            store.add(model);
            wishlist.getSelectionModel().select(model);//fix for "New rows/records in grid not selectable after ID change from server"
            store.getProxy().setExtraParams({
                'userId': SharedData.id
            });
            store.sync({
                success: function(){
                    wishlist.up('panel').doLayout();
                    wishlist.getView().refresh();
                    artistDetails.setWishlistStatus(true);
                    LfmTool.Utilities.popup.msg('Success!', record.get('name')+' added to wishlist!');
                },
                failure: function() {
                    LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                },
                scope: this
            });
        }
    },

    checkArtistOnWishlist: function(userName, mbid){
        var artistDetails = this.getView().down('artist-details');
        Ext.Ajax.request({
            url: 'php/checkArtistOnWishlist.php',
            params:{
                userName: userName,
                mbid: mbid
            },
            success: function(response){
                var output = Ext.JSON.decode(response.responseText);
                if(output) artistDetails.setWishlistStatus(true);
                else artistDetails.setWishlistStatus(false);
            },
            failure: function(){
                //TODO error handler
                return false;
            },
            scope: this
        });
    },

    prepareTagsTab: function(tagsTab){
        var activeTab = tagsTab.getActiveTab(),
            activeTabIndex = tagsTab.items.findIndex('id', activeTab.id);
        if(activeTabIndex == 0) tagsTab.setActiveTab(1);
        else tagsTab.setActiveTab(0);
    },



    init: function() {
        this.control({
            'grid': {
                itemdblclick: function (view, record) {
                    var ajaxSuccess = false, // for sync custom ajax request callback with stores
                        panelView = this.getView(),
                        artistDetails = this.lookupReference('artistDetails'),
                        tagsTab = this.lookupReference('tagsTab'),
                        similarArtistsStore = this.lookupReference('similarArtists').getStore(),
                        albumsGrid = this.lookupReference('Albums'),
                        albumsStore = albumsGrid.getStore(),
                        topTracksGrid = this.lookupReference('topTracks'),
                        topTracks = topTracksGrid.getStore(),
                        storesToLoad = [similarArtistsStore, albumsStore, topTracks];
                    if(view == albumsGrid.view) return false; //exceptions
                    if(view == topTracksGrid.view) return false; //exceptions
                    artistDetails.showContent(false);
                    artistDetails.add({
                        xtype: 'progressbar',
                        itemId: 'pbarPanel',
                        flex: 1
                    });

                    var pbar = artistDetails.down('#pbarPanel');
                    pbar.wait({
                        interval: 150, //bar will move fast!
                        increment: 15,
                        text: "Loading '"+record.get('name')+"' artist details..."
                    });
                    for(var key in storesToLoad){
                        storesToLoad[key].load({
                            params:{
                                artistName: record.get('name')
                            },
                            callback: function(records, operation, success) {
                                if (success) {
                                    if (LfmTool.Utilities.multiCallback(storesToLoad) && ajaxSuccess) {
                                        artistDetails.remove(pbar);
                                        artistDetails.showContent(true);
                                        this.prepareTagsTab(tagsTab);
                                        //this.onTabChange(tagsTab, tagsTab.items.items[0]);
                                    }
                                } else{
                                    LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                                }
                            },
                            scope: this
                        })
                    };

                    this.checkArtistOnWishlist(SharedData.userName, record.get('mbid'));
                    Ext.Ajax.request({
                        url: 'php/getArtistInfo.php',
                        params: {
                            artist: record.get('name')
                        },
                        success: function (response) {
                            var output = Ext.JSON.decode(response.responseText);
                            ajaxSuccess = true;
                            if(output.image){
                                record.set({
                                    image: output.image
                                })
                            }
                            record.set({
                                imageSmall: output.imageSmall,
                                bio: output.bio,
                                listeners: output.listeners,
                                totalPlaycount: output.totalPlaycount,
                                ontour: output.ontour,
                                tag0: output.tag0,
                                tag1: output.tag1,
                                tag2: output.tag2,
                                tag3: output.tag3,
                                tag4: output.tag4
                            });
                            //TODO figure it out, setData is async?
                            artistDetails.getViewModel().setData({rec: record});
                            if(LfmTool.Utilities.multiCallback(storesToLoad) && ajaxSuccess){
                                artistDetails.remove(pbar);
                                artistDetails.showContent(true);
                                this.prepareTagsTab(tagsTab);
                                //this.onTabChange(tagsTab, tagsTab.items.items[0]);
                            }

                        },
                        failure: function(){
                            LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                        },
                        scope: this
                    });
                }
            },

            '#tagsTab': {
                tabchange: function (tabPanel, newCard) {
                    var tagName = newCard.getTitle();
                    newCard.update('');
                    newCard.add({
                        xtype: 'progressbar',
                        itemId: 'pbar'

                    });

                    var pbar = newCard.down('#pbar');
                    pbar.wait({
                        interval: 200, //bar will move fast!
                        increment: 15,
                        text: "Loading '"+tagName+"' tag description..."
                    });
                    Ext.Ajax.request({
                        url: 'php/getArtistTags.php',
                        params: {
                            tagName: tagName
                        },
                        success: function (response) {
                            newCard.remove(pbar);
                            var output = Ext.JSON.decode(response.responseText);
                            newCard.update(output.description);
                        },
                        failure: function(){
                            LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                        }
                    });
                }
            },

            '#artistImage':{
                resize: function(image){
                    var parent = image.up('#leftSide');
                    parent.doLayout();
                }
            }
        })
    }


});