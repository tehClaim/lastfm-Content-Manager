Ext.define('LfmTool.view.usertools.ContentPanelViewModel',{
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.content-panel',
    requires:[
        'LfmTool.model.usertools.Artist',
        'LfmTool.model.usertools.Wishlist'
    ],
    stores:{
        library:{
            model: 'LfmTool.model.usertools.Artist',
            proxy: {
                type: 'ajax',
                url: 'php/getArtists.php'
            }
        },
        search:{
            model: 'LfmTool.model.usertools.Artist',
            proxy: {
                type: 'ajax',
                url: 'php/getSearchResult.php'
            }
        }
    }

});