Ext.define('LfmTool.model.usertools.Album',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'playcount', type: 'int'},
        {name: 'image', type: 'string'}
    ]
});