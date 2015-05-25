Ext.define('LfmTool.store.usertools.SimilarArtists', {
    extend: 'Ext.data.Store',
    requires:[
        'LfmTool.model.usertools.Artist'
    ],
    model: 'LfmTool.model.usertools.Artist',
    proxy: {
        type: 'ajax',
        url: 'php/getSimilarArtists.php',
        reader: {
            type: 'json'
        }
    }
});