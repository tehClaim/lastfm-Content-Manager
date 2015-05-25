Ext.define('LfmTool.store.usertools.Tracks', {
    extend: 'Ext.data.Store',
    requires:[
        'LfmTool.model.usertools.Track'
    ],
    model: 'LfmTool.model.usertools.Track',
    proxy: {
        type: 'ajax',
        url: 'php/getTopTracks.php',
        reader: {
            type: 'json'
        }
    }
});