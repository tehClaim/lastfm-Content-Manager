Ext.define('LfmTool.store.usertools.ArtistTags', {
    extend: 'Ext.data.Store',
    requires:[
        'LfmTool.model.usertools.ArtistTag'
    ],
    model: 'LfmTool.model.usertools.ArtistTag',
    proxy: {
        type: 'ajax',
        url: 'php/getArtistTags.php',
        reader: {
            type: 'json'
        }
    }
});