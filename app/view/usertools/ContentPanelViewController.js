Ext.define('LfmTool.view.usertools.ContentPanelViewController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.content-panel',
    control:{
        'grid': {
            itemdblclick: function (view, record) {
                if(view.ownerCt.itemId == 'topTracks' || view.ownerCt.itemId == 'albums') return false; //exception
                //TODO realize how to do it in MVVM style, when child components have their own vc
                var grid = view.ownerCt,
                    store = grid.getStore(),
                    ajaxSuccess = false, // for sync custom ajax request callback with stores
                    artistDetails = this.lookupReference('artistDetails'),
                    artistDetailsVM = artistDetails.getViewModel(),
                    tagsTab = this.lookupReference('tagsTab'),
                    gridToMask = this.getView().down('navigation-tabs').getActiveTab().down('grid'),//TODO tmp solution, because you could fast switch tab and load from unmasked grid
                    artistImage = this.lookupReference('artistImage'),
                    similarArtistsStore = this.lookupReference('similarArtists').getStore(),
                    albumsStore = this.lookupReference('Albums').getStore(),
                    topTracks = this.lookupReference('topTracks').getStore(),
                    storesToLoad = [similarArtistsStore, albumsStore, topTracks];
                if(artistDetailsVM.data.rec){
                    if(artistDetailsVM.data.rec.get('name') == record.get('name')) return false; //return false if artist details is already loaded
                }
                gridToMask.mask();//mask grid while loading
                artistImage.imageReady = false; //set imageRdy to false for w8ing till loaded(will set true in image rdy event)
                artistDetails.showContent(false);
                artistDetails.add({
                    xtype: 'progressbar',
                    itemId: 'pbarPanel',
                    flex: 1
                });

                var pbar = artistDetails.down('#pbarPanel');
                pbar.wait({
                    interval: 150,
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
                                    if(artistImage.imageReady){
                                        this.prepareArtistDetailsToShow(artistDetails, pbar, tagsTab, gridToMask);
                                    }
                                }
                            } else{
                                this.prepareArtistDetailsToShow(artistDetails, pbar, tagsTab, gridToMask);
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
                        store.commitChanges();//dont need to sync
                        //TODO figure it out, setData is async?
                        artistDetails.getViewModel().setData({rec: record});

                        if(LfmTool.Utilities.multiCallback(storesToLoad) && ajaxSuccess){
                            if(artistImage.imageReady){
                                this.prepareArtistDetailsToShow(artistDetails, pbar, tagsTab, gridToMask);
                            };
                        }
                    },
                    failure: function(){
                        this.prepareArtistDetailsToShow(artistDetails, pbar, tagsTab, gridToMask);
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
                    interval: 200,
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
    },

    prepareArtistDetailsToShow: function(artistDetails, pbar, tagsTab, grid){
        var activeTab = tagsTab.getActiveTab(),
            activeTabIndex = tagsTab.items.findIndex('id', activeTab.id);
        artistDetails.remove(pbar);
        if(activeTabIndex == 0) tagsTab.setActiveTab(1);
        else tagsTab.setActiveTab(0);
        grid.unmask();
        artistDetails.showContent(true);

    },

    imgReady: function(e, t, eOpts){
        var contentPanel = this.getView(),
            leftside = contentPanel.down('#leftSide'),
            artistDetails = contentPanel.down('artist-details'),
            artistImage = this.lookupReference('artistImage'),
            similarArtists = this.lookupReference('similarArtists'),
            albums = this.lookupReference('Albums'),
            topTracks = this.lookupReference('topTracks'),
            storesToLoad = [similarArtists.getStore(), albums.getStore(), topTracks.getStore()];
        leftside.doLayout();
        artistImage.imageReady = true;
        if(artistDetails.firstRender) {
            artistDetails.showContent(false);
            artistDetails.firstRender = false;
        } else{
            //tmp solution for sync image ready event with stores, checking only stores because image updates after ajax request
            if(LfmTool.Utilities.multiCallback(storesToLoad)){
                var pbar = artistDetails.down('#pbarPanel'),
                    tagsTab = this.lookupReference('tagsTab'),
                    grid = contentPanel.down('navigation-tabs').getActiveTab().down('grid');
                this.prepareArtistDetailsToShow(artistDetails, pbar, tagsTab, grid);
            }
        }
    },

    onLoadTagInfo: function(button){
        var tagInfo = this.lookupReference('tagInfo'),
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
                store = button.up('content-panel').down('wishlist').getViewModel().getStore('wishlist');
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
    }

});