Ext.define('LfmTool.view.usertools.ArtistDetailsViewModel',{
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.artists-details',
    requires:[
        'LfmTool.model.usertools.Album',
        'LfmTool.model.usertools.Track',
        'LfmTool.model.usertools.Artist'
    ],
    data: {
        rec: null
    },
    stores:{
        albums:{
            model: 'LfmTool.model.usertools.Album',
            proxy: {
                type: 'ajax',
                url: 'php/getAlbums.php'
            }
        },
        tracks:{
            model: 'LfmTool.model.usertools.Track',
            proxy: {
                type: 'ajax',
                url: 'php/getTopTracks.php'
            }
        },
        similar:{
            model: 'LfmTool.model.usertools.Artist',
            proxy: {
                type: 'ajax',
                url: 'php/getSimilarArtists.php'
            }
        }
    }

});